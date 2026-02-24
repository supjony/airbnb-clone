const express = require('express');
const router = express.Router();
const { Spot } = require('../models');

// GET all spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll();
  res.json(spots);
});

// POST create a new spot
router.post('/', async (req, res) => {
  const newSpot = await Spot.create(req.body);
  res.json(newSpot);
});

module.exports = router;
