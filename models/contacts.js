// Contacts model.

// Dependencies:
require("dotenv").config();
const client = require("../database/");
const { ObjectId } = require("mongodb");
const database = process.env.DATABASE;
const collection = process.env.COLLECTION;
const env = process.env.NODE_ENV;
const processedTrue = "Request processed.";
const processedFalse = "Request could not be processed.";

// Functions:

// Interact with the database and retrieve all contacts.
async function getAllContacts() {
  try {
    await client.connect();
    const data = await client.db(database).collection(collection).find({}).toArray();
    if (data.length > 0) {
      return data;
    } else {
      return { message: "No contacts registered." };
    }
  } catch (error) {
    return { message: error.errmsg };
  } finally {
    await client.close();
  }
}

// Interact with the database and retrieve a single contact.
async function getContact(id) {
  try {
    await client.connect();
    const data = await client
      .db(database)
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });
    if (!data) {
      return { message: "Contact does not exist." };
    }
    return data;
  } catch (error) {
    return { message: error.errmsg };
  } finally {
    await client.close();
  }
}

// Interact with the database and add a single contact.
async function addContact(info) {
  try {
    await client.connect();
    const result = await client.db(database).collection(collection).insertOne({
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
      favoriteColor: info.favoriteColor,
      birthday: info.birthday,
    });
    const msg = `${processedTrue} New Entry Id: ${result["insertedId"]}`;
    if (env == "development") {
      console.log(msg);
    }
    return { message: msg };
  } catch (error) {
    return { message: error.errmsg };
  }
}

// Interact with the database and updates a single contact.
async function updateContact(id, info) {
  try {
    await client.connect();
    const update = await client
      .db(database)
      .collection(collection)
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            firstName: info.firstName,
            lastName: info.lastName,
            email: info.email,
            favoriteColor: info.favoriteColor,
            birthday: info.birthday,
          },
        },
      );
    if (update.modifiedCount > 0) {
      const msg = `${processedTrue} Processed Id: ${id}`;
      if (env == "development") {
        console.log(msg);
      }
      return { message: msg };
    } else {
      if (env == "development") {
        console.log(processedFalse);
      }
      return { message: processedFalse };
    }
  } catch (error) {
    return { message: error.errmsg };
  }
}

// Interact with the database and delete a single contact.
async function deleteContact(id) {
  try {
    await client.connect();
    const update = await client
      .db(database)
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });
    if (update.deletedCount > 0) {
      if (env == "development") {
        console.log(processedTrue);
      }
      return { message: processedTrue };
    } else {
      if (env == "development") {
        console.log(processedFalse);
      }
      return { message: processedFalse };
    }
  } catch (error) {
    return { message: error.errmsg };
  }
}

// Export model.
module.exports = { getAllContacts, getContact, addContact, updateContact, deleteContact };
