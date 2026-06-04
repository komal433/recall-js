const asyncHandler = require("../utils/asyncHandler");
const Resource = require("../models/resource.model");

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
  const resources = await Resource.find({
    user: req.user.id,
    isArchived: false,
  }).sort({
    createdAt: -1,
  });

  return res.status(200).json({
    success: true,
    count: resources.length,
    resources,
  });
});

module.exports = {
  createResource,
  getResources,
};