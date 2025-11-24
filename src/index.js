const app = require("./app");
const config = require("./config/config");
const connect = require("./db/mongoose");

async function start() {
  try {
    await connect();

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error("Failed to start:", err);
  }
}

start();
