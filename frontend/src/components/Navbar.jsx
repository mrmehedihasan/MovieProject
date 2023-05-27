import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { siteTitile } from "../../config";
import { AuthContextState } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router";
function NavBar() {
  const { token, setToken, userdata, setUserdata } =
    useContext(AuthContextState);
  const navigateTo = useNavigate();
  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container fluid>
          <Navbar.Brand style={{ paddingLeft: "100px" }} href="/">
            {siteTitile}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                className="justify-content-end flex-grow-1"
                style={{ paddingRight: "100px" }}
              >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#/home">Favorite</Nav.Link>
                <NavDropdown
                  title={!userdata ? "Option" : `${userdata?.username}`}
                  id={`offcanvasNavbarDropdown-expand-lg`}
                >
                  {!token ? (
                    <>
                      <NavDropdown.Item href="/#/login">Login</NavDropdown.Item>
                      <NavDropdown.Item href="/#/signup">
                        Signup
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item href="/#/profile">
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("userdata");
                          setToken("");
                          setUserdata("");
                          navigateTo("/");
                        }}
                      >
                        Logout
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
                <Nav.Link href="#/profile">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid black",
                      borderRadius: "1000px",
                    }}
                  >
                    {!token ? (
                      ""
                    ) : (
                      <img
                        src={userdata?.profile}
                        alt=""
                        style={{ height: "32px", borderRadius: "1000px" }}
                      />
                    )}
                  </div>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
