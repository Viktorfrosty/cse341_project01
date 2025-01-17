// Contacts Controller.

// Dependencies:
const contactsModel = require("../models/contacts");

// Functions:

// Retrieve all contacts.
async function getAllContacts(req, res) {
  const result = await contactsModel.getAllContacts();
  res.send(result);
}

// Retrieve a single contact.
async function getContact(req, res) {
  const id = req.params.id;
  const result = await contactsModel.getContact(id);
  res.send(result);
}

// Add a single contact.
async function addContact(req, res) {
  const info = req.body;
  const result = await contactsModel.addContact(info);
  res.send(result);
}

// Updates a single contact.
async function updateContact(req, res) {
  const id = req.params.id;
  const info = req.body;
  const result = await contactsModel.updateContact(id, info);
  res.send(result);
}

// Deletes a single contact.
async function deleteContact(req, res) {
  const id = req.params.id;
  const result = await contactsModel.deleteContact(id);
  res.send(result);
}

// Export controller.
module.exports = { getAllContacts, getContact, addContact, updateContact, deleteContact };
