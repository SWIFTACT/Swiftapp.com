// routes/review.js

const express = require('express');
const Review = require('../models/review');

const router = express.Router();

// Create a new review
router.post('/api/reviews', async (req, res) => {
  const { product_id, user_id, rating, comment } = req.body;

  try {
    const newReview = new Review({
      product_id,
      user_id,
      rating,
      comment
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: 'Error creating review', error });
  }
});

// Get all reviews for a specific product
router.get('/api/reviews/:product_id', async (req, res) => {
  const { product_id } = req.params;

  try {
    const reviews = await Review.find({ product_id })
      .populate('user_id', 'username') // Populating user_id and selecting only the username
      .sort({ created_at: -1 }); // Sort reviews by most recent

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reviews', error });
  }
});

// Update a review
router.put('/api/reviews/:id', async (req, res) => {
  const { rating, comment } = req.body;
  const { id } = req.params;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: 'Error updating review', error });
  }
});

// Delete a review
router.delete('/api/reviews/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
});

module.exports = router;
