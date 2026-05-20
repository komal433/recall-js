const express = require("express");

const app = express();
const PORT = 5000;

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is healthy" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});