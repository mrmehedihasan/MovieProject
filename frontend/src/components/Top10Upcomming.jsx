import { Row } from "react-bootstrap";
import CardTemplate from "./Card";
import axios from "axios";
import { useEffect, useState } from "react";
function Top10Upcomming() {
  const [movie, setMovie] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      const res = await axios.get("http://localhost:3000/api/top10upcomming");
      setMovie(res.data);
    }
    fetchMovies();
  }, []);

  return (
    <div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {movie &&
          movie.map((item, i) => (
            <CardTemplate
              title={item.title}
              key={i}
              image={item.image}
              ratting={item.ratting}
              id={item.id}
              year={item.year}
            />
          ))}
      </div>
    </div>
  );
}

export default Top10Upcomming;
