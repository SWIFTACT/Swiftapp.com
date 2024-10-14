const express = require('express');
const mongoose = require('mongoose');
const Cart = require('../models/cart'); 
const product = require('../models/productschema')
const authenticateUser = require('./authenticateUser')// Middleware to authenticate user

const router = express.Router();

// GET /api/cart: Retrieve the current user's cart
router.get('/cart-retrieve', authenticateUser, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      return res.status(404).send('Cart not found');
    }
    res.send(cart);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// POST /api/cart: Add an item to the cart
router.post('/cart-add', authenticateUser, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.send(cart);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// PUT /api/cart: Update quantity of a cart item
router.put('/cart-update', authenticateUser, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.send(cart);
    } else {
      res.status(404).send('Product not found in cart');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// DELETE /api/cart: Remove an item from the cart
router.delete('/cart-remove', authenticateUser, async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    cart.items = cart.items.filter(item => !item.product.equals(productId));
    await cart.save();
    res.send(cart);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// DELETE /api/cart: Clear the cart
router.delete('/cart-clear', authenticateUser, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    cart.items = [];
    await cart.save();
    res.send(cart);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;