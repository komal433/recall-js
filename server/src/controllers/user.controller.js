const generateToken = require("../utils/token");
const { findUserByEmail, createUser } = require("../models/user.model");

const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const existingUser = findUserByEmail(email);

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User already exists",
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  createUser(newUser);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
   const token = generateToken(user);

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });



  
};
const getProfile = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Protected profile data",
    user: req.user,
  });
};
module.exports = {
  registerUser,
  loginUser,
  getProfile,
};