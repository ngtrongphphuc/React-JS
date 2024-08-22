const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connect db successfully");
  } catch (error) {
    console.log("Connect db failure");
  }
};

module.exports = connectDB;
