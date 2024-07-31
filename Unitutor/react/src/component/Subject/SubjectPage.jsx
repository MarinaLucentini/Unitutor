import { useEffect, useState } from "react";
import { Button, Col, Container, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import { BsFeather, BsXLg } from "react-icons/bs";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SubjectModalUpdate from "./SubjectModalUpdate";
import SubjectModalDelete from "./SubjectModalDelete";

import ProfessorSection from "../Professor/ProfessorSection";

import ExamSection from "../Lesson and Exam/ExamSection";
import LessonSection from "../Lesson and Exam/LessonSection";

const SubjectPage = () => {
  const { id } = useParams();
  const { loading, content } = useSelector((state) => state.authentication);

  const [subject, setSubject] = useState(null);

  const [course, setCourse] = useState(null);

  const [showModalUpdateSubject, setShowModalUpdateSubject] = useState(false);
  const handleCloseModalUpdateSubject = () => setShowModalUpdateSubject(false);
  const handleShowModalUpdateSubject = () => setShowModalUpdateSubject(true);
  const [showModalDeleteSubject, setShowModalDeleteSubject] = useState(false);
  const handleCloseModalDeleteSubject = () => setShowModalDeleteSubject(false);
  const handleShowModalDeleteSubject = () => setShowModalDeleteSubject(true);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clicca per modificare la materia
    </Tooltip>
  );
  const renderTooltip2 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clicca per cancellare la materia
    </Tooltip>
  );

  useEffect(() => {
    if (content && content.studentCard) {
      content.studentCard.courseStudentCards.forEach((card) => {
        const foundSubject = card.subjectList.find((sub) => sub.id === id);
        if (foundSubject) {
          setSubject(foundSubject);

          setCourse(card.courseList[0]);
        }
      });
    }
  }, [content, id]);

  if (loading || !subject || !course) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      {loading && <Spinner animation="border" />}
      {content && (
        <Container className="my-3 bg-secondary bg-opacity-10 rounded-4 p-3">
          <Row className="flex-column">
            <Col className="d-flex justify-content-end  ">
              <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                <Button variant="btn" size="sm">
                  <BsFeather className="text-secondary" size={44} onClick={handleShowModalUpdateSubject} />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip2}>
                <Button variant="btn" size="sm">
                  <BsXLg className="text-secondary" size={44} onClick={handleShowModalDeleteSubject} />
                </Button>
              </OverlayTrigger>
              {content && subject && (
                <SubjectModalUpdate
                  show={showModalUpdateSubject}
                  handleClose={handleCloseModalUpdateSubject}
                  nome={subject.name}
                  nameCourse={course.name}
                  cfu={subject.cfu}
                />
              )}
              {content && subject && (
                <SubjectModalDelete show={showModalDeleteSubject} handleClose={handleCloseModalDeleteSubject} name={subject.name} nameCourse={course.name} />
              )}
            </Col>
            <Col>
              <Row className="flex-column flex-lg-row my-3 align-items-center">
                <Col xs={8}>
                  {" "}
                  <h2>Dettagli della Materia</h2>{" "}
                  {subject ? (
                    <>
                      <p>Nome del Corso: {course.name}</p>
                      <p>Materia: {subject.name}</p>

                      {subject.cfu !== 0 ? <p>Cfu totali: {subject.cfu}</p> : <></>}

                      <>{subject.subjectGrade !== 0 ? <p>Voto finale: {subject.subjectGrade}</p> : <></>}</>
                    </>
                  ) : (
                    <p>Materia non trovata</p>
                  )}
                </Col>
                <Col>
                  <ProfessorSection course={course} subject={subject} content={content} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="my-5">
            <Col>
              <LessonSection subject={subject} />
            </Col>
            <Col>
              <ExamSection subject={subject} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
export default SubjectPage;
