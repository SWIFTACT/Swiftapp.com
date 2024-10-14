const express = require('express');
const Product = require('../models/productschema');


const router = express.Router();


// GET /api/products: Retrieve all products
router.get('/products-retrieve', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// GET /api/products/:id: Retrieve a specific product by ID
router.get('/products-retrieve/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
      res.send(product);
      newproduct;
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// GET /api/filter: Filter products by various criteria
router.get('/filter', async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = minPrice;
    }
    if (maxPrice) {
      filter.price.$lte = maxPrice;
    }
  }

  try {
    const products = await Product.find(filter);
    res.send(products);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


// GET /api/search: Search for products
router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send('Query parameter is required');
  }

  try {
    const products = await Product.find({
      $text: { $search: query }
    });

    res.send(products);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
