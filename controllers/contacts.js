// Contacts Controller.

// Dependencies:
const contactsModel = require("../models/contacts");

// Functions:

// Retrieve all contacts.
async function getAllContacts(req, res) {
  const data = await contactsModel.getAllContacts();
  res.send(data);
}

// Retrieve a single contact.
async function getContact(req, res) {
  const id = req.params.id;
  const data = await contactsModel.getContact(id);
  res.send(data);
}

// Export controller.
module.exports = { getAllContacts, getContact };
