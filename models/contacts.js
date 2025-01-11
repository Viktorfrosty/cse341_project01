// Contacts model.

// Dependencies:
require("dotenv").config();
const client = require("../database/");
const { ObjectId } = require("mongodb");
const database = process.env.DATABASE;
const collection = process.env.COLLECTION;

// Functions:

// Retrieve all contacts.
async function getAllContacts() {
  try {
    await client.connect();
    const data = await client.db(database).collection(collection).find({}).toArray();
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

// Retrieve a single contact.
async function getContact(id) {
  try {
    await client.connect();
    const data = await client
      .db(database)
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

// Export model.
module.exports = { getAllContacts, getContact };
