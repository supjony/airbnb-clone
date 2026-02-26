const express = require('express');
const router = express.Router();
const { Review } = require('../models');

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST create a new review
router.post('/', async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.json(newReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

module.exports = router;
