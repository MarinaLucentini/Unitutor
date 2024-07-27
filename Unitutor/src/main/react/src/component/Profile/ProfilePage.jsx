import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { loading, content } = useSelector((state) => state.authentication);
  return (
    <>
      {loading && <Spinner animation="border" />}
      <Container>
        <Row>
          <Col>
            {content && (
              <>
                <Container>
                  <Row>
                    <Col className="d-flex align-items-end justify-content-between" xs={5}>
                      <img src={content.urlAvatar} alt="" className="img-fluid rounded-4 object-fit-cover h-75 profile-shadow" />
                      <h4>{content.name}</h4>
                      <h4>{content.surname}</h4>
                    </Col>
                  </Row>
                </Container>
                <Container className="my-3 bg-secondary  bg-opacity-10 rounded-4">
                  <Row className="flex-column">
                    <Col>
                      <div className="d-flex align-items-center  justify-content-around mx-3">
                        <h3>Carta dello studente</h3>
                        <Button variant="btn">
                          <FaPlus className="text-secondary" size={44} />
                        </Button>
                      </div>
                    </Col>
                    <Col>
                      <Card>
                        <Card.Body>This is some text within a card body.</Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ProfilePage;
