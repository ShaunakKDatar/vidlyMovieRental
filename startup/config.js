const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jswPrivateKey not defined.");
    process.exit(1);
  }
};
