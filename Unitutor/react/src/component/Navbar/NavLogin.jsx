import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/g19.svg";
import { logoutUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
const NavLogin = ({ username, image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());

    navigate("/");
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-black">
        <Container>
          <NavLink to={"/"} className={"navbar-brand"}>
            <img src={logo} alt="logo" className="img-fluid img-brand" />
          </NavLink>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to={"/"} className={"nav-link"}>
                {" "}
                Home
              </NavLink>

              <NavLink to={"/profile"} className={"nav-link"}>
                {" "}
                Pagina profilo
              </NavLink>
              <NavLink to={"/contactUs"} className={"nav-link"}>
                {" "}
                Libretto Universitario
              </NavLink>
            </Nav>
          </Navbar.Collapse>
          <Nav.Item className="d-none d-md-flex align-items-center">
            <img src={image} alt="" className="rounded-4   img-profile" />
            <p className="my-0 mx-3">Bentornat* {username}</p>
            <Button variant="primary" onClick={handleLogout}>
              Log-out
            </Button>
          </Nav.Item>
        </Container>
      </Navbar>
    </>
  );
};
export default NavLogin;
