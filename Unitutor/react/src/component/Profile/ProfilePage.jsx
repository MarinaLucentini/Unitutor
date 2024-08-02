import { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ProfileImageModal from "./ProfileImageModal";
import ProfileCourseModal from "./ProfileCourseModal";
import { Link } from "react-router-dom";
import LessonModalAdd from "../Calendar/LessonModalAdd";
import ExamModalAdd from "../Calendar/ExamModalAdd";

const ProfilePage = () => {
  const { loading, content } = useSelector((state) => state.authentication);
  const [showModalImage, setShowModalImage] = useState(false);
  const [showModalCourse, setShowModalCourse] = useState(false);
  const [lessonsAndExam, setLessonsAndExam] = useState({ lessons: [], exams: [] });
  const [showModalLesson, setShowModalLesson] = useState(false);

  const handleCloseModalLesson = () => setShowModalLesson(false);
  const handleShowModalLesson = () => setShowModalLesson(true);

  const handleCloseModalImage = () => setShowModalImage(false);
  const handleShowModalImage = () => setShowModalImage(true);
  const handleCloseModalCourse = () => setShowModalCourse(false);
  const handleShowModalCourse = () => setShowModalCourse(true);
  const [showModalExam, setShowModalExam] = useState(false);

  const handleCloseModalExam = () => setShowModalExam(false);
  const handleShowModalExam = () => setShowModalExam(true);
  const fetchLessons = async (selectedDate) => {
    const token = localStorage.getItem("authToken");
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const response = await fetch(`http://localhost:3001/lessons/lessons-exams?date=${formattedDate}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setLessonsAndExam(data);
  };
  useEffect(() => {
    fetchLessons(new Date());
  }, []);
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
  const formatTime = (dateString) => {
    const time = new Date(dateString);

    if (isNaN(time.getTime())) {
      return "Invalid Date";
    }

    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
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
                    <Col className="d-flex align-items-end justify-content-evenly mx-3 flex-column flex-lg-row">
                      <div className="profile-shadow rounded-4">
                        <img
                          src={content.urlAvatar}
                          alt=""
                          className="img-fluid rounded-4 object-fit-cover profile-shadow profile-img"
                          onClick={handleShowModalImage}
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <div>
                          <h5 className="mx-3">
                            {content.name} {content.surname}
                          </h5>
                        </div>
                        <div>
                          <h5 className="text-break">Data di nascita: {formatDate(content.dateOfBirth)}</h5>
                        </div>
                        <div>
                          <h5 className="mx-3">Email: {content.email}</h5>
                        </div>
                      </div>
                    </Col>
                    <ProfileImageModal show={showModalImage} handleClose={handleCloseModalImage} />
                  </Row>

                  <Row className="flex-column my-5">
                    <Col className="mb-3">
                      <div className="d-flex align-items-center  justify-content-around mx-3">
                        <h5 className="text-uppercase m-0">Corsi</h5>
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
                        {content &&
                          content.studentCard.courseStudentCards.map((courseStudentCard) => (
                            <div key={courseStudentCard.id}>
                              {courseStudentCard.courseList.map((course) => (
                                <Link
                                  to={`/course/${courseStudentCard.id}`}
                                  className="list-group-item list-group-item-info list-group-item-action  "
                                  key={course.id}
                                >
                                  {course.name}
                                </Link>
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
        <h5 className="text-uppercase m-0">Materie</h5>
        <Row xs={1} sm={2} lg={4}>
          {content &&
            content.studentCard.courseStudentCards.map((courseStudentCard) => (
              <Col key={courseStudentCard.id} className="my-3">
                {courseStudentCard.courseList.map((course) => (
                  <Card key={course.id} className="bg-info bg-opacity-10">
                    {course.name}
                    {courseStudentCard.subjectList.map((subject) => (
                      <Link to={`/subject/${subject.id}`} className="list-group-item list-group-item-info list-group-item-action" key={subject.id}>
                        {subject.name}
                      </Link>
                    ))}
                  </Card>
                ))}
              </Col>
            ))}
        </Row>
        <Row>
          <Col>
            <LessonModalAdd show={showModalLesson} handleClose={handleCloseModalLesson} date={new Date()} />
            <ExamModalAdd show={showModalExam} handleClose={handleCloseModalExam} date={new Date()} />
            <ListGroup className="align-items-center">
              {lessonsAndExam.lessons.length > 0 ? (
                <>
                  <h5>Lezioni</h5>
                  {lessonsAndExam.lessons.map((lesson, index) => (
                    <ListGroup.Item key={index} variant="info" className="w-75">
                      Lezione di {lesson.subjectName} alle {formatTime(lesson.dataAndTime)}
                    </ListGroup.Item>
                  ))}
                </>
              ) : (
                <>
                  <ListGroup.Item variant="info" className="w-75">
                    Nessuna lezione per oggi
                  </ListGroup.Item>
                </>
              )}
            </ListGroup>
            <ListGroup className="align-items-center my-3">
              {lessonsAndExam.exams.length > 0 ? (
                <>
                  <h5>Esami</h5>
                  {lessonsAndExam.exams.map((lesson, index) => (
                    <ListGroup.Item key={index} variant="info" className="w-75">
                      Esame di {lesson.subjectName} alle {formatTime(lesson.dataAndTime)}
                    </ListGroup.Item>
                  ))}
                  <div className="d-flex align-items-center">
                    <Button variant="secondary" size="sm" className="m-3" onClick={handleShowModalLesson}>
                      Clicca qui per aggiungere una lezione
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleShowModalExam}>
                      Clicca qui per aggiungere un esame
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <ListGroup.Item variant="info" className="w-75">
                    Nessun esame per oggi
                  </ListGroup.Item>
                  <div className="d-flex align-items-center">
                    <Button variant="secondary" size="sm" className="m-3" onClick={handleShowModalLesson}>
                      Clicca qui per aggiungere una lezione
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleShowModalExam}>
                      Clicca qui per aggiungere un esame
                    </Button>
                  </div>
                </>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ProfilePage;
