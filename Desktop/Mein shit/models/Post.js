const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  text: {
    type: String,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  likes: [
    {
      type: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
});

module.exports = mongoose.model("post", PostSchema);
