const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  runtime: {
    type: Number,
  },
  overview: {
    type: String,
  },
  director: {
    type: String,
  },
  year: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },

  status: {
    type: String,
  },
  actors: {
    type: String,
  },
  ratting: {
    type: Number,
  },
  userId: {
    type: String,
  },
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = { Movie };
