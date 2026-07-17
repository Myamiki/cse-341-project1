require("dotenv").config();

console.log("Loaded URI:", process.env.MONGODB_URI);

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { initDb } = require("./contacts-project/data/database");

console.log("Mongo URI:", process.env.MONGODB_URI);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

initDb()
  .then(() => {
    // Swagger Documentation
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Routes
    app.use("/", require("./contacts-project/routes"));

    // Start Server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });