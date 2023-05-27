/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
const AdminMovies = () => {
  const [movies, setMovie] = useState([]);
  const [modelState, setModalState] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchMovies() {
      const res = await axios.get("http://localhost:3000/api/user-movie", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMovie(res.data);
    }
    fetchMovies();
  }, []);
  const updateMovie = async (movie) => {
    navigate(`/update-movie/${movie._id}`);
  };
  const viewMovie = async (movie) => {
    navigate(`/movie/${movie._id}`);
  };

  const handleRemoveClick = async (movieId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/delete-movie/`,
        { id: movieId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data.message);
      toast.success(res.data.message);
      setMovie(movies.filter((movie) => movie._id !== movieId));
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
    setModalState(false);
  };
  return (
    <div style={{ maxWidth: "800px" }} className="mx-auto">
      <h1 style={{ textAlign: "center", padding: "20px" }}>Your Movies</h1>

      {movies.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No Movies Found</h2>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Director</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{movie.title}</td>
                <td>{movie.genre}</td>
                <td>{movie.year}</td>
                <td>{movie.director}</td>
                <td>{movie.ratting}</td>

                <td>
                  <button
                    onClick={() => {
                      viewMovie(movie);
                    }}
                    className="btn btn-primary"
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      updateMovie(movie);
                    }}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedMovie(movie);

                      setModalState(true);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal size="sm" show={modelState}>
        <Modal.Header>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this movie named{" "}
          <b>{selectedMovie.title}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setModalState(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => handleRemoveClick(selectedMovie._id)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default AdminMovies;
