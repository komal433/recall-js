const express = require("express");
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

// Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});