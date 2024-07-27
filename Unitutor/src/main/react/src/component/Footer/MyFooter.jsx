import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/g19.svg";

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
              <p className="mb-1">Registrazione delle lezioni</p>
              <p className="mb-1">Sbobbinature automatiche</p>
              <p className="mb-1">Mappe concettuali</p>
              <p className="mb-1">Community sempre attiva</p>
            </Col>
            <Col md={3} lg={2} className="text-center">
              <h5 className="mb-2 text-primary">Useful Links</h5>
              <p className="mb-1">Your Account</p>
              <p className="mb-1">Help</p>
              <p className="mb-1">Privacy Policy</p>
              <p className="mb-1">Terms of Service</p>
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
