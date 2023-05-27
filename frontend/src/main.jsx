import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContext>
    <HashRouter>
      <App />
    </HashRouter>
  </AuthContext>
);
