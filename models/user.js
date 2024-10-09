const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName:String,
  googleId: { type: String, unique: true, sparse: true },
  appleId: { type: String, unique: true, sparse: true },
  displayName: String,
  phoneNumber: String,
  otp: String,
  otptime: Date,
},
{ collection: 'users' });
const model = mongoose.model('User', userSchema);

module.exports = model