import { apiUrl } from "../../config";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useState } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import axios from "axios";
import { Link } from "react-router-dom";
const AsyncSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/search-movies/${query}`);
      console.log(res.data);
      setOptions(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      labelKey="_id"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder="Enter movie name, actors name, director name, year, genre..."
      renderMenuItemChildren={(option) => (
        <>
          <Link to={`/movie/${option._id}`}>
            {" "}
            <img
              alt={option.title}
              src={option.image}
              style={{
                height: "24px",
                marginRight: "10px",
                width: "24px",
              }}
            />
            <span>{option.title}</span>
          </Link>
        </>
      )}
    />
  );
};

export default AsyncSearch;
