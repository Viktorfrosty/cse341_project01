// Default Controller.

// Dependencies:
const model = require("../models/");

// Functions:

// check if server is running smoothly.
async function status(req, res) {
  //#swagger.tags = ["Status"]
  const message = await model.connectionStatus();
  res.send(message);
}

// Export controller.
module.exports = { status };
