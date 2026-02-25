const express = require("express");
const path = require("path"); // Needed to serve React
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const spotRoutes = require('./routes/spots');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');

// API routes
app.use('/api/users', userRoutes);
app.use('/api/spots', spotRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

// ----------------------
// Serve React frontend
// ----------------------
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
