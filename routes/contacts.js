// Contact routes.

// Dependencies:
const express = require("express");
const router = new express.Router();
const contactsController = require("../controllers/contacts");

// GET routes:
router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getContact);

// Export router.
module.exports = router;
