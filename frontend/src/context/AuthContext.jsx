/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { apiUrl } from "../../config";

const AuthContextState = createContext(null);

function AuthContext({ children }) {
  const [token, setToken] = useState("");
  const [userdata, setUserdata] = useState("");

  useEffect(() => {
    setToken(localStorage?.getItem("token"));
    setUserdata(JSON.parse(localStorage?.getItem("userdata")));
    console.log(userdata);
  }, [token]);

  return (
    <AuthContextState.Provider
      value={{ token, setToken, userdata, setUserdata }}
    >
      {children}
    </AuthContextState.Provider>
  );
}

export default AuthContext;
export { AuthContextState };
