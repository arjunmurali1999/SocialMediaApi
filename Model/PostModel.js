const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref:"User",
    required: [true, "the post shouldbelong to a user"],
    
  },
  image: {
     type:String,
     required: [true, "the post should have an image"]
  },
  title: {
    type: String,
    required: [true, "the post should have a title"],
  },
  description:{
    type: String,
    required: [true, "the post should have a description"],
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;