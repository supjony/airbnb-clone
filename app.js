const express = require("express");
const path = require("path");
require('dotenv').config(); // load environment variables

const app = express();

// ----------------------
// Middleware
// ----------------------
app.use(express.json());

// ----------------------
// Import API routes
// ----------------------
const userRoutes = require('./routes/users');
const spotRoutes = require('./routes/spots');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');

app.use('/api/users', userRoutes);
app.use('/api/spots', spotRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

// ----------------------
// Serve React frontend (production only)
// ----------------------
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(clientBuildPath));

  // Catch-all route to serve index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// ----------------------
// Start server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // optional, useful for testing
