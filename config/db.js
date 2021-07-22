const mongoose = require("mongoose");
user = require("../models/dbModel")
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

dbConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConfig
