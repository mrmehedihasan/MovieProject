const mongoose = require("mongoose");

const user = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  fullname: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  profilePhoto: {
    type: String,
  },
  role: {
    type: String,
  },
  favoriteMovies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

const User = mongoose.model("User", user);

module.exports = { User };
