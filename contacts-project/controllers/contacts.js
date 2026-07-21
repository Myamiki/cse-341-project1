const { ObjectId } = require("mongodb");
const { getDb } = require("../data/database");

// GET all contacts
const getAll = async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection("contacts").find().toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve contacts.",
      error: err.message
    });
  }
};

// GET one contact
const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const db = getDb();
    const contact = await db.collection("contacts").findOne({
      _id: contactId
    });

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found."
      });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve contact.",
      error: err.message
    });
  }
};

// POST - Create contact
const createContact = async (req, res) => {
  try {
    const db = getDb();

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await db.collection("contacts").insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({
        id: response.insertedId
      });
    } else {
      res.status(500).json({
        message: "Failed to create contact."
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// PUT - Update contact
const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = getDb();

    const response = await db.collection("contacts").replaceOne(
      { _id: contactId },
      updatedContact
    );

    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "Contact not found."
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Failed to update contact.",
      error: err.message
    });
  }
};
// DELETE - Delete contact
const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const db = getDb();

    const response = await db.collection("contacts").deleteOne({
      _id: contactId
    });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "Contact not found."
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete contact.",
      error: err.message
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};