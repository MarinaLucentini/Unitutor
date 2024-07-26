import { Col, Container, Row } from "react-bootstrap";

const MyFooter = () => {
  return (
    <>
      <footer className="  py-4 mt-3  ">
        <Container>
          <Row className="justify-content-center">
            <Col md={3} lg={4} xl={3} className="text-center">
              <h5 className="mb-2 text-primary">Unitutor</h5>
              <p>
                UniTutor aiuta gli studenti a gestire la propria vita accademica in modo più efficace. Unisciti a noi e migliora la tua esperienza di
                apprendimento.
              </p>
            </Col>
            <Col md={2} className="text-center">
              <h5 className="mb-2 text-primary">Features</h5>
              <p>Gestione delle lezioni e degli esami</p>
              <p>Registrazione delle lezioni</p>
              <p>Sbobbinature automatiche</p>
              <p>Mappe concettuali</p>
              <p>Community sempre attiva di studenti</p>
            </Col>
            <Col md={3} lg={2} className="text-center">
              <h5 className="mb-2 text-primary">Useful Links</h5>
              <p>Your Account</p>
              <p>Help</p>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-3">
              <p>&copy; 2024 University App. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};
export default MyFooter;
