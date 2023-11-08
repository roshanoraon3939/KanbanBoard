require("dotenv").config();

const mongoose = require("mongoose");

function connectToDB() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect('mongodb://localhost:27017/test', {
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
        resolve();
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        reject(err);
      });
  });
}

module.exports = connectToDB;
