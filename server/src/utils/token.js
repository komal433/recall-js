const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    "recall_secret_key",
    {
      expiresIn: "1h",
    }
  );
};

module.exports = generateToken;