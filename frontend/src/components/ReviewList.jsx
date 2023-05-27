/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
const ReviewList = () => {
  const [reviews, setReviews] = useState("");
  const [modelState, setModalState] = useState(false);
  const [selectedReview, setSelectedReview] = useState("");
  const [updateStateModal, setUpdateStateModal] = useState(false);
  const [selectedReviewEdit, setSelectedReviewEdit] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchMovies() {
      const res = await axios.get("http://localhost:3000/api/user-review", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      setReviews(res.data);
    }
    fetchMovies();
  }, [modelState, updateStateModal]);

  const viewMovie = async (movie) => {
    navigate(`/movie/${movie.movieId}`);
  };

  const handleRemoveClick = async (reviewId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/delete-review/`,
        { id: reviewId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data.message);
      toast.success(res.data.message);
      setReviews(reviews.filter((movie) => movie.id !== reviewId));
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
    setModalState(false);
  };

  const handleReviewUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:3000/api/update-review/`,
        {
          id: selectedReviewEdit.id,
          review: e.target.review.value,
          rating: e.target.rating.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data.message);
      toast.success(res.data.message);
      setReviews(
        reviews.map((movie) =>
          movie.id === selectedReviewEdit.id ? res.data.review : movie
        )
      );
      setSelectedReviewEdit({});
    } catch (err) {
      console.log(err);
      toast.error(err);
    }

    setUpdateStateModal(false);
  };

  return (
    <div style={{ maxWidth: "800px" }} className="mx-auto">
      {reviews.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No Movies Found</h2>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th>Title</th>
              <th>Review</th>
              <th>Rating</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{item?.title}</td>
                <td>{item?.review.slice(0, 20)}....</td>
                <td>{item?.rating}</td>

                <td>
                  <button
                    onClick={() => {
                      setSelectedReview(item);

                      setModalState(true);
                    }}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      viewMovie(item);
                    }}
                    className="btn btn-primary"
                  >
                    View Movie
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setUpdateStateModal(true);
                      setSelectedReviewEdit(item);
                    }}
                    className="btn btn-primary"
                  >
                    Update Movie
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
        <Modal.Body>Are you sure you want to delete this review</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setModalState(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => handleRemoveClick(selectedReview.id)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={updateStateModal}>
        <form method="post" onSubmit={handleReviewUpdate}>
          <Modal.Header>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Your Rating:{"   "}
              <select
                name="rating"
                className="form-control"
                value={selectedReviewEdit.rating}
                onChange={(e) =>
                  setSelectedReviewEdit({
                    ...selectedReviewEdit,
                    rating: e.target.value,
                  })
                }
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            Please write your exprience about the movie:
            <textarea
              name="review"
              className="form-control"
              value={selectedReviewEdit.review}
              onChange={(e) =>
                setSelectedReviewEdit({
                  ...selectedReviewEdit,
                  review: e.target.value,
                })
              }
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setUpdateStateModal(false)}
            >
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={() => {}}>
              Confirm
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ReviewList;
