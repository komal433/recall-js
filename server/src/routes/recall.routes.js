const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  createRecall,
  getRecalls,
} = require("../controllers/recall.controller");

router.post("/", authMiddleware, createRecall);
router.get("/", authMiddleware, getRecalls);

module.exports = router;