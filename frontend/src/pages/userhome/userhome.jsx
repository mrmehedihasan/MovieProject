import { useContext, useEffect } from "react";
import MovieList from "../../components/MovieList";
import { AuthContextState } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import AdminOption from "../../components/AdminOption";
import ReviewList from "../../components/ReviewList";
function UserHome() {
  const { userdata, token } = useContext(AuthContextState);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!token) {
      navigateTo("/login");
    }
  });
  return (
    <div className="d-flex  justify-content-center align-items-center ">
      <div>
        <h1 style={{ textAlign: "center" }}>
          Welcome <em>{userdata?.fullname}</em>
        </h1>

        {userdata?.role === "admin" && <AdminOption />}

        <h4 className="p-4" style={{ textAlign: "center" }}>
          Your favorite movies:
        </h4>
        <MovieList />
        <h4 className="p-4" style={{ textAlign: "center" }}>
          Your Reviews:
        </h4>
        <ReviewList />
      </div>
    </div>
  );
}

export default UserHome;
