const express = require('express');
const router = express.Router();
const { User } = require('../models');

// GET all users
router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// POST create a new user
router.post('/', async (req, res) => {
  const newUser = await User.create(req.body);
  res.json(newUser);
});

module.exports = router;
