import { useState } from "react";
import { Button, Col, Container, ListGroup, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ProfileImageModal from "./ProfileImageModal";
import ProfileCourseModal from "./ProfileCourseModal";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { loading, content } = useSelector((state) => state.authentication);
  const [showModalImage, setShowModalImage] = useState(false);
  const [showModalCourse, setShowModalCourse] = useState(false);

  const handleCloseModalImage = () => setShowModalImage(false);
  const handleShowModalImage = () => setShowModalImage(true);
  const handleCloseModalCourse = () => setShowModalCourse(false);
  const handleShowModalCourse = () => setShowModalCourse(true);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clicca per aggiungere un corso
    </Tooltip>
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      {loading && <Spinner animation="border" />}
      <Container className="my-3 bg-secondary  bg-opacity-10 rounded-4 p-3">
        <Row>
          <Col>
            {content && (
              <>
                <Container className="my-3">
                  <Row className="my-3">
                    <h3>Carta dello studente</h3>
                    <Col className="d-flex align-items-end justify-content-evenly mx-3">
                      <div className="profile-shadow rounded-4">
                        <img
                          src={content.urlAvatar}
                          alt=""
                          className="img-fluid rounded-4 object-fit-cover profile-shadow profile-img"
                          onClick={handleShowModalImage}
                        />
                      </div>
                      <div className="d-flex justify-content-between ">
                        <h4 className="mx-3">{content.name}</h4>
                        <h4>{content.surname}</h4>
                      </div>
                      <div className="d-flex flex-column">
                        <div>
                          <h5>Data di nascita: {formatDate(content.dateOfBirth)}</h5>
                        </div>
                        <div className="d-flex justify-content-between ">
                          <h5 className="mx-3">Email</h5>
                          <h5>{content.email}</h5>
                        </div>
                      </div>
                    </Col>
                    <ProfileImageModal show={showModalImage} handleClose={handleCloseModalImage} />
                  </Row>

                  <Row className="flex-column my-5">
                    <h5 className="text-uppercase">Corsi</h5>
                    <Col className="mb-3">
                      <div className="d-flex align-items-center  justify-content-around mx-3">
                        {content.studentCard.register ? (
                          <h5 className="text-uppercase">Matricola: {content.studentCard.register}</h5>
                        ) : (
                          <h5 className="text-uppercase">Matricola</h5>
                        )}

                        <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                          <Button variant="btn" size="sm" onClick={handleShowModalCourse}>
                            <FaPlus className="text-secondary" size={44} />
                          </Button>
                        </OverlayTrigger>
                        <ProfileCourseModal show={showModalCourse} handleClose={handleCloseModalCourse} />
                      </div>
                    </Col>
                    <Col>
                      <ListGroup>
                        {content.studentCard.courseStudentCards.map((courseStudentCard) => (
                          <div key={courseStudentCard.id}>
                            {courseStudentCard.courseList.map((course) => (
                              <ListGroup.Item key={course.id} action variant="info">
                                <Link to={`/course/${courseStudentCard.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                  {course.name}
                                </Link>
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
      <Container>
        <Row>
          <Col xs={6}>
            <Button className="mx-3" variant="secondary">
              Modifica username
            </Button>
            <Button>Cancella profilo</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ProfilePage;
