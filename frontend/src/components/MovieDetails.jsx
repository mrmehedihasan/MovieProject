/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContextState } from "../context/AuthContext";
const MovieDetails = ({ movie }) => {
  const { token } = useContext(AuthContextState);

  const [modelState, setModalState] = useState(false);
  const navigate = useNavigate();
  const addToFav = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/add-favorite-movie/`,
        { id: movie._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data.message);
      toast.success(res.data.message);
      setModalState(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setModalState(false);
      navigate("/login");
    }
  };

  return (
    <>
      <Modal size="sm" show={modelState}>
        <Modal.Header>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to add <b>{movie?.title}</b> to favorites?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalState(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => addToFav()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex justify-content-center">
        <div className="card mb-3" style={{ maxWidth: "800px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={movie.image}
                className="img-fluid rounded-start"
                alt={movie.title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{movie.title}</h2>
                <p className="card-text">
                  <strong>Genre:</strong> {movie.genre}
                </p>
                <p className="card-text">
                  <strong>Runtime:</strong> {movie.runtime} min
                </p>
                <p className="card-text">{movie.overview}</p>
                <p className="card-text">
                  <strong>Director:</strong> {movie.director}
                </p>
                <p className="card-text">
                  <strong>Year:</strong> {movie.year}
                </p>
                <p className="card-text">
                  <strong>Description:</strong> {movie.description}
                </p>
                <p className="card-text">
                  <strong>Actors:</strong> {movie.actors}
                </p>
                <p className="card-text">
                  <strong>Rating:</strong> {movie.ratting}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setModalState(true)}
                >
                  Add to favorite
                </button>{" "}
                {"  "}
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
