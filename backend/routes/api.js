const express = require("express");
const router = express.Router();
const { uploadMiddleWare } = require("../helper/upload.helper");
const addMovie = require("../controller/addmovie.controller");
const { Movie } = require("../model/Movie");
const { searchMovies } = require("../controller/searchmovie.controller");
const { deleteMovie } = require("../controller/deletemovie.controller");
const {
  authenticateToken,
  authenticateTokenAdmin,
} = require("./../controller/auth.controller");
const {
  top10Released,
  top10Upcomming,
} = require("../controller/featuredmovie.controller");
const {
  addFavoriteMovie,
  removeFavoriteMovie,
} = require("../controller/addtofav.controller");

const { viewMovie } = require("../controller/viewmovie.controller");

const {
  viewFavMoviesFromUser,
} = require("../controller/viewfavmovie.controller");

const { getUserMovie } = require("./../controller/usermovie.controller");
const { updateMovie } = require("./../controller/updatemovie.controller");

const { createReview } = require("./../controller/createreview.controller");

const {
  userMoviesReview,
  updateReview,
  deleteReview,
} = require("./../controller/getreview.controller");

router.post(
  "/add-movie",
  authenticateTokenAdmin,
  uploadMiddleWare.single("photo"),
  addMovie
);

router.get("/search-movies/:query", searchMovies);
router.get("/movie/:query", viewMovie);

router.post("/delete-movie/", authenticateTokenAdmin, deleteMovie);

router.post("/add-favorite-movie", authenticateToken, addFavoriteMovie);

router.post("/remove-favorite-movie", authenticateToken, removeFavoriteMovie);

router.get("/top10released", top10Released);

router.get("/top10upcomming", top10Upcomming);

router.get("/view-fav-movie", authenticateToken, viewFavMoviesFromUser);

router.get("/user-movie", authenticateTokenAdmin, getUserMovie);

router.post(
  "/update-movie",
  authenticateTokenAdmin,
  uploadMiddleWare.single("photo"),
  updateMovie
);

// Review

router.post("/add-review", authenticateToken, createReview);
router.get("/user-review", authenticateToken, userMoviesReview);
router.post("/update-review", authenticateToken, updateReview);
router.post("/delete-review", authenticateToken, deleteReview);

module.exports = router;
