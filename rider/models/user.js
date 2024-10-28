const mongoose = require('mongoose');

const deliveryAreaSchema = new mongoose.Schema({
  areaName: {
    type: String,
    required: true,
    trim: true
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'], // 'Point' is the GeoJSON type for a coordinate
      required: true
    },
    coordinates: {
      type: [Number], // Longitude, Latitude
      required: true
    }
  }
}, { collection: 'deliveryAreas' });

const DeliveryArea = mongoose.model('DeliveryArea', deliveryAreaSchema);

module.exports = DeliveryArea;

const vehicleSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true, // e.g., "bike", "car", "truck"
    trim: true
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  capacity: {
    type: Number, // e.g., weight limit or volume
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { collection: 'vehicles' });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  appleId: { type: String, unique: true, sparse: true },
  displayName: String,
  otp: String,
  otptime: Date,
  card_details: String,
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email regex
      },
      message: props => `${props.value} is not a valid email!`
    }
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
    validate: {
      validator: function (v) {
        return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format validation
      },
      message: props => `${props.value} is not a valid phone number!`
    }
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle' // Reference to Vehicle model
  }
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);
