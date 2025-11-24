const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/user.routes");
const connectDB = require("./db/mongoose");
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  if (connectDB && connectDB.readyState === 1) {
    res.status = 200;
    res.json({ message: "MongoDB is connected" });
  } else {
    res.status = 500;
    res.json({ message: "MongoDB is not connected" });
  }
});

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is working!");
});

module.exports = app;
