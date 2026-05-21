const registerUser = (req, res) => {
  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};

const loginUser = (req, res) => {
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
  });
};

module.exports = {
  registerUser,
  loginUser,
};