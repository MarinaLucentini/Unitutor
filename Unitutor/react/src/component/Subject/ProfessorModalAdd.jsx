import { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { AddNewProfessor } from "../../redux/actions/professor";
import { useDispatch } from "react-redux";

const ProfessorModalAdd = ({ show, handleClose, nameCourse, nameSubject }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    subjectName: nameSubject,
    professorName: "",
    courseName: nameCourse,
    professorSurname: "",
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
    dispatch(AddNewProfessor(formData));
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Professore alla materia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3 d-flex flex-column align-items-center">
                  <Form.Label>Nome </Form.Label>
                  <Form.Control type="text" name="professorName" value={formData.professorName} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3  d-flex flex-column align-items-center">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control type="text" onChange={handleChange} name="professorSurname" value={formData.professorSurname} />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Aggiungi Professore
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ProfessorModalAdd;
