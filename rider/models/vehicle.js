const mongoose = require('mongoose');

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