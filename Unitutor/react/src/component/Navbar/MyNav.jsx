import { Container, Nav, Navbar } from "react-bootstrap";
import { AiOutlineEllipsis } from "react-icons/ai";
import logo from "../../assets/g19.svg";
import { NavLink } from "react-router-dom";

const MyNav = () => {
  return (
    <>
      <Navbar expand="lg" className=" text-light">
        <Container className="align-items-end">
          <NavLink to={"/"} className={"navbar-brand "}>
            <img src={logo} alt="" className="img-fluid img-brand" />
          </NavLink>
          <div className="d-flex align-items-center d-lg-none justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="btn btn-secondary">
              <AiOutlineEllipsis size={24} />
            </Navbar.Toggle>
            <NavLink to={"/loginPage"} className={"btn btn-primary  mx-3  "}>
              Log-In
            </NavLink>
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 justify-content-between">
              <Nav.Item>
                <NavLink to={"/"} className={"nav-link"}>
                  {" "}
                  Home
                </NavLink>

                <NavLink to={"/aboutUs"} className={"nav-link"}>
                  {" "}
                  About
                </NavLink>
                <NavLink to={"/contactUs"} className={"nav-link"}>
                  {" "}
                  Contact
                </NavLink>
              </Nav.Item>

              <Nav.Item>
                <NavLink to={"/loginPage"} className={" btn btn-primary  mx-3 flex-column "}>
                  <p className="m-0">Log-In</p>
                </NavLink>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default MyNav;
