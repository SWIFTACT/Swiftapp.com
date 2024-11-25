const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({


  googleId: { type: String, unique: true, sparse: true },

  appleId: { type: String, unique: true, sparse: true },

  displayName: { type: String },

  otp:{type: String },

card_details: {type: String},

  email: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
    
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
}, { collection: 'rider' });

const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider