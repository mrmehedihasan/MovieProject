import { siteTitile } from "../../config";
import { useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate();

  return (
    <>
      <section
        style={{ position: "relative", bottom: "-200px", width: "100%" }}
      >
        {/* Footer */}
        <footer
          className="text-center text-white"
          style={{ backgroundColor: "lightgray" }}
        >
          {/* Grid container */}
          {!localStorage.getItem("token") && (
            <div className="container p-4 pb-0">
              {/* Section: CTA */}
              <section className="">
                <p className="d-flex justify-content-center align-items-center">
                  <span className="me-3">Register as admin</span>
                  <button
                    type="button"
                    className="btn btn-outline-light btn-rounded"
                    onClick={() => {
                      navigate("/admin-signup-secrect");
                    }}
                  >
                    Sign up!
                  </button>
                </p>
              </section>
              {/* Section: CTA */}
            </div>
          )}
          {/* Grid container */}
          {/* Copyright */}
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © {new Date().getFullYear()} Copyright:
            <a className="text-white" href="/">
              {siteTitile}
            </a>
          </div>
          {/* Copyright */}
        </footer>
        {/* Footer */}
      </section>
    </>
  );
}

export default Footer;
