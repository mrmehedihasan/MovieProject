const { Movie } = require("./../model/Movie");
/*
const MovieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  runtime: {
    type: Number,
  },
  overview: {
    type: String,
  },
  director: {
    type: String,
  },
  year: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },

  status: {
    type: String,
  },
  actors: {
    type: String,
  },
  ratting: {
    type: Number,
  },
  userId: {
    type: String,
  },
});
*/

async function updateMovie(req, res) {
  const {
    id,
    title,
    genre,
    runtime,
    overview,
    director,
    year,
    description,
    status,
    actors,
  } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }
  const oldMovie = await Movie.findById(id);

  if (oldMovie.userId !== req.user.id) {
    return res.status(401).json({ message: "Not authorized" });
  }
  if (!oldMovie) {
    return res.status(400).json({ message: "Movie not found" });
  }

  let newImagePath;

  if (req.file) {
    newImagePath = `${req.protocol}://${req.get("host")}/` + req.file.filename;
  } else {
    newImagePath = oldMovie.image;
  }

  const newMovieData = {
    title: !title ? oldMovie.title : title,
    genre: !genre ? oldMovie.genre : genre,
    runtime: runtime || oldMovie.runtime,
    overview: overview || oldMovie.overview,
    director: director || oldMovie.director,
    year: year || oldMovie.year,
    description: description || oldMovie.description,
    status: status || oldMovie.status,
    actors: actors || oldMovie.actors,

    image: newImagePath,
  };

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, newMovieData);

    return res.status(200).json({ message: "Movie updated successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
}

module.exports = { updateMovie };
