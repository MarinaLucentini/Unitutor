import { Col, Container, Row } from "react-bootstrap";
import FormLogin from "./FormLogin";

const LoginPage = () => {
  return (
    <>
      <Container className="my-3">
        <Row className="align-items-center flex-column">
          <Col xs={6}>
            <FormLogin />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default LoginPage;
