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

// GET a single contact by ID
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

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve contact.",
      error: err.message
    });
  }
};

module.exports = {
  getAll,
  getSingle
};