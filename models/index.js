// Default Model.

// Dependencies:
require("dotenv").config();
const client = require("../database/");
const database = process.env.DATABASE;

// Functions:

// Check if server is connected, return a message if not.
async function connectionStatus() {
  try {
    await client.connect();
    await client.db(database).command({ ping: 1 }).then(console.log("connection to MongoDB stablished."));
    return "Bridge stablished.";
  } catch (error) {
    console.log(error);
    return "Bridge could not be stablished.";
  } finally {
    await client.close();
  }
}

// Export model.
module.exports = { connectionStatus };
