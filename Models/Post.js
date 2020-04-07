const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const PostSchema = new Schema({
  user: {
    type: Mongoose.Schema.ObjectId,
    ref: "users",
  },
  avatar: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: Mongoose.Schema.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Mongoose.Schema.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = Mongoose.model("posts", PostSchema);
