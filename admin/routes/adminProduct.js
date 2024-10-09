const express = require('express');
const Product = require('../models/Product');
const authenticateUser = require('../routes/');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

// POST /api/products: Add a new product (admin only)
router.post('/api/products', authenticateUser, isAdmin, async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send('Error creating product');
  }
});

// PUT /api/products/:id: Update a product by ID (admin only)
router.put('/api/products/:id', authenticateUser, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
  } catch (error) {
    res.status(400).send('Error updating product');
  }
});

// DELETE /api/products/:id: Delete a product by ID (admin only)
router.delete('/api/products/:id', authenticateUser, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send('Product deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
