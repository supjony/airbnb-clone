const express = require('express');
const router = express.Router();
const { Review } = require('../models');

// GET all reviews
router.get('/', async (req, res) => {
  const reviews = await Review.findAll();
  res.json(reviews);
});

// POST create a new review
router.post('/', async (req, res) => {
  const newReview = await Review.create(req.body);
  res.json(newReview);
});

module.exports = router;
