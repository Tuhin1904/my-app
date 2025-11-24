const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is working!");
});

module.exports = app;
