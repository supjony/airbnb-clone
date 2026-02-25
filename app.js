const express = require("express");
const path = require("path");
const fs = require("fs");
require("dotenv").config(); // Load environment variables
const app = express();

// ----------------------
// Middleware
// ----------------------
if (process.env.NODE_ENV !== "production") {
  const cors = require("cors");
  app.use(cors()); // Enable CORS in development
}

app.use(express.json()); // Parse JSON requests

// ----------------------
// API Routes
// ----------------------
const userRoutes = require("./routes/users");
const spotRoutes = require("./routes/spots");
const bookingRoutes = require("./routes/bookings");
const reviewRoutes = require("./routes/reviews");

app.use("/api/users", userRoutes);
app.use("/api/spots", spotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

// ----------------------
// Serve React frontend (Production only)
// ----------------------
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "client", "build");

  if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));

    // Catch-all route for React (Express 5 safe)
    app.get(/^\/(?!api).*/, (req, res) => {
      res.sendFile(path.join(clientBuildPath, "index.html"));
    });
  } else {
    console.warn(
      "Client build folder not found. React app will not be served."
    );
  }
}

// ----------------------
// Start server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
