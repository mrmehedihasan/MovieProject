/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
function CardTemplate({ title, image, ratting, id, year }) {
  return (
    <>
      <div className="card movie_card" style={{ width: "18rem" }}>
        <img src={image} className="card-img-top" alt="..." />
        <div className="card-body">
          <Link to={`/movie/${id}`}>
            <i className="bi bi-film play_button" title="View More"></i>
          </Link>

          <h5 className="card-title">{title}</h5>
          <span className="movie_info">{year}</span>
          <span className="movie_info float-right">
            <i
              style={{ color: "orange", fontSize: "15px", padding: "5px" }}
              className="bi bi-star-fill"
            />
            {ratting} / 5
          </span>
        </div>
      </div>
    </>
  );
}

export default CardTemplate;
