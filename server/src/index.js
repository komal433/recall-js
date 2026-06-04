require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/error.middleware");
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
const userRoutes = require("./routes/user.routes");
const recallRoutes = require("./routes/recall.routes");
const resourceRoutes = require("./routes/resource.routes");
// Health check (optional but good practice)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
  });
});

// User APIs
app.use("/api/users", userRoutes);
app.use("/api/recalls", recallRoutes);
app.use("/api/resources", resourceRoutes);
app.use(errorMiddleware);
// Server start
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});