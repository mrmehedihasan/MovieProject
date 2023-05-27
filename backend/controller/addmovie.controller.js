const { Movie } = require("../model/Movie");
async function addMovie(req, res) {
  const {
    title,
    runtime,
    genre,
    overview,
    director,
    year,
    description,
    status,
    actors,
  } = req.body;

  if (
    !title ||
    !runtime ||
    !genre ||
    !overview ||
    !director ||
    !year ||
    !description ||
    !status ||
    !actors
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const currentUrl = `${req.protocol}://${req.get("host")}/`;
  const newMovie = new Movie({
    title,
    runtime,
    genre,
    overview,
    director,
    year,
    description,
    image: currentUrl + req.file.filename,
    status,
    actors,

    userId: req.user.id,
  });

  try {
    await newMovie.save();

    res.status(201).json({
      message: "Movie added successfull.",
    });
  } catch (err) {
    res.status(500).json(err);
  }
}
module.exports = addMovie;
