const { Review } = require("../model/Reviews");
const { Movie } = require("../model/Movie");
const { User } = require("../model/User");

const getAllReviews = async (req, res) => {
  const { movieId } = req.params.id;
  if (!movieId) {
    return res.status(400).json({ message: "Movie id is required" });
  }
  try {
    const reviews = await Review.find({ movieId });
    const usernameAndReviews = reviews.map((review) => {
      return {
        username: User.findById(review.userId).username,
        review: review.review,
        rating: review.rating,
      };
    });
    res.status(200).json(usernameAndReviews);
  } catch (err) {
    res.status(500).json(err);
  }
};

const userMoviesReview = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  if (!id) {
    return res.status(400).json({ message: "User id is required" });
  }
  try {
    const reviews = await Review.find({ userId: id });
    console.log(reviews);
    const movieIds = reviews.map((review) => review.movieId);
    console.log("Movide Ids", movieIds);
    const movies = await Movie.find({ _id: { $in: movieIds } });
    console.log(movies);
    const moviesWithReview = reviews.map((review) => {
      console.log(review);
      const movie = movies.find(
        (m) => m._id.toString() === review.movieId.toString()
      );
      return {
        id: review._id,
        title: movie.title,
        review: review.review,
        rating: review.rating,
        movieId: review.movieId,
      };
    });
    res.status(200).json(moviesWithReview);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateReview = async (req, res) => {
  const { id, review, rating } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Movie id is required" });
  }

  if (!review || !rating) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const oldReview = await Review.findById(id);

  if (!oldReview) {
    return res.status(404).json({ message: "Review not found" });
  }
  console.log(oldReview);
  if (oldReview.userId !== req.user.id) {
    return res.status(403).json({ message: "Not authorized." });
  }

  try {
    const updatedReview = await Review.findByIdAndUpdate(id, {
      review,
      rating,
    });

    const editedReview = await Review.findById(id);
    console.log(editedReview);
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found." });
    }

    return res
      .status(200)
      .json({ message: "Review updated successfully", review: editedReview });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.body;
  const userId = req.user.id;
  console.log(id);
  const oldReview = await Review.findById(id);

  if (oldReview.userId !== userId) {
    return res.status(403).json({ message: "Not authorized." });
  }

  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deleteReview) {
      return res.status(404).json({ message: "Review not found." });
    }
    return res.status(200).json({ message: "Review removed successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getAllReviews,
  updateReview,
  userMoviesReview,
  deleteReview,
};
