const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  createResource,
  getResources,
} = require("../controllers/resource.controller");

router.post("/", authMiddleware, createResource);
router.get("/", authMiddleware, getResources);

module.exports = router;