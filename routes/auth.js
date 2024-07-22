const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');
const { sendOTP,sendPasswordReset} = require('../utils/nodemailer')


const router = express.Router();

// Endpoint for user to sign up
router.post('/signup', async (req, res) => {
    const { password, email, googleId, appleId, lastName, firstName, phoneNumber } = req.body;

    // Check if any required field is missing
    if (!password || !email || !firstName || !lastName || !phoneNumber) {
        return res.status(400).send({ "status": "error", "msg": "Fill in your details" });
    }

    try {
        // Check if email has been used to create an account before
        const found = await User.findOne({ email }).lean();
        if (found) {
            return res.status(400).send({ status: 'error', msg: `User with this email: ${email} already exists` });
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
        res.status(500).send({ "status": "error", "msg": error.message });
    }
});

// Endpoint for user to log in
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if any required field is missing
    if (!email || !password) {
        return res.status(400).send({ 'status': 'Error', 'msg': 'All fields must be filled' });
    }

    try {
        // Check if user with that email exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ 'status': 'Error', 'msg': 'Incorrect email or password' });
        }

        // Check if password is correct
        if (await bcrypt.compare(password, user.password)) {
            // Generate JWT token
            const token = jwt.sign({
                _id: user._id,
                email: user.email,
            }, process.env.JWT_SECRET, { expiresIn: '30m' });

            // Update user document online status
            user.is_online = true;
            await user.save();

            res.status(200).send({ 'status': 'Success', 'msg': 'You have successfully logged in', user, token });
        } else {
            res.status(400).send({ 'status': 'Error', 'msg': 'Incorrect email or password' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ "status": "error", "msg": error.message });
    }
});

// //FORGOT PASSWORD LINK

// router.post('/forgot-password', async (req, res) => {
//     const { email } = req.body;
//     const user = await User.findOne({ email });

// //checking if the user is valid
//     if (!user) {
//         return res.status(400).send({ 'msg': 'User with given email does not exist' });
//     }

//     const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET, { expiresIn: '10m' });
//     user.resetPasswordToken = token;
//     user.resetPasswordExpires = Date.now() +  10 * 60 * 1000; // 10 minutes

//     await user.save();
//     console.log("link sent")

// })

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.error(error);
//         return res.status(500).send('Error sending email');
//     }
//     res.status(200).send('Password reset email sent');
// })
//   catch(error) {
//     res.status(500).send('Server error');
// }

// //resetting the password link

// router.post('/reset-password/:token', async (req, res) => {
//   const { token } = req.params;
//   const { newPassword } = req.body;

//   let decoded;
//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (err) {
//     return res.status(400).send('Invalid or expired token');
//   }

//   const user = await User.findOne({
//     _id: decoded.userId,
//     resetPasswordToken: token,
//     resetPasswordExpires: { $gt: Date.now() },
//   });

//   if (!user) {
//     return res.status(400).send('Invalid or expired token');
//   }

//   user.password = newPassword;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpires = undefined;

//   await user.save();
//   res.status(200).send('Password has been reset');
// });

module.exports = router;
