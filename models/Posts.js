const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    author: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;
