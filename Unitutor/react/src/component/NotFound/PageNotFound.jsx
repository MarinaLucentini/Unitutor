import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/g19.svg";
import deadpool from "../../assets/deadpool.jpg";
const PageNotFound = () => {
  return (
    <>
      <Container className="my-3 bg-secondary bg-opacity-10 rounded-4 p-3">
        <Row className="align-items-center">
          <Col>
            <img src={logo} alt="logo" className="img-fluid img-brand" />
            <h3>Pagina non trovata</h3>
            <img src={deadpool} className="h-25" />
            <h6> ma non disperare puoi sempre tornare indietro e riprovare!</h6>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default PageNotFound;
