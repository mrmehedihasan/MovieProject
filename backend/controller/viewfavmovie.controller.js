const { Movie } = require("./../model/Movie");
const { User } = require("./../model/User");

async function viewFavMoviesFromUser(req, res) {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    const favMovies = await Movie.find({
      _id: { $in: user.favoriteMovies },
    });

    res.status(200).json(favMovies);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = { viewFavMoviesFromUser };
