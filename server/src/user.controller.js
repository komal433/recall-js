const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      name,
      email
    }
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required"
    });
  }

  return res.status(200).json({
    success: true,
    message: "User logged in successfully"
  });
};

module.exports = {
  registerUser,
  loginUser
};