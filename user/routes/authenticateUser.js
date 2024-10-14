// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming User model is in models/User.js

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!req.user._id) { // Assuming `req.user` is set when the user is logged in
        return res.redirect('/signup'); // Redirect to signup if user is not authenticated
    }
  
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authenticateUser;