const { User } = require("./../model/User");
const { Movie } = require("./../model/Movie");

async function getUserMovie(req, res) {
  const { id } = req.user;

  const movieAddedByUser = await Movie.find({ userId: id });

  res.status(200).json(movieAddedByUser);
}

module.exports = { getUserMovie };
