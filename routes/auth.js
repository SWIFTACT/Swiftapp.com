const express = require('express');

const User = require('../models/user');

const route = express.Router();

//  endpoint for user to signup
route.post('/signup', async (req, res) => {
    const { password, email, googleId, appleId} = req.body; // Destructuring the request body

    // Checking if any required field is missing
    if (!password || !email ) {
        return res.status(400).send({ "status": "error", "msg": "Fill in your details" });
    }

    try {
        // check if email has been used to create an account before
        const found = await User.findOne({ email }, { email: 1, _id: 0 }).lean();
        if (found)
            return res.status(400).send({ status: 'error', msg: `User with this username: ${email} already exists` });

        //check if email is valid then proceed to create an account
        else (!found || googleId || appleId
        )
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ msg: `you signup successfully`},);
    } 

     catch (error) {
        console.error(error);
        // Sending error response if something goes wrong
        res.status(500).send({ "status": "some error occurred", "msg": error.message });
    }
});

module.exports = route