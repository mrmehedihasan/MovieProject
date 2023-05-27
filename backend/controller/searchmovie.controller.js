const { Movie } = require("../model/Movie");

const searchMovies = async (req, res) => {
  const movies = await Movie.find({
    $or: [
      { title: { $regex: req.params.query, $options: "i" } },
      { actors: { $regex: req.params.query, $options: "i" } },
      { director: { $regex: req.params.query, $options: "i" } },
      { genre: { $regex: req.params.query, $options: "i" } },
      { status: { $regex: req.params.query, $options: "i" } },
    ],
  }).sort({
    createdAt: -1,
  });

  res.status(200).json(movies);
};

module.exports = { searchMovies };
