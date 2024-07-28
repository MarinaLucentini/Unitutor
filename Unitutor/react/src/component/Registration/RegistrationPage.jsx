import { Col, Container, Row } from "react-bootstrap";
import FormRegistration from "./FormRegistration";

const RegistrationPage = () => {
  return (
    <>
      <Container className="my-3">
        <Row className="align-items-center flex-column">
          <Col xs={6}>
            <FormRegistration />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default RegistrationPage;
