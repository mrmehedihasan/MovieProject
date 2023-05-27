import AddMovie from "./pages/addmovies";
import NavBar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import ViewMovie from "./pages/viewmovies/view";
import UserHome from "./pages/userhome/userhome";
import SignUp from "./pages/signup";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/userprofile/profile";
import AdminSignUp from "./pages/adminsignup/AdminSignUp";
import AdminMovies from "./pages/adminmovie/AdminMovies";
import UpdateMovie from "./pages/updatemovie/UpdateMovie";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/home" element={<UserHome />} />
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<ViewMovie />} />
        <Route path="/addmovies" element={<AddMovie />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-signup-secrect" element={<AdminSignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/yourmovies" element={<AdminMovies />} />
        <Route path="/update-movie/:id" element={<UpdateMovie />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
