import { useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import { BsXLg } from "react-icons/bs";
import LessonModalAdd from "./LessonModalAdd";
import { addDays, subDays } from "date-fns";

const CaledarPage = () => {
  const [date, setDate] = useState(new Date());
  const [showColumn, setShowColumn] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [lessonsAndExam, setLessonsAndExam] = useState({ lessons: [], exams: [] });
  const [showModalLesson, setShowModalLesson] = useState(false);

  const handleCloseModalLesson = () => setShowModalLesson(false);
  const handleShowModalLesson = () => setShowModalLesson(true);
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

  const handleDayClick = (value) => {
    const incrementedDate = addDays(value, 1);
    setSelectedDay(incrementedDate);
    fetchLessons(incrementedDate);
    setShowColumn(true);
  };
  const handleCloseColumn = () => setShowColumn(false);
  const formatDate = (dateString) => {
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
      <Container className="my-3 bg-secondary  bg-opacity-10 rounded-4 p-3">
        <Row className="flex-column">
          <Col className="d-flex justify-content-center">
            <Calendar className={"w-75"} onClickDay={handleDayClick} value={date} />
          </Col>
          {showColumn && (
            <Col className="my-3">
              <div className="d-flex align-items-center justify-content-evenly">
                <h5>Lezioni ed Esami del {selectedDay && subDays(selectedDay, 1).toLocaleDateString()}</h5>
                <Button variant="btn" onClick={handleCloseColumn}>
                  <BsXLg className="text-secondary" size={44} />
                </Button>
              </div>
              <LessonModalAdd show={showModalLesson} handleClose={handleCloseModalLesson} date={subDays(selectedDay, 1)} />
              <ListGroup className="align-items-center">
                {lessonsAndExam && lessonsAndExam.lessons.length > 0 ? (
                  <>
                    <h5>Lezioni</h5>
                    {lessonsAndExam.lessons.map((lesson, index) => (
                      <ListGroup.Item key={index} variant="info" className="w-75">
                        {lesson.subjectName} alle {formatDate(lesson.dataAndTime)}
                      </ListGroup.Item>
                    ))}
                  </>
                ) : (
                  <>
                    <ListGroup.Item variant="info" className="w-75">
                      Nessuna lezione per questa data
                    </ListGroup.Item>
                  </>
                )}
              </ListGroup>
              <ListGroup className="align-items-center my-3">
                {lessonsAndExam && lessonsAndExam.exams.length > 0 ? (
                  <>
                    <h5>Esami</h5>
                    {lessonsAndExam.exams.map((lesson, index) => (
                      <ListGroup.Item key={index} variant="info" className="w-75">
                        {lesson.subjectName} alle {formatDate(lesson.dataAndTime)}
                      </ListGroup.Item>
                    ))}
                    <div className="d-flex align-items-center">
                      <Button variant="secondary" size="sm" className="m-3" onClick={handleShowModalLesson}>
                        Clicca qui per aggiungere una lezione
                      </Button>
                      <Button variant="primary" size="sm">
                        Clicca qui per aggiungere un esame
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <ListGroup.Item variant="info" className="w-75">
                      Nessun esame per questa data
                    </ListGroup.Item>
                    <div className="d-flex align-items-center">
                      <Button variant="secondary" size="sm" className="m-3" onClick={handleShowModalLesson}>
                        Clicca qui per aggiungere una lezione
                      </Button>
                      <Button variant="primary" size="sm">
                        Clicca qui per aggiungere un esame
                      </Button>
                    </div>
                  </>
                )}
              </ListGroup>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};
export default CaledarPage;
