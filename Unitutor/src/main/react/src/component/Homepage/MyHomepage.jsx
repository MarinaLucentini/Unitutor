import { Card, Col, Container, Row } from "react-bootstrap";
import Myimage from "../../assets/a3d69ff063cf68b4ff295392a57615c2.png";

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
            <img className="img-fluid object-fit-cover  " src={Myimage} alt="image-medusa" />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <Card className="bg-secondary bg-opacity-10">
              <Card.Body>
                <Card.Title className="link-underline-info">Non perdere tempo!</Card.Title>

                <Card.Text>Grazie alla carta dello studente e al calendario potrai gestire i tuoi studi senza sforzo</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};
export default MyHomepage;
