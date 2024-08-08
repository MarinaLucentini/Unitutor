import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetTranscription, transcriptionNewFile } from "../../redux/actions/transcription";
import { Link } from "react-router-dom";

const TransciptionPage = () => {
  const { content } = useSelector((state) => state.authentication);
  const { loading, success, error } = useSelector((state) => state.transcription);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        dispatch(resetTranscription());
      }, 10000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        dispatch(resetTranscription());
      }, 10000);
    }
  }, [error]);
  const [formData, setFormData] = useState({
    subjectId: "",
  });
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  if (!content || !content.studentCard) {
    return null;
  }

  const courses = content.studentCard.courseStudentCards;
  const allCourses = courses.flatMap((course) => course.courseList);

  const handleCourseChange = (e) => {
    const selectedCourseName = e.target.value;

    const selectedCourse = courses.flatMap((courseStudentCard) => courseStudentCard.courseList).find((course) => course.name === selectedCourseName);

    if (selectedCourse) {
      const subjectsForSelectedCourse = courses
        .filter((courseStudentCard) => courseStudentCard.courseList.includes(selectedCourse))
        .flatMap((courseStudentCard) => courseStudentCard.subjectList);
      setFilteredSubjects(subjectsForSelectedCourse);
    } else {
      setFilteredSubjects([]);
    }
  };

  const handleSubjectChange = (e) => {
    const selectedSubjectId = e.target.value;
    setFormData({
      ...formData,
      subjectId: selectedSubjectId,
    });
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(transcriptionNewFile(selectedFile, formData.subjectId));
  };

  return (
    <>
      <Container className="my-3 bg-secondary bg-opacity-10 rounded-4 p-3">
        <Row className="flex-column align-items-center">
          <Col>
            <h5 className="text-uppercase">Appunti</h5>
            <p>
              In questa pagina puoi caricare file audio e la nostra app ti convertirà automaticamente il file audio in un testo, che troverai nella pagina della
              materia selezionata.
            </p>
          </Col>
          <Col xs={6}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Seleziona il corso</Form.Label>

                    <Form.Select onChange={handleCourseChange} name="courseName" size="sm">
                      <option>Apri la tendina per selezionare</option>
                      {allCourses.map((singleCourse) => (
                        <option key={singleCourse.id} value={singleCourse.name}>
                          {singleCourse.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Seleziona la materia</Form.Label>

                    <Form.Select value={formData.subjectId} onChange={handleSubjectChange} name="subjectId" size="sm">
                      <option>Apri la tendina per selezionare</option>
                      {filteredSubjects.map((singleSubject) => (
                        <option key={singleSubject.id} value={singleSubject.id}>
                          {singleSubject.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Control type="file" onChange={handleFileChange} className="my-3" />
              <Button variant="primary" type="submit">
                Sbobbina il file
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            {loading && <Alert variant="primary">Stiamo sbobinnando il file un attimo di attesa....</Alert>}
            {showSuccessMessage && (
              <Alert variant="success">
                Trascrizione avvenuta con successo!! Clicca questo <Link to={`/subject/${formData.subjectId}`}> link</Link> per visualizzarla o vai direttamente
                alla pagina della materia scelta
              </Alert>
            )}
            {showErrorMessage && <Alert variant="danger">Qualcosa è andato storto, riprova</Alert>}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default TransciptionPage;
