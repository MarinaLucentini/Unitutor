import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddNewsubject, resetsubjectsState } from "../../redux/actions/subject";

const CourseSubjectModal = ({ show, handleClose, name }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.subject);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cfu: "",
    courseName: name,
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
    dispatch(AddNewsubject(formData));
  };
  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(resetsubjectsState());
        handleClose();
      }, 3000);
    }
  }, [success, handleClose]);

  useEffect(() => {
    if (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
        dispatch(resetsubjectsState());
      }, 3000);
    }
  }, [error]);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi una materia al corso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {loading && <Spinner animation="border" />}
            {showErrorMessage && <Alert variant="danger">Qualcosa è andato storto, riprova</Alert>}
            {showSuccessMessage && <Alert variant="success">Materia aggiunta con successo</Alert>}
            <Row>
              <Col>
                <Form.Group className="mb-3 d-flex flex-column align-items-center">
                  <Form.Label>Nome del corso</Form.Label>
                  <Form.Control type="text" readOnly name="courseName" value={formData.courseName} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3  d-flex flex-column align-items-center">
                  <Form.Label>Cfu </Form.Label>
                  <Form.Control type="number" onChange={handleChange} name="cfu" value={formData.cfu} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3  d-flex flex-column align-items-center">
                  <Form.Label>Nome Materia</Form.Label>
                  <Form.Control type="text" placeholder="inserisci il nome della materia" onChange={handleChange} name="name" value={formData.name} />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Aggiungi materia al corso
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CourseSubjectModal;
