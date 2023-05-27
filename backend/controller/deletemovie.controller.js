const { Movie } = require("../model/Movie");

async function deleteMovie(req, res) {
  const { id } = req.body;

  const movie = await Movie.findById(id);

  if (movie.userId !== req.user.id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const movie = await Movie.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `Movie deleted successfully ${movie.title}` });
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { deleteMovie };
