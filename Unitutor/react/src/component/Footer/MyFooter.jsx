import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/g19.svg";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const MyFooter = () => {
  return (
    <>
      <footer className="mt-5 d-none d-md-block">
        <Container>
          <Row className="justify-content-evenly">
            <Col md={4} lg={4} xl={3} className="text-center ">
              <h5 className="mb-2 text-primary">Unitutor</h5>
              <p>
                UniTutor aiuta gli studenti a gestire la propria vita accademica in modo più efficace. Unisciti a noi e migliora la tua esperienza di
                apprendimento.
              </p>
              <img src={logo} alt="" className="img-fluid img-brand" />
            </Col>
            <Col className="text-center" xs={3}>
              <h5 className="mb-2 text-primary">Features</h5>
              <p className="mb-1">Gestione delle lezioni e degli esami</p>

              <p className="mb-1">Sbobbinature automatiche</p>
              <p className="mb-1">Mappe concettuali</p>
              <p className="mb-1">Community sempre attiva</p>
            </Col>
            <Col md={3} lg={2} className="text-center">
              <h5 className="mb-2 text-primary">My Links</h5>
              <div className="d-flex align-items-center justify-content-center">
                <Link
                  className="d-flex flex-column align-items-center link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  to={"https://github.com/MarinaLucentini"}
                >
                  <FaGithub className="mx-3" size={24} />
                </Link>
                <Link
                  className="d-flex flex-column align-items-center my-3 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  to={"https://www.linkedin.com/in/marina-maria-lucentini-b9b49126a/"}
                >
                  <FaLinkedin className="mx-3" size={24} />
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-3">
              <p className="text-light text-opacity-50">&copy; 2024 University App. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};
export default MyFooter;
