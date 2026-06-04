import express from "express";
import { createRecall, getAllRecalls } from "../controllers/recallController.js";

const router = express.Router();

router.post("/", createRecall);     // Create recall
router.get("/", getAllRecalls);      // Get all recalls

export default router;