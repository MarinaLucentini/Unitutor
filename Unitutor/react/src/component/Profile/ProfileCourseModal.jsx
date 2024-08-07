import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddNewCourse, resetCourseState } from "../../redux/actions/course";

const ProfileCourseModal = ({ show, handleClose }) => {
  const { loading, error, success } = useSelector((state) => state.course);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    cfu: "",
    register: "",
    dateEnrollment: "",
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
    dispatch(AddNewCourse(formData));
  };
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
          <Modal.Title>Aggiungi il corso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Spinner animation="border" />}
          {showErrorMessage && <Alert variant="danger">Qualcosa è andato storto, riprova</Alert>}
          {showSuccessMessage && <Alert variant="success">Corso aggiunto con successo</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3 d-flex flex-column align-items-center">
                  <Form.Label>Nome del corso</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="inserisci il nome del corso a cui sei iscritto"
                    required
                    onChange={handleChange}
                    name="name"
                    value={formData.name}
                  />
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
                  <Form.Label>Matricola</Form.Label>
                  <Form.Control type="text" placeholder="inserisci la tua matricola" onChange={handleChange} name="register" value={formData.register} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3  d-flex flex-column align-items-center">
                  <Form.Label>Data di iscrizione</Form.Label>
                  <Form.Control type="date" onChange={handleChange} name="dateEnrollment" value={formData.dateEnrollment} register />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Aggiungi corso al libretto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ProfileCourseModal;
