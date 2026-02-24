const express = require('express');
const router = express.Router();
const { Booking } = require('../models');

// GET all bookings
router.get('/', async (req, res) => {
  const bookings = await Booking.findAll();
  res.json(bookings);
});

// POST create a new booking
router.post('/', async (req, res) => {
  const newBooking = await Booking.create(req.body);
  res.json(newBooking);
});

module.exports = router;
