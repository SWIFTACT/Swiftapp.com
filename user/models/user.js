const mongoose = require('mongoose');

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
    minlength: 8
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
  Name: {
    type: String,
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
}, { collection: 'users' });

// Pre-save hook to set Name field
userSchema.pre('save', function(next) {
  this.Name = `${this.firstName} ${this.lastName}`;
  next();
});

const model = mongoose.model('User', userSchema);

module.exports = model;
