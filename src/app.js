const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/user.routes");
const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://self-help-rouge.vercel.app/"], // frontend origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    // credentials: true, // only if you use cookies/auth headers
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.use("/api/users", userRoutes);

module.exports = app;
