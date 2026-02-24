const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const userRoutes = require('./routes/users');

app.use('/api/users', userRoutes);



const spotRoutes = require('./routes/spots');
app.use('/api/spots', spotRoutes);



const bookingRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingRoutes);


const reviewRoutes = require('./routes/reviews');
app.use('/api/reviews', reviewRoutes);
