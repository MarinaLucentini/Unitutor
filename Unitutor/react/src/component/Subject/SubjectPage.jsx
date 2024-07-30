import { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import { BsFeather, BsXLg } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfessorModalAdd from "./ProfessorModalAdd";
import SubjectModalUpdate from "./SubjectModalUpdate";
import SubjectModalDelete from "./SubjectModalDelete";

const SubjectPage = () => {
  const { id } = useParams();
  const { loading, content } = useSelector((state) => state.authentication);

  const [subject, setSubject] = useState(null);

  const [course, setCourse] = useState(null);

  const [showModalProfessor, setShowModalProfessor] = useState(false);
  const handleCloseModalProfessor = () => setShowModalProfessor(false);
  const handleShowModalProfessor = () => setShowModalProfessor(true);
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
  const renderTooltip3 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clicca aggiungere un professore
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
          <Row>
            <Col className="d-flex flex-column align-items-stretch ">
              <div className="d-flex  justify-content-end mx-3">
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
              </div>
              <div className="mx-3">
                <h2>Dettagli della Materia</h2>
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
              </div>
            </Col>
          </Row>
          <Row className="flex-column my-5">
            <Col className="mb-3">
              <div className="d-flex align-items-center justify-content-evenly mx-3">
                <p className="text-uppercase">Professori</p>
                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip3}>
                  <Button variant="btn" size="sm">
                    <FaPlus className="text-secondary" size={24} onClick={handleShowModalProfessor} />
                  </Button>
                </OverlayTrigger>
                {content && subject && (
                  <ProfessorModalAdd show={showModalProfessor} handleClose={handleCloseModalProfessor} nameCourse={course.name} nameSubject={subject.name} />
                )}
              </div>
            </Col>
            <Col>
              <ListGroup className="w-75  align-items-center">
                {subject &&
                  subject.professorList.map((professor) => (
                    <div key={professor.id}>
                      <ListGroup.Item variant="info" className="d-flex align-items-center ">
                        {professor.name} {professor.surname}
                        <div>
                          <BsFeather className="text-secondary mx-3" size={24} />
                          <BsXLg className="text-secondary" size={24} />
                        </div>
                      </ListGroup.Item>
                    </div>
                  ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
export default SubjectPage;
