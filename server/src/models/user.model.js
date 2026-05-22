const users = [];

const findUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

const createUser = (userData) => {
  users.push(userData);
  return userData;
};

module.exports = {
  users,
  findUserByEmail,
  createUser,
};