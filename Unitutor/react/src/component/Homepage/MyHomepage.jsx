import { Card, Col, Container, Row } from "react-bootstrap";
import Myimage from "../../assets/a3d69ff063cf68b4ff295392a57615c2.png";

import { PiClockCountdownThin, PiUsersThreeFill } from "react-icons/pi";
import { FaPersonRunning } from "react-icons/fa6";

const MyHomepage = () => {
  return (
    <>
      <Container className="my-3">
        <Row className="align-items-center">
          <Col>
            <h1 className="text-primary text-uppercase text-shadow-mb">Unitutor</h1>

            <h2>Il tuo compagno di studi</h2>
            <h6>Unitutor è un applicazione web pensata per semplificare e potenziare il percorso accademico degli studenti.</h6>
          </Col>
          <Col className="d-none d-lg-block">
            <img className="img-fluid object-fit-cover img-medusa " src={Myimage} alt="image-medusa" />
          </Col>
        </Row>
      </Container>
      <Container className="my-3">
        <Row className="flex-column flex-lg-row">
          <Col className="my-3">
            <Card className="bg-secondary bg-opacity-10 card-secondary">
              <Card.Body>
                <PiClockCountdownThin className="text-info" size={44} />

                <Card.Title>Non perdere tempo!</Card.Title>
                <Card.Text>Grazie alla carta dello studente e al calendario potrai gestire i tuoi studi senza sforzo</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="my-3">
            <Card className="bg-secondary bg-opacity-10 card-secondary">
              <Card.Body>
                <FaPersonRunning className="text-info" size={44} />
                <Card.Title>Stai al passo!</Card.Title>
                <Card.Text>Pianifica i tuoi studi in maniere intelligente e non perdere anni di studi</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="my-3">
            <Card className="bg-secondary bg-opacity-10 card-secondary">
              <Card.Body>
                <PiUsersThreeFill className="text-info" size={44} />

                <Card.Title>Stai connesso!</Card.Title>
                <Card.Text>Connettiti e collabora con gli altri studenti</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default MyHomepage;
