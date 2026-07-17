console.log("✅ contacts.js loaded");

const router = require("express").Router();
const contactsController = require("../controllers/contacts");

// GET all contacts
router.get("/", contactsController.getAll);

// GET one contact by ID
router.get("/:id", contactsController.getSingle);

// POST - Create a new contact
router.post("/", contactsController.createContact);

// PUT - Update a contact
router.put("/:id", contactsController.updateContact);

// DELETE - Delete a contact
router.delete("/:id", contactsController.deleteContact);

module.exports = router;