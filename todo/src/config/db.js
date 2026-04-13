const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todo_app");

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("DB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
