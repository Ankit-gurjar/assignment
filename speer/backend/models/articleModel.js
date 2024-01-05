const mongoose = require("mongoose");

const noteModel = mongoose.Schema(
  {
    articleName: {
      type: String,
      trrim: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      trrim: true,
    },
    articleOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteModel);

module.exports = Note;
