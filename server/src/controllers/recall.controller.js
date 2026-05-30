const asyncHandler = require("../utils/asyncHandler");
const Recall = require("../models/recall.model");

const createRecall = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Title and content are required");
  }

  const recall = await Recall.create({
    title,
    content,
    category,
    user: req.user.id,
  });

  return res.status(201).json({
    success: true,
    message: "Recall created successfully",
    recall,
  });
});

const getRecalls = asyncHandler(async (req, res) => {
  const recalls = await Recall.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  return res.status(200).json({
    success: true,
    count: recalls.length,
    recalls,
  });
});

module.exports = {
  createRecall,
  getRecalls,
};