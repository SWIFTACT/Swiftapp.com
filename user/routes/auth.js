const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();


const User = require('../models/user');
const { sendOTP } = require('../../user/utils/nodemailer')
const authenticateUser = require('../routes/authenticateUser')


const router = express.Router();

// Password, email, and phone number validation regex
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneNumberRegex = /^(\+?\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

// Endpoint for user signup
router.post('/signup', async (req, res) => {
    const { password, email, googleId, appleId, lastName, firstName, phoneNumber } = req.body;

    // Check if any required field is missing
    if (!password || !email || !firstName || !lastName || !phoneNumber) {
        return res.status(400).json({ status: "error", msg: "Fill in your details" });
    }

    // Validate password
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            status: "error",
            msg: "Password must be at least 8 characters long, contain at least one uppercase letter, one digit, and one special character."
        });
    }

    // Validate email
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: "error",
            msg: "Invalid email format."
        });
    }

    // Validate phone number
    if (!phoneNumberRegex.test(phoneNumber)) {
        return res.status(400).json({
            status: "error",
            msg: "Invalid phone number format."
        });
    }

    try {
        // Check if email has been used to create an account before
        const found = await User.findOne({ email }).lean();
        if (found) {
            return res.status(400).json({ status: 'error', msg: `User with this email: ${email} already exists` });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            googleId,
            appleId,
            lastName,
            firstName,
            phoneNumber
        });

        await newUser.save();
        res.status(201).json({ msg: 'You signed up successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: error.message });
    }


// Endpoint for user to log in

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if any required field is missing
    if (!email || !password) {
        return res.status(400).json({ status: 'error', msg: 'Email and password are required' });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: "error",
            msg: "Invalid email format."
        });
    }

    // Validate password format
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            status: "error",
            msg: "Password must be at least 8 characters long, contain at least one uppercase letter, one digit, and one special character."
        });
    }

    try {
        // Check if user with that email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 'error', msg: 'Incorrect email or password' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ status: 'error', msg: 'Incorrect email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        );

        // Update user document online status
        user.is_online = true;
        await user.save();

        // Send user data without the password
        const { password: userPassword, ...userWithoutPassword } = user.toObject();

        res.status(200).json({
            status: 'success',
            msg: 'You have successfully logged in',
            user: userWithoutPassword,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", msg: "An error occurred during login. Please try again." });
    }
});


// Verify OTP route
router.post('/verify-otp', async (req, res) => {
  const { otp } = req.body;

  try {
    const user = await User.findOne({ otp });

    if (!user) {
      return res.status(400).send({ msg: 'Invalid OTP' });
    }

    // Check if OTP is valid and not expired
    if (user.otp !== otp || Date.now() > user.otptime) {
      return res.status(400).send({ msg: 'Invalid or expired OTP' });
    }

    res.status(200).send({ msg: 'OTP verified successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send({ msg: 'Server error' });
  }
});

// Resetting the password 

router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send({ msg: 'Invalid or expired token' });
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Save the new password
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Clear reset token
    user.resetPasswordExpires = undefined; // Clear reset token expiry time

    await user.save();

    res.status(200).send({ msg: 'Password successfully reset' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send({ msg: 'Server error' });
  }
});

// Endpoint to edit user details
router.put('/edit', authenticateUser, async (req, res) => {
    const { email, firstName, lastName, phoneNumber } = req.body;
    const userId = req.userId;

    try {
        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 'error', msg: 'User not found' });
        }

        // Update user fields
        if (email) user.email = email;
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        await user.save();

        // Create a user object without the password for the response
        const { password, ...updatedUser } = user.toObject();

        res.status(200).json({ status: 'success', msg: 'User details updated successfully', user: updatedUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', msg: error.message });
    }
});

// Endpoint for user to log out
router.post('/logout', authenticateUser, async (req, res) => {
    try {
        // Mark the user as logged out in the database
        await User.findByIdAndUpdate(req.userId, { is_online: false });

        // Response
        res.status(200).json({ status: 'success', msg: 'You have successfully logged out' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', msg: error.message });
    }
});



module.exports = router;
