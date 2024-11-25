const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

// models call 
const Rider = require('../models/rideruser');
const DeliveryArea = require('../models/deliveryArea');

const { sendOTP } = require('../utils/nodemailer');
const authenticateUser = require('./authenticateUser');

const router = express.Router();

// Password, email, and phone number validation regex
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneNumberRegex = /^(\+?\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;


// Ibadan coordinates and distance check
const ibadanCenter = { lat: 7.3775, lon: 3.9470 };
const maxDistanceInKm = 20;

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};


router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, deliveryArea, vehicle } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password || !phoneNumber || !deliveryArea || !vehicle) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  // Validate email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Validate password format
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'Password must contain at least 8 characters, including an uppercase letter, a digit, and a special character.' });
  }

  // Validate phone number format
  if (!phoneNumberRegex.test(phoneNumber)) {
    return res.status(400).json({ message: 'Invalid phone number format.' });
  }

  try {
    // Check if user already exists
    const existingUser = await Rider.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }


    // Check if the delivery area exists
    const deliveryAreaData = await DeliveryArea.findOne({deliveryArea });
    if (!deliveryAreaData) {
      return res.status(400).json({ message: 'Delivery area not found' });
    }


// Check if user's location is within 20 km of Ibadan
const userLocation = deliveryAreaData.coordinates; // [longitude, latitude]
const distanceFromIbadan = calculateDistance(
  ibadanCenter.lat, ibadanCenter.lon,
  userLocation[1], userLocation[0] // Extract latitude and longitude from user's location
);

if (distanceFromIbadan > maxDistanceInKm) {
  return res.status(400).json({
    message: `You must be located within ${maxDistanceInKm} km of Ibadan, Nigeria.`,
  });
}
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new Rider({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      deliveryArea: deliveryAreaData._id,
      vehicle
    });

    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
//user login

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
        const user = await Rider.findOne({ email });
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

// forgot-password

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ status: "error", msg: "Valid email is required" });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: "error",
            msg: "Invalid email format."
        });
    }

    try {
        // Check if the user exists
        const user = await Rider.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "error", msg: "User not found" });
        }

        // Generate a 6-digit OTP
    const otp = crypto.randomInt(10000,999999).toString();
    user.otp = otp;
    user.otptime = Date.now() + 1 * 60 * 1000; // 1minutes

        await user.save();

        // Send OTP via email
        await sendOTP(email, otp);

        res.status(200).json({ status: "success", msg: "OTP sent to your email" });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ status: "error", msg: "Failed to send OTP" });
    }
});



// Verify OTP route
router.post('/verify-otp', async (req, res) => {
  const { otp } = req.body;

  try {
    const user = await Rider.findOne({ otp });

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
    
    const user = await Rider.findOne({
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
    const { email, Name, phoneNumber } = req.body;
    const userId = req.userId;

    try {
        // Find user by ID
        const user = await Rider.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 'error', msg: 'User not found' });
        }

        // Update user fields
        if (email) user.email = email;
        if (Name) user.Name = Name;
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
        await Rider.findByIdAndUpdate(req.userId, { is_online: false });

        // Response
        res.status(200).json({ status: 'success', msg: 'You have successfully logged out' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', msg: error.message });
    }
});



module.exports = router;




