import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, UpdateCourse } from "../../redux/actions/course";

const CourseModalUpdate = ({ show, handleClose, nome, dateEnrollment, cfu }) => {
  const dispatch = useDispatch();
  const { loading, success, content, error } = useSelector((state) => state.course);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: nome,
    graduationGrade: "",
    endDate: "",
    dateEnrollment: dateEnrollment,
    cfu: cfu || 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateCourse(formData));
  };
  useEffect(() => {
    setFormData({
      name: nome,
      graduationGrade: "",
      endDate: "",
      dateEnrollment: dateEnrollment,
      cfu: cfu || 0,
    });
  }, [nome, dateEnrollment, cfu]);
  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(resetCourseState());
        handleClose();
      }, 3000);
    }
  }, [success, handleClose]);
  useEffect(() => {
    if (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
        dispatch(resetCourseState());
      }, 3000);
    }
  }, [error]);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica il corso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {content && loading && <Spinner animation="border" />}
          {showErrorMessage && <Alert variant="danger">{content}</Alert>}
          {showSuccessMessage && <Alert variant="success">{content}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3 d-flex flex-column align-items-center">
                  <Form.Label>Nome del corso</Form.Label>
                  <Form.Control type="text" placeholder="inserisci il nome del corso a cui sei iscritto" name="name" value={formData.name} readOnly />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3  d-flex flex-column align-items-center">
                  <Form.Label>Cfu totali</Form.Label>
                  <Form.Control type="number" onChange={handleChange} name="cfu" value={formData.cfu} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3  d-flex flex-column align-items-center">
                  <Form.Label>Data di fine corso</Form.Label>
                  <Form.Control type="date" onChange={handleChange} name="endDate" value={formData.endDate} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3  d-flex flex-column align-items-center">
                  <Form.Label>Data di iscrizione</Form.Label>
                  <Form.Control type="date" onChange={handleChange} name="dateEnrollment" value={formData.dateEnrollment} />
                </Form.Group>
              </Col>
              <Form.Group className="mb-3  d-flex flex-column align-items-center">
                <Form.Label>Voto finale</Form.Label>
                <Form.Control type="number" onChange={handleChange} name="graduationGrade" value={formData.graduationGrade} />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Modifica corso
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CourseModalUpdate;
