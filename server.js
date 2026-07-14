require("dotenv").config();

console.log("Loaded URI:", process.env.MONGODB_URI);

const express = require("express");
const { initDb } = require("./contacts-project/data/database");

console.log("Mongo URI:", process.env.MONGODB_URI);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

initDb()
  .then(() => {
    app.use("/", require("./contacts-project/routes"));

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });