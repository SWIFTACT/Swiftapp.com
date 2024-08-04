const express = require('express');
const router = express.Router();
const Restaurant = require('../model/restaurant');
const Product = require('../model/adminproduct');

// Add a new restaurant
router.post('/add-restaurant', async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const restaurant = new Restaurant({ name, address, phone });
    await restaurant.save();
    res.status(201).json({ message: 'Restaurant added successfully', restaurant });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add restaurant', details: error.message });
  }
});

// Add a new product to a restaurant
router.post('/add-product', async (req, res) => {
  try {
    const { name, price, description, restaurantId, isAvailable } = req.body;
    const product = new Product({ name, price, description, restaurant: restaurantId, isAvailable });
    await product.save();

    // Add the product to the restaurant's product list
    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.products.push(product._id);
    await restaurant.save();

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product', details: error.message });
  }
});

// Remove a product from a restaurant
router.delete('/remove-product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Remove the product from the restaurant's product list
    await Restaurant.findByIdAndUpdate(product.restaurant, { $pull: { products: productId } });

    res.status(200).json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove product', details: error.message });
  }
});

// Update product availability
router.patch('/update-product-availability/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { isAvailable } = req.body;

    const product = await Product.findByIdAndUpdate(productId, { isAvailable }, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product availability updated', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product availability', details: error.message });
  }
});

module.exports = router;
