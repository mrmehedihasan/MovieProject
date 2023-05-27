import { useContext, useState, useEffect } from "react";

import { AuthContextState } from "../context/AuthContext";

import { Link } from "react-router-dom";

function AdminOption() {
  return (
    <div style={{ border: "1px solid black" }}>
      <h3 className="text-center p-4">Admin Option</h3>
      <div className="d-flex  justify-content-center align-items-center p-2">
        <div
          style={{
            width: "150px",
            height: "150px",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link className="btn btn-primary" to="/addmovies">
            Add Movie
          </Link>
        </div>
        <div
          style={{
            width: "150px",
            height: "150px",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link className="btn btn-primary" to="/yourmovies">
            Your Movies
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminOption;
