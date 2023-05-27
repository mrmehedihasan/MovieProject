const { Review } = require("./../model/Reviews");
const { User } = require("./../model/User");
const { Movie } = require("./../model/Movie");

const createReview = async (req, res) => {
  const { review, movieId, rating } = req.body;
  const userId = req.user.id;

  if (!review || !userId || !movieId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const oldReview = await Review.findOne({ userId, movieId });

  if (typeof parseInt(rating) !== "number" || !parseInt(rating)) {
    return res.status(400).json({ message: "Rating must be a number." });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5." });
  }

  if (oldReview) {
    return res.status(400).json({ message: "Review already exists." });
  }

  const newReview = new Review({
    review,
    userId,
    movieId,
    rating: rating === 0 ? 1 : rating,
  });

  try {
    await newReview.save();
    const updateRattingField = await Movie.findByIdAndUpdate(movieId, {
      $inc: { ratting: rating },
    });
    console.log(updateRattingField);
    res.status(201).json({ message: "Review added successfully." });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createReview };
