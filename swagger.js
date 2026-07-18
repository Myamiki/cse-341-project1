const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "API for managing contacts",
    version: "1.0.0"
  },

  // Change this to your deployed Render URL
  host: "cse-341-project1-4rfo.onrender.com",

  // Render uses HTTPS
  schemes: ["https"],

  // Root path
  basePath: "/"
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);