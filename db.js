const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

mongoose
  .connect(MONGO_URI, {
    dbName: DB_NAME,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Error connecting to database: ", err);
  });
