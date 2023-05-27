import axios from "axios";
import { apiUrl } from "../../config";

const checkTokenValidity = async () => {
  if (!localStorage.getItem("token")) {
    return false;
  }
  try {
    const res = await axios.get(`${apiUrl}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.data.id === JSON.parse(localStorage.getItem("userdata")).id) {
      return true;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userdata");
      return false;
    }
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("userdata");
    return false;
  }
};

export default checkTokenValidity;
