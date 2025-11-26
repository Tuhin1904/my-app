const mongoose = require("mongoose");
const config = require("../config/config");

async function connectDB() {
  try {
    await mongoose.connect(config.mongoURI);
    console.log("Mongo Connected");
  } catch (error) {
    console.log("Failed to connect DB", error);
    process.exit(1);
  }
}

module.exports = connectDB;
