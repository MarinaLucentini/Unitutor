import { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import { BsFeather, BsXLg } from "react-icons/bs";
import LessonModalAdd from "./LessonModalAdd";
import { addDays, subDays } from "date-fns";
import { fetchLessons } from "../../redux/actions/lesson";
import { useDispatch, useSelector } from "react-redux";
import ExamModalAdd from "./ExamModalAdd";
import LessonModalUpdate from "./LessonModalUpdate";
import LessonModalDelete from "./LessonModalDelete";
import ExamModalUpdate from "./ExamModalUpdate";
import ExamModalDelete from "./ExamModalDelete";

const CaledarPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [date, setDate] = useState(new Date());
  const [showColumn, setShowColumn] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [lessonsAndExam, setLessonsAndExam] = useState({ lessons: [], exams: [] });
  const [showModalLesson, setShowModalLesson] = useState(false);

  const handleCloseModalLesson = () => setShowModalLesson(false);
  const handleShowModalLesson = () => setShowModalLesson(true);
  const [showModalExam, setShowModalExam] = useState(false);

  const handleCloseModalExam = () => setShowModalExam(false);
  const handleShowModalExam = () => setShowModalExam(true);
  const [showModalExamUpdate, setShowModalExamUpdate] = useState(false);

  const handleCloseModalExamUpdate = () => setShowModalExamUpdate(false);
  const handleShowModalExamUpdate = () => setShowModalExamUpdate(true);
  const [showModalExamDelete, setShowModalExamDelete] = useState(false);

  const handleCloseModalExamDelete = () => setShowModalExamDelete(false);
  const handleShowModalExamDelete = () => setShowModalExamDelete(true);
  const [showModalUpdateLesson, setShowModalUpdateLesson] = useState(false);

  const handleCloseModalUpdateLesson = () => setShowModalUpdateLesson(false);
  const handleShowModalUpdateLesson = () => setShowModalUpdateLesson(true);
  const [showModalDeleteLesson, setShowModalDeleteLesson] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCloseModalDeleteLesson = () => setShowModalDeleteLesson(false);
  const handleShowModalDeleteLesson = () => setShowModalDeleteLesson(true);
  const dispatch = useDispatch();
  const content = useSelector((state) => state.lesson.content);

  useEffect(() => {
    if (selectedDay) {
      setIsLoading(true);
      dispatch(fetchLessons(selectedDay)).finally(() => setIsLoading(false));
    }
  }, [selectedDay]);
  useEffect(() => {
    if (content) {
      setLessonsAndExam(content);
      setShowColumn(true);
    }
  }, [content]);

  const handleDayClick = (value) => {
    const incrementedDate = addDays(value, 1);
    setSelectedDay(incrementedDate);
    setShowColumn(false);
  };

  const handleCloseColumn = () => setShowColumn(false);

  const formatDate = (dateString) => {
    const time = new Date(dateString);
    if (isNaN(time.getTime())) return "Invalid Date";
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  console.log(lessonsAndExam);
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
              <ExamModalAdd show={showModalExam} handleClose={handleCloseModalExam} date={subDays(selectedDay, 1)} />
              <ListGroup className="align-items-center">
                {lessonsAndExam && lessonsAndExam.lessons && lessonsAndExam.lessons.length > 0 ? (
                  <>
                    <h5>Lezioni</h5>
                    {lessonsAndExam.lessons.map((lesson, index) => (
                      <ListGroup.Item key={index} variant="info" className="w-75 d-flex align-items-center justify-content-center">
                        {lesson.subjectName} alle {formatDate(lesson.dataAndTime)}
                        <div>
                          <BsFeather className="text-secondary mx-3" size={24} onClick={handleShowModalUpdateLesson} />

                          <BsXLg className="text-secondary" size={24} onClick={handleShowModalDeleteLesson} />
                          <LessonModalUpdate
                            id={lesson.id}
                            subjectName={lesson.subjectName}
                            show={showModalUpdateLesson}
                            handleClose={handleCloseModalUpdateLesson}
                            selectedDate={subDays(selectedDay, 1)}
                          />
                          <LessonModalDelete
                            id={lesson.id}
                            subjectName={lesson.subjectName}
                            show={showModalDeleteLesson}
                            handleClose={handleCloseModalDeleteLesson}
                            selectedDate={subDays(selectedDay, 1)}
                          />
                        </div>
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
                {lessonsAndExam && lessonsAndExam.exams && lessonsAndExam.exams.length > 0 ? (
                  <>
                    <h5>Esami</h5>
                    {lessonsAndExam.exams.map((exam, index) => (
                      <ListGroup.Item key={index} variant="info" className="w-75 d-flex align-items-center justify-content-center">
                        {exam.subjectName} alle {formatDate(exam.dataAndTime)}
                        <div>
                          <BsFeather className="text-secondary mx-3" size={24} onClick={handleShowModalExamUpdate} />
                          <BsXLg className="text-secondary" size={24} onClick={handleShowModalExamDelete} />
                          <ExamModalUpdate
                            id={exam.id}
                            subjectName={exam.subjectName}
                            date={exam.dataAndTime}
                            pass={exam.pass}
                            grade={exam.grade}
                            show={showModalExamUpdate}
                            handleClose={handleCloseModalExamUpdate}
                          />
                          <ExamModalDelete id={exam.id} subjectName={exam.subjectName} show={showModalExamDelete} handleClose={handleCloseModalExamDelete} />
                        </div>
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
                      Nessun esame per questa data
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
          )}
          {isLoading && <div>Loading...</div>}
        </Row>
      </Container>
    </>
  );
};
export default CaledarPage;
