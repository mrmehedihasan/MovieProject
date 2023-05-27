import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContextState } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import { apiUrl } from "../../../config";
function UpdateMovie() {
  const { token, userdata } = useContext(AuthContextState);
  const navigateTo = useNavigate();

  const id = useLocation().pathname.split("/")[2];
  const [movie, setMovie] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${apiUrl}/api/movie/${id}`);
        setMovie(res.data.movie);
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
    fetchData();
  }, [id]);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [runtime, setRuntime] = useState("");
  const [genre, setGenre] = useState("");
  const [overview, setOverview] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("released");
  const [actors, setActors] = useState("");
  const [ratting, setRatting] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("photo", file);
    formData.append("runtime", runtime);
    formData.append("genre", genre);
    formData.append("overview", overview);
    formData.append("director", director);
    formData.append("year", year);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("actors", actors);
    formData.append("ratting", ratting);
    console.log(formData);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/update-movie",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <div
      className="container p-4"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        id="signupbox"
        style={{ marginTop: "50px" }}
        className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
      >
        <div className="panel panel-info">
          <div className="panel-body">
            <form method="post" onSubmit={handleSubmit}>
              <div className="form-group required">
                <label className="control-label col-md-4  requiredField">
                  Movie Status<span className="asteriskField">*</span>
                </label>
                <div className="controls col-md-8 ">
                  <select
                    className="input-md  textinput textInput form-control"
                    id="status"
                    name="status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="released">Released</option>
                    <option value="upcoming">Upcomming</option>
                  </select>
                </div>
              </div>

              <div className="form-group required">
                <label className="control-label col-md-4  requiredField">
                  Title<span className="asteriskField">*</span>
                </label>
                <div className="controls col-md-8 ">
                  <input
                    className="input-md  textinput textInput form-control"
                    id="title"
                    maxLength={30}
                    name="title"
                    placeholder={`Pervious: ${movie.title}`}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ marginBottom: "10px" }}
                    type="text"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-4  requiredField">
                  Genre
                </label>
                <div className="controls col-md-8 ">
                  <input
                    className="input-md  textinput textInput form-control"
                    id="genre"
                    name="genre"
                    placeholder={`Pervious: ${movie.genre}`}
                    onKeyUp={(e) => setGenre(e.target.value)}
                    style={{ marginBottom: "10px" }}
                    type="text"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-4  requiredField">
                  Runtime
                </label>
                <div className="controls col-md-8 ">
                  <input
                    className="input-md  textinput textInput form-control"
                    id="runtime"
                    name="runtime"
                    placeholder={`Pervious: ${movie.runtime}`}
                    onKeyUp={(e) => setRuntime(e.target.value)}
                    style={{ marginBottom: "10px" }}
                    type="text"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-4  requiredField">
                  Ratting
                </label>
                <div className="controls col-md-8 ">
                  <input
                    className="input-md  textinput textInput form-control"
                    id="ratting"
                    name="ratting"
                    placeholder={`Pervious: ${movie.ratting}`}
                    onKeyUp={(e) => setRatting(e.target.value)}
                    style={{ marginBottom: "10px" }}
                    type="text"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-4  requiredField">
                  Year
                </label>
                <div className="controls col-md-8 ">
                  <input
                    className="input-md  textinput textInput form-control"
                    id="year"
                    name="year"
                    placeholder={`Pervious: ${movie.year}`}
                    onKeyUp={(e) => setYear(e.target.value)}
                    style={{ marginBottom: "10px" }}
                    type="text"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-4 ">Director</label>
                <div className="controls col-md-8 ">
                  <input
                    className="input-md  textinput textInput form-control"
                    id="director"
                    name="director"
                    placeholder={`Pervious: ${movie.director}`}
                    onKeyUp={(e) => setDirector(e.target.value)}
                    style={{ marginBottom: "10px" }}
                    type="text"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-4 ">Actors</label>
                <div className="controls col-md-8 ">
                  <input
                    className="input-md  textinput textInput form-control"
                    id="actors"
                    name="actors"
                    placeholder={`Pervious: ${movie.actors}`}
                    onKeyUp={(e) => setActors(e.target.value)}
                    style={{ marginBottom: "10px" }}
                    type="text"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-4 ">Overview</label>
                <div className="controls col-md-8 ">
                  <input
                    className="input-md  textinput textInput form-control"
                    id="overview"
                    name="overview"
                    placeholder={`Pervious: ${movie.overview}`}
                    onKeyUp={(e) => setOverview(e.target.value)}
                    style={{ marginBottom: "10px" }}
                    type="text"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-md-4 ">Discription</label>
                <div className="controls col-md-8 ">
                  <textarea
                    className="input-md  textinput textInput form-control"
                    id="discription"
                    name="discription"
                    placeholder={`Pervious: ${movie.description}`}
                    onKeyUp={(e) => setDescription(e.target.value)}
                    style={{ marginBottom: "10px" }}
                    type="text"
                  ></textarea>
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-md-4 ">Cover Photo</label>
                <div className="controls col-md-8 ">
                  <input
                    type="file"
                    className="input-md  textinput textInput form-control"
                    id="photo"
                    name="photo"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="aab controls col-md-4 " />
                <div className="controls col-md-8">
                  <input
                    type="submit"
                    name="submit"
                    defaultValue="Submit"
                    className="btn btn-primary btn btn-info"
                    id="submit"
                  />
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigateTo(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateMovie;
