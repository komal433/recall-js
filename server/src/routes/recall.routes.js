const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  createRecall,
  getRecalls,
  getRecallById,
  updateRecall,
  deleteRecall,
} = require("../controllers/recall.controller");

router.post("/", authMiddleware, createRecall);
router.get("/", authMiddleware, getRecalls);
router.get("/:id", authMiddleware, getRecallById);
router.put("/:id", authMiddleware, updateRecall);
router.delete("/:id", authMiddleware, deleteRecall);

module.exports = router;