require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/error.middleware");

const userRoutes = require("./routes/user.routes");
const recallRoutes = require("./routes/recall.routes");
const resourceRoutes = require("./routes/resource.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
  });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/recalls", recallRoutes);
app.use("/api/resources", resourceRoutes);

// Error middleware
app.use(errorMiddleware);

// Server start
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});