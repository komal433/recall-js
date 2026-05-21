// src/controllers/recallController.js

let recalls = []; // in-memory storage (temporary DB)

export const createRecall = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
  }

  const newRecall = {
    id: recalls.length + 1,
    title,
    description,
    createdAt: new Date(),
  };

  recalls.push(newRecall);

  res.status(201).json({
    success: true,
    data: newRecall,
  });
};

export const getAllRecalls = (req, res) => {
  res.status(200).json({
    success: true,
    data: recalls,
  });
};