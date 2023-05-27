import { toast } from "react-toastify";
import "./main.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContextState } from "../../context/AuthContext";

function Login() {
  const { token, setToken, userdata, setUserdata } =
    useContext(AuthContextState);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (token) {
      navigateTo("/home");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await axios.post("http://localhost:3000/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Login Success");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userdata", JSON.stringify(res.data["user"]));
      console.log(res.data["user"]);
      setToken(res.data.token);
      setUserdata(res.data["user"]);

      //   navigateTo("/login");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div>
      <div className="registration-form">
        <form method="post" onSubmit={handleSubmit}>
          <h1 style={{ textAlign: "center" }}>Login</h1>

          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="email"
              placeholder="Username or email"
              name="email"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="password"
              placeholder="Password"
              name="password"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block create-account">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
