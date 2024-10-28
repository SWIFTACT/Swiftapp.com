const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  appleId: { type: String, unique: true, sparse: true },
  displayName: String,
  otp: String,
  otptime: Date,
  card_details: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8 // Minimum length for password
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  
  is_online: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
{ collection: 'users' });
const model = mongoose.model('User', userSchema);

module.exports = model