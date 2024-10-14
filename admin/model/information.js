// models/Address.js
const mongoose = require('mongoose');

const informationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  opening_hours: {
    type: Map,
    of: String
  },
  images: [{
    url: String,
    created_at: { type: Date, default: Date.now }
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Information = mongoose.model('Information', informationSchema);
module.exports = Information;
