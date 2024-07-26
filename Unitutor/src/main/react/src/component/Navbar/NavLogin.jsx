import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../assets/g19.svg";
const NavLogin = ({ username }) => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-black">
        <Container>
          <NavLink to={"/"} className={"navbar-brand"}>
            <img src={logo} alt="logo" />
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
        </Container>
        <Nav className="d-none d-lg-flex justify-content-end align-items-center  " activeKey="/home">
          <Nav.Item>
            <p className="my-0 mx-3">Welcome {username}</p>
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};
export default NavLogin;
