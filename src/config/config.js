const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV || "development",
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  logLevel: process.env.LOG_LEVEL || "info",
};
