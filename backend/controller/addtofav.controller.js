const { Movie } = require("./../model/Movie");
const { User } = require("./../model/User");
async function addFavoriteMovie(req, res) {
  const { id } = req.body;
  const user = req.user.id;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  const userFav = await User.findById(user);
  console.log(userFav.favoriteMovies.includes(movie));
  if (userFav.favoriteMovies.includes(movie._id)) {
    return res.status(400).json({ message: "Movie already in favorites" });
  }
  try {
    userFav.favoriteMovies.push(movie);
    await userFav.save();
    return res.status(200).json({ message: "Movie added to favorites" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong", err: e });
  }
}

async function removeFavoriteMovie(req, res) {
  const { id } = req.body;
  const user = req.user.id;
  console.log(user, id);
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  const userFav = await User.findById(user);
  if (!userFav.favoriteMovies.includes(movie._id)) {
    return res.status(400).json({ message: "Movie not in favorites" });
  }
  try {
    userFav.favoriteMovies.pull(movie);
    await userFav.save();
    return res.status(200).json({ message: "Movie removed from favorites" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong", err: e });
  }
}

module.exports = { addFavoriteMovie, removeFavoriteMovie };
