import { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import { BsFeather, BsXLg } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CourseModalUpdate from "./CourseModalUpdate";
import CourseModalDelete from "./CourseModalDelete";
import CourseSubjectModal from "./CourseSubjectModal";

const CoursePage = () => {
  const { id } = useParams();
  const { loading, content } = useSelector((state) => state.authentication);
  const [courseStudentCard, setCourseStudentCard] = useState(null);

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const handleCloseModalUpdate = () => setShowModalUpdate(false);
  const handleShowModalUpdate = () => setShowModalUpdate(true);
  const [showModalDelete, setShowModalDelete] = useState(null);
  const handleCloseModaleDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = () => setShowModalDelete(true);
  const [showCourseSubjectModal, setCourseSubjectModal] = useState(false);
  const handleCloseSubjectModal = () => setCourseSubjectModal(false);
  const handleShowSubjectModal = () => setCourseSubjectModal(true);
  useEffect(() => {
    if (content && content.studentCard) {
      const foundCard = content.studentCard.courseStudentCards.find((card) => card.id === id);
      setCourseStudentCard(foundCard);
    }
  }, [content, id]);
  if (!content || !content.studentCard) {
    return <Spinner animation="border" />;
  }
  const course = courseStudentCard ? courseStudentCard.courseList[0] : null;
  const subjectList = courseStudentCard ? courseStudentCard.subjectList : [];
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clicca per aggiungere una materia al corso
    </Tooltip>
  );
  const renderTooltip2 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clicca per modificare il corso corrente
    </Tooltip>
  );
  const renderTooltip3 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clicca per cancellare il corso dalla carta dello studente
    </Tooltip>
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const calculateArithmeticMean = (subjectList) => {
    const grades = subjectList.map((subject) => subject.subjectGrade).filter((grade) => grade !== 0);
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, curr) => acc + curr, 0);
    return (sum / grades.length).toFixed(2);
  };

  const calculateWeightedMean = (subjectList) => {
    const gradesAndCfu = subjectList.filter((subject) => subject.subjectGrade !== 0 && subject.cfu !== 0);
    if (gradesAndCfu.length === 0) return 0;
    const sum = gradesAndCfu.reduce((acc, curr) => acc + curr.subjectGrade * curr.cfu, 0);
    const totalCfu = gradesAndCfu.reduce((acc, curr) => acc + curr.cfu, 0);
    return (sum / totalCfu).toFixed(2);
  };

  const calculateGraduationBase = (weightedMean) => {
    return ((weightedMean / 30) * 110).toFixed(2);
  };

  const arithmeticMean = calculateArithmeticMean(subjectList);
  const weightedMean = calculateWeightedMean(subjectList);
  const graduationBase = calculateGraduationBase(weightedMean);
  return (
    <>
      {loading && <Spinner animation="border" />}
      {courseStudentCard && (
        <Container className="my-3 bg-secondary bg-opacity-10 rounded-4 p-3">
          <Row>
            <Col className="d-flex flex-column align-items-stretch ">
              <div className="d-flex  justify-content-end mx-3">
                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip2}>
                  <Button variant="btn" size="sm">
                    <BsFeather className="text-secondary" size={44} onClick={handleShowModalUpdate} />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip3}>
                  <Button variant="btn" size="sm">
                    <BsXLg className="text-secondary" size={44} onClick={handleShowModalDelete} />
                  </Button>
                </OverlayTrigger>
                <CourseModalUpdate
                  show={showModalUpdate}
                  handleClose={handleCloseModalUpdate}
                  nome={course.name}
                  dateEnrollment={courseStudentCard.enrollmentDate}
                  cfu={courseStudentCard.cfu}
                />
                <CourseModalDelete show={showModalDelete} handleClose={handleCloseModaleDelete} name={course.name} />
              </div>
              <div className="mx-3">
                <h2>Dettagli del Corso</h2>
                {course ? (
                  <>
                    <p>Nome del Corso: {course.name}</p>
                    <p>Data di iscrizione: {formatDate(courseStudentCard.enrollmentDate)}</p>
                    {courseStudentCard.cfu !== 0 ? <p>Cfu totali: {courseStudentCard.cfu}</p> : <></>}

                    {courseStudentCard.endDate ? (
                      <>
                        {courseStudentCard.graduationGrade !== 0 ? <p>Voto finale: {courseStudentCard.graduationGrade}</p> : <></>}
                        <p>Data di fine corso: {formatDate(courseStudentCard.endDate)}</p>
                      </>
                    ) : (
                      <></>
                    )}
                    <div className="d-flex align-items-center justify-content-evenly bg-info bg-opacity-10 py-3 flex-column flex-lg-row">
                      <p className="m-0">Media aritmetica:{arithmeticMean} </p>
                      <p className="m-0">Media ponderata: {weightedMean}</p>
                      <p className="m-0">Base di laurea: {graduationBase}</p>
                    </div>
                  </>
                ) : (
                  <p>Corso non trovato</p>
                )}
              </div>
            </Col>
          </Row>
          <Row className="flex-column my-5">
            <Col className="mb-3">
              <div className="d-flex align-items-center justify-content-evenly mx-3">
                <h5 className="text-uppercase">Materie</h5>
                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                  <Button variant="btn" size="sm">
                    <FaPlus className="text-secondary" size={44} onClick={handleShowSubjectModal} />
                  </Button>
                </OverlayTrigger>
                <CourseSubjectModal show={showCourseSubjectModal} handleClose={handleCloseSubjectModal} name={course.name} />
              </div>
            </Col>
            <Col>
              <ListGroup>
                {subjectList.length > 0 &&
                  subjectList.map((subjects) => (
                    <div key={subjects.id}>
                      <Link to={`/subject/${subjects.id}`} className="list-group-item list-group-item-info list-group-item-action">
                        {subjects.name}
                      </Link>
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
export default CoursePage;
