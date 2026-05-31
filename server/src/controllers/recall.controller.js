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

const getRecallById = asyncHandler(async (req, res) => {
  const recall = await Recall.findById(req.params.id);

  if (!recall) {
    res.status(404);
    throw new Error("Recall not found");
  }

  if (recall.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to access this recall");
  }

  return res.status(200).json({
    success: true,
    recall,
  });
});

const updateRecall = asyncHandler(async (req, res) => {
  const recall = await Recall.findById(req.params.id);

  if (!recall) {
    res.status(404);
    throw new Error("Recall not found");
  }

  if (recall.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to update this recall");
  }

  recall.title = req.body.title || recall.title;
  recall.content = req.body.content || recall.content;
  recall.category = req.body.category || recall.category;

  const updatedRecall = await recall.save();

  return res.status(200).json({
    success: true,
    message: "Recall updated successfully",
    recall: updatedRecall,
  });
});

const deleteRecall = asyncHandler(async (req, res) => {
  const recall = await Recall.findById(req.params.id);

  if (!recall) {
    res.status(404);
    throw new Error("Recall not found");
  }

  if (recall.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to delete this recall");
  }

  await recall.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Recall deleted successfully",
  });
});

module.exports = {
  createRecall,
  getRecalls,
  getRecallById,
  updateRecall,
  deleteRecall,
};