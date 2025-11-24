const User = require("../models/user.model");

async function createUser(data) {
  return await User.create(data);
}

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

module.exports = { createUser, findUserByEmail };
