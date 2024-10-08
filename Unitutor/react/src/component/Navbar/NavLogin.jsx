import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/g19.svg";
import { logoutUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
const NavLogin = ({ username, image, courses }) => {
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

              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" variant="btn" className="no-caret">
                  Corsi
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {courses.map((course) => (
                    <div key={course.id}>
                      {course.courseList.map((singleCourse) => (
                        <Dropdown.Item key={singleCourse.id} action variant="info">
                          <Link to={`/course/${course.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            {singleCourse.name}
                          </Link>
                        </Dropdown.Item>
                      ))}
                    </div>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <NavLink to={"/calendarPage"} className={"nav-link"}>
                Calendario
              </NavLink>
              <NavLink to={"/transcription"} className={"nav-link"}>
                Appunti
              </NavLink>
              <NavLink className={"nav-link"} to={"/community"}>
                Community
              </NavLink>
              <NavLink className={"nav-link d-block d-lg-none"} to={"/profile"}>
                Pagina del profilo
              </NavLink>
              <NavLink className={"nav-link d-block d-lg-none"} to={"/settingsPage"}>
                Settings
              </NavLink>
              <Button className={"nav-link d-block d-lg-none"} onClick={handleLogout}>
                Log-out
              </Button>
            </Nav>
            <Nav.Item className="d-none d-lg-flex align-items-center">
              <p className="my-0 mx-3">Bentornat* {username}</p>
              <Dropdown>
                <Dropdown.Toggle variant="btn" id="dropdown-basic" className="no-caret">
                  <img src={image} alt="" className="rounded-4   img-profile" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to={"/profile"} style={{ textDecoration: "none", color: "inherit" }}>
                      Pagina Profilo
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to={"/settingsPage"} style={{ textDecoration: "none", color: "inherit" }}>
                      Settings
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Log-out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default NavLogin;
