const app = require("./app");
const config = require("./config/config");
const connect = require("./db/mongoose");

(async () => {
  try {
    await connect();
    console.log("Database is connected");

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();

module.exports = app;