const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = { Review };
