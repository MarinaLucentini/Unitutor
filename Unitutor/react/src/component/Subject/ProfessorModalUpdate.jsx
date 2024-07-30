import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { UpdateProfessor } from "../../redux/actions/professor";

const ProfessorModalUpdate = ({ show, handleClose, nameCourse, nameSubject, professorName, professorSurname }) => {
  const dispatch = useDispatch();
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
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica professore</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
