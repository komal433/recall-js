const asyncHandler = require("../utils/asyncHandler");
const Resource = require("../models/resource.model");
const calculateNextReviewDate = require("../utils/reviewScheduler");

const createResource = asyncHandler(async (req, res) => {
  const { title, url, description, type, tags, priority, reviewDate } = req.body;

  if (!title || !url) {
    res.status(400);
    throw new Error("Title and URL are required");
  }

  const resource = await Resource.create({
    title,
    url,
    description,
    type,
    tags,
    priority,
    reviewDate,
    user: req.user.id,
  });

  return res.status(201).json({
    success: true,
    message: "Resource saved successfully",
    resource,
  });
});

const getResources = asyncHandler(async (req, res) => {
  const { type, priority, tag } = req.query;

  const filter = {
    user: req.user.id,
    isArchived: false,
  };

  if (type) {
    filter.type = type;
  }

  if (priority) {
    filter.priority = priority;
  }

  if (tag) {
    filter.tags = tag;
  }

  const resources = await Resource.find(filter).sort({
    createdAt: -1,
  });

  return res.status(200).json({
    success: true,
    count: resources.length,
    resources,
  });
});

const getTodayResources = asyncHandler(async (req, res) => {
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const resources = await Resource.find({
    user: req.user.id,
    isArchived: false,
    reviewDate: {
      $lte: endOfToday,
    },
  }).sort({
    reviewDate: 1,
  });

  return res.status(200).json({
    success: true,
    count: resources.length,
    resources,
  });
});

const updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findOne({
    _id: req.params.id,
    user: req.user.id,
    isArchived: false,
  });

  if (!resource) {
    res.status(404);
    throw new Error("Resource not found");
  }

  const { title, url, description, type, tags, priority, reviewDate } = req.body;

  resource.title = title || resource.title;
  resource.url = url || resource.url;
  resource.description =
    description !== undefined ? description : resource.description;
  resource.type = type || resource.type;
  resource.tags = tags || resource.tags;
  resource.priority = priority || resource.priority;
  resource.reviewDate = reviewDate || resource.reviewDate;

  const updatedResource = await resource.save();

  return res.status(200).json({
    success: true,
    message: "Resource updated successfully",
    resource: updatedResource,
  });
});

const markResourceReviewed = asyncHandler(async (req, res) => {
  const resource = await Resource.findOne({
    _id: req.params.id,
    user: req.user.id,
    isArchived: false,
  });

  if (!resource) {
    res.status(404);
    throw new Error("Resource not found");
  }

  const nextReviewDate = calculateNextReviewDate(resource.reviewCount);

  resource.reviewCount = resource.reviewCount + 1;
  resource.lastReviewedAt = new Date();
  resource.reviewDate = nextReviewDate;

  const updatedResource = await resource.save();

  return res.status(200).json({
    success: true,
    message: "Resource marked as reviewed",
    resource: updatedResource,
  });
});

const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findOne({
    _id: req.params.id,
    user: req.user.id,
    isArchived: false,
  });

  if (!resource) {
    res.status(404);
    throw new Error("Resource not found");
  }

  resource.isArchived = true;
  await resource.save();

  return res.status(200).json({
    success: true,
    message: "Resource deleted successfully",
  });
});

module.exports = {
  createResource,
  getResources,
  getTodayResources,
  updateResource,
  markResourceReviewed,
  deleteResource,
};