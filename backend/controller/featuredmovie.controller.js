const { Movie } = require("../model/Movie");
const { Review } = require("../model/Reviews");
async function top10Released(req, res) {
  try {
    const movies = await Movie.find({ status: "released" });
    const moviewithrating = [];

    let totalRating = 0;

    for (const movie of movies) {
      const reviews = await Review.find({ movieId: movie._id });
      const rating = reviews.length;

      const sumRating = reviews.reduce((a, b) => a + b.rating, 0);
      const avrageRating = sumRating / reviews.length;
      moviewithrating.push({
        id: movie._id,
        title: movie.title,
        ratting: avrageRating,
        year: movie.year,
        image: movie.image,
      });
    }

    console.log(moviewithrating);

    res.json(moviewithrating.slice(0, 10));
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}
async function top10Upcomming(req, res) {
  try {
    const movies = await Movie.find({ status: "upcoming" });
    const moviewithrating = [];

    let totalRating = 0;

    for (const movie of movies) {
      const reviews = await Review.find({ movieId: movie._id });
      const rating = reviews.length;

      const sumRating = reviews.reduce((a, b) => a + b.rating, 0);
      const avrageRating = sumRating / reviews.length;
      moviewithrating.push({
        id: movie._id,
        title: movie.title,
        ratting: avrageRating,
        year: movie.year,
        image: movie.image,
      });
    }

    console.log(moviewithrating);

    res.json(moviewithrating.slice(0, 10));
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { top10Released, top10Upcomming };
