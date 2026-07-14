const { MongoClient } = require("mongodb");

let database;

const initDb = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();

    database = client.db("contactsDB");

    console.log("✅ Connected to MongoDB");

    return database;
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    throw err;
  }
};

const getDb = () => {
  if (!database) {
    throw new Error("Database has not been initialized.");
  }

  return database;
};

module.exports = {
  initDb,
  getDb
};