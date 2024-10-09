const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
},{ collection: 'restaurant' });
const model = mongoose.model('Restaurant', restaurantSchema);

module.exports = model

