require("dotenv").config();

const mongoose = require("mongoose");

function connectToDB() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect('mongodb+srv://roshanoraon3939:roshanoraon3939@cluster0.i9clblc.mongodb.net/')
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
