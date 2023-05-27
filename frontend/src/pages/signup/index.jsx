import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContextState } from "../../context/AuthContext";
import { toast } from "react-toastify";

function SignUp() {
  const navigateTo = useNavigate();
  const { token } = useContext(AuthContextState);

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    passwordRep: "",
    photo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      console.log(key, value);
      formData.append(key, value);
    });
    formData.append("key", "value");
    console.log(formData);
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);
      navigateTo("/login");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: files ? files[0] : value,
    }));
  };

  if (token) {
    navigateTo("/home");
    return null;
  }

  return (
    <div className="registration-form">
      <form method="post" onSubmit={handleSubmit}>
        <h1>Admin Sign Up</h1>

        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            id="username"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            id="fullname"
            placeholder="Full name"
            name="fullname"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            id="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            id="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            id="passwordRep"
            placeholder="Repete Password"
            name="passwordRep"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control item"
            id="passwordRep"
            placeholder="Repete Password"
            name="photo"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-block create-account">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
