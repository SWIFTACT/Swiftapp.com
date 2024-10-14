// app.js or routes/payment.js
const express = require('express');
// const Payment = require('./models/payment');
const Payment = require('../models/payment')

const router = express.Router();

// Create a new payment
router.post('/payments', async (req, res) => {
  const { order_id, user_id, amount, payment_method } = req.body;

  try {
    const newPayment = new Payment({
      order_id,
      user_id,
      amount,
      payment_method,
      payment_status: 'pending' // Initial status
    });

    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: 'Error processing payment', error });
  }
});

// Get payment details for an order
router.get('/payments/:order_id', async (req, res) => {
  const { order_id } = req.params;

  try {
    const payment = await Payment.findOne({ order_id }).populate('user_id').populate('order_id');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving payment', error });
  }
});

module.exports = router;


