require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/error.middleware");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
const userRoutes = require("./routes/user.routes");

// Health check (optional but good practice)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
  });
});

// User APIs
app.use("/api/users", userRoutes);
app.use(errorMiddleware);
// Server start
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});