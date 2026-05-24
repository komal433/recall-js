
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/user.controller");

console.log(require("../middleware/auth.middleware"));
console.log(require("../controllers/user.controller"));
router.post("/register", registerUser);
router.post("/login", loginUser);
console.log("authMiddleware:", typeof authMiddleware);
console.log("getProfile:", typeof getProfile);
router.get("/profile", authMiddleware, getProfile);
module.exports = router;