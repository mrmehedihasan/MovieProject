const { Movie } = require("../model/Movie");
const { User } = require("../model/User");
const { Review } = require("../model/Reviews");

async function viewMovie(req, res) {
  const id = req.params.query;

  try {
    const [movie, reviews] = await Promise.all([
      Movie.findById(id),
      Review.find({ movieId: id }),
    ]);

    const userIds = reviews.map((review) => review.userId);
    const users = await User.find({ _id: { $in: userIds } });

    const reviewWithUserName = reviews.map((review) => {
      const { username } = users.find((user) => user._id.equals(review.userId));
      return {
        username,
        review: review.review,
        rating: review.rating,
      };
    });

    const avarageRating =
      reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;

    res.status(200).json({
      movie,
      reviews: reviewWithUserName,
      avarageRating,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in getting the movie",
    });
  }
}
module.exports = { viewMovie };
