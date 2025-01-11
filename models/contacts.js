// Contacts model.

// Dependencies:
const client = require("../database/");
// const { ObjectId } = require("mongodb");
const database = process.env.DATABASE;
const collection = process.env.COLLECTION;

// Functions:

// Retrieve all contacts.
async function getAllContacts() {
  try {
    const data = await client.db(database).collection(collection).find().toArray();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Retrieve a single contact.
async function getContact(id) {
  try {
    const data = await client.db(database).collection(collection).findOne({ _id: id });
    // .findOne({ _id: new ObjectId(id) });
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Export model.
module.exports = { getAllContacts, getContact };
