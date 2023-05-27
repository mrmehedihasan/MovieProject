/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieDetails from "../../components/MovieDetails";
import { apiUrl } from "../../../config";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
function ViewMovie() {
  const location = useLocation().pathname.split("/")[2];
  const [movie, setMovie] = useState([{}]);
  const [review, setReview] = useState([{}]);
  const [avarageRating, setAvarageRating] = useState(0);
  const [modelState, setModalState] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${apiUrl}/api/movie/${location}`);
        console.log(res.data);
        setMovie(res.data?.movie);
        setReview(res.data?.reviews);
        setAvarageRating(res.data?.avarageRating);
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
    fetchData();
  }, [modelState]);

  const hanldeReview = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${apiUrl}/api/add-review`,
        {
          movieId: location,
          review: e.target.review.value,
          rating: e.target.rating.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      toast.success(res.data.message);
      setMovie(res.data?.movie);
      setReview(res.data?.reviews);
      setAvarageRating(res.data?.avarageRating);
      setModalState(false);
      navigate("/home");
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <MovieDetails movie={movie} />
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <Button variant="primary" onClick={() => setModalState(true)}>
            Add Review
          </Button>
        </div>
        <h5 style={{ textAlign: "center" }}>
          {avarageRating === null ? (
            "No avarage rating yet"
          ) : (
            <div>Avrage Rating is: {avarageRating}</div>
          )}
        </h5>
        {review?.length === 0 ? (
          "No reviews yet"
        ) : (
          <div>
            {review?.map((review, idx) => (
              <div
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  padding: "10px",
                  margin: "10px",
                }}
                key={idx}
                className="card"
              >
                <div>
                  Reviewed by: <b>{review?.username}</b>
                </div>
                <div>
                  Given rating: <b>{review?.rating}</b>
                </div>
                <div>Review: {review?.review}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal size="lg" show={modelState}>
        <form method="post" onSubmit={hanldeReview}>
          <Modal.Header>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Your Rating:{"   "}
              <select name="rating" className="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            Please write your exprience about the movie:
            <textarea name="review" className="form-control"></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalState(false)}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={() => {}}>
              Confirm
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ViewMovie;
