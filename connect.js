const mongoose = require("mongoose");
// import mongoose from "mongoose";
const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://abdulrahmansoyooye:Blogapp151.com@blogapp.02ugemt.mongodb.net/blogapp"
    );
    console.log("Connection Successful");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectToDatabase;
