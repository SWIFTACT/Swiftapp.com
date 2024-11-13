const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  appleId: { type: String, unique: true, sparse: true },

  displayName: String,
  otp: String,
  card_details: String,

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
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
  },

  deliveryArea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryArea' // Reference to Delivery Area model
  },

  vehicle: {
    type:String
    // ref: 'Vehicle' // Reference to Vehicle model
  }
}, { collection: 'users' });

const User = mongoose.model('user', riderSchema);

module.exports = User