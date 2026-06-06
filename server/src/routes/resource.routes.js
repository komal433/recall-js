const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  createResource,
  getResources,
  getTodayResources,
  updateResource,
  markResourceReviewed,
  deleteResource,
} = require("../controllers/resource.controller");

router.post("/", authMiddleware, createResource);
router.get("/", authMiddleware, getResources);
router.get("/today", authMiddleware, getTodayResources);
router.put("/:id", authMiddleware, updateResource);
router.patch("/:id/review", authMiddleware, markResourceReviewed);
router.delete("/:id", authMiddleware, deleteResource);

module.exports = router;