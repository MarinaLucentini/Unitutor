import { Button, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
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
                <Container className="my-3">
                  <Row>
                    <Col className="d-flex align-items-end justify-content-between mx-3" xs={6}>
                      <img src={content.urlAvatar} alt="" className="img-fluid rounded-4 object-fit-cover h-50 profile-shadow" />
                      <h4>{content.name}</h4>
                      <h4>{content.surname}</h4>
                    </Col>
                  </Row>
                </Container>
                <Container className="my-3 bg-secondary  bg-opacity-10 rounded-4 p-3">
                  <Row className="flex-column">
                    <Col>
                      <div className="d-flex align-items-center  justify-content-around mx-3">
                        <h3>Carta dello studente</h3>
                        {content.studentCard.register ? <h5 className="text-uppercase">Matricola: {content.studentCard.register}</h5> : <h6>Matricola</h6>}
                        <Button variant="btn">
                          <FaPlus className="text-secondary" size={44} />
                        </Button>
                      </div>
                    </Col>
                    <Col>
                      <ListGroup>
                        {content.studentCard.courseStudentCards.map((courseStudentCard) => (
                          <div key={courseStudentCard.id}>
                            {courseStudentCard.courseList.map((course) => (
                              <ListGroup.Item key={course.id} action variant="info">
                                {course.name}
                              </ListGroup.Item>
                            ))}
                          </div>
                        ))}
                      </ListGroup>
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
