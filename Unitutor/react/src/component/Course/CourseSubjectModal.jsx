import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AddNewsubject } from "../../redux/actions/subject";

const CourseSubjectModal = ({ show, handleClose, name }) => {
  const dispatch = useDispatch();
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
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi una materia al corso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
