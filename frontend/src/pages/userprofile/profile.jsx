import { toast } from "react-toastify";
import "./main.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContextState } from "../../context/AuthContext";
import { useState } from "react";
import { apiUrl } from "../../../config";
function Profile() {
  const navigateTo = useNavigate();

  const [user, setUser] = useState(null);
  const { token, setToken, userdata, setUserdata } =
    useContext(AuthContextState);

  const [updatedUser, setUpdatedUser] = useState(userdata);
  useEffect(() => {
    if (!token) {
      navigateTo("/login");
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const res = await axios.post(`${apiUrl}/auth/updateuser`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      setUserdata(res.data.user);
      localStorage.setItem("userdata", JSON.stringify(res.data.user));
      navigateTo("/home");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <div className="registration-form">
        <form method="post" onSubmit={handleSubmit}>
          <h1 className="p-4" style={{ textAlign: "center" }}>
            Update Information
          </h1>
          <div className="form-group">
            <input
              type="text"
              disabled
              className="form-control item"
              id="username"
              placeholder="Username"
              name="username"
              defaultValue={userdata.username}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="fullname"
              placeholder="Full name"
              name="fullname"
              defaultValue={userdata.fullname}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="email"
              placeholder="Email"
              name="email"
              defaultValue={userdata.email}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control item"
              id="password"
              placeholder="Password"
              name="password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control item"
              id="passwordRep"
              placeholder="Repete Password"
              name="passwordRep"
            />
          </div>
          <div className="form-group">
            <input type="file" className="form-control item" name="photo" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block create-account">
              Update
            </button>
            <div
              className="btn btn-secondary create-account"
              style={{ backgroundColor: "gray" }}
              onClick={() => navigateTo(-1)}
            >
              Back
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
