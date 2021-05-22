const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
});
ItemSchema.index({ author: "text", title: "text" });

const Post = mongoose.model("Post", ItemSchema);
module.exports = Post;
