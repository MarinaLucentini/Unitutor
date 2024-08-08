import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetProfessorState, UpdateProfessor } from "../../redux/actions/professor";

const ProfessorModalUpdate = ({ show, handleClose, nameCourse, nameSubject, professorName, professorSurname }) => {
  const dispatch = useDispatch();
  const { success, loading, error } = useSelector((state) => state.professor);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    subjectName: nameSubject,
    newName: professorName,
    courseName: nameCourse,
    newSurname: professorSurname,
    oldName: professorName,
    oldSurname: professorSurname,
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
    dispatch(UpdateProfessor(formData));
  };
  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(resetProfessorState());
        handleClose();
      }, 3000);
    }
  }, [success, handleClose]);
  useEffect(() => {
    if (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
        dispatch(resetProfessorState());
      }, 3000);
    }
  }, [error]);
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica professore</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Spinner animation="border" />}
          {showErrorMessage && <Alert variant="danger">Qualcosa è andato storto, riprova</Alert>}
          {showSuccessMessage && <Alert variant="success">Professore modificato con successo!</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3 d-flex flex-column align-items-center">
                  <Form.Label>Nome </Form.Label>
                  <Form.Control type="text" name="newName" value={formData.newName} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3  d-flex flex-column align-items-center">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control type="text" onChange={handleChange} name="newSurname" value={formData.newSurname} />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Modifica
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ProfessorModalUpdate;
