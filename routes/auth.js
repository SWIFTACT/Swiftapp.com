const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

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

module.exports = router;
