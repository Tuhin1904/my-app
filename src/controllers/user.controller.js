const userService = require("../services/user.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const mongoose = require("mongoose");

async function register(req, res) {
  try {
    const { email, password, fullName } = req.body;

    // Check empty fields
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exist = await userService.findUserByEmail(email);
    if (exist) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await userService.createUser({
      fullName,
      email,
      password: hashed,
    });

    return res.status(201).json({ message: "User registered", user });
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return res.status(500).json({
      message: "Registration failed",
      error: err.message,
      stack: err.stack,
    });
    // return res.status(500).json({
    //   message: "Registration failed",
    //   error: statusMap[mongoose.connection.readyState],
    //   stack: statusMap[mongoose.connection.readyState],
    // });
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await userService.findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      config.jwtSecret,
      { expiresIn: "1d" }
    );
    // delete user?.password;
    const plainUser = user.toObject();
    delete plainUser.password;

    return res.status(200).json({
      message: "Login successful",
      token,
      user: plainUser,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return res.status(500).json({
      message: "Login failed",
      error: err.message,
      stack: err.stack,
    });
  }
}

module.exports = { register, signIn };
