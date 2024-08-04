
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

// Cart Item Schema
const CartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can\'t be less than 1']
  }
});

// Cart Schema
const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [CartItemSchema],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to calculate total price before saving
CartSchema.pre('save', function(next) {
  this.totalPrice = this.items.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);
  this.updatedAt = Date.now();
  next();
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;


// // Explanation
// 1. **Cart Item Schema**:
//    - `product`: References the `Product` schema.
//    - `quantity`: Quantity of the product in the cart.

// 2. **Cart Schema**:
//    - `user`: References the `User` schema and ensures each user has a unique cart.
//    - `items`: An array of `CartItemSchema`.
//    - `totalPrice`: The total price of all items in the cart.
//    - `createdAt`: Timestamp for when the cart was created.
//    - `updatedAt`: Timestamp for the last update to the cart.

// 3. **Pre-save Middleware**:
//    - Calculates the total price of the cart items before saving.
//    - Updates the `updatedAt` timestamp.

// This schema can be adjusted based on your application's requirements, such as adding more fields or validations.