const userService = require("../services/user.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const exist = await userService.findUserByEmail(email);
    if (exist) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await userService.createUser({
      name,
      email,
      password: hashed,
    });

    return res.status(201).json({ message: "User registered", user });
  } catch (err) {
    const error = JSON.stringify(err);
    return res.status(500).json({ error: err, stack: error });
  }
}

module.exports = { register };
