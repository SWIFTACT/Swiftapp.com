const mongoose = require('mongoose');

const deliveryAreaSchema = new mongoose.Schema({
  areaName: {
    type: String,
    required: true,
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