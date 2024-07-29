import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { UpdateCourse } from "../../redux/actions/course";

const CourseModalUpdate = ({ show, handleClose, nome, dateEnrollment, cfu }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: nome,
    graduationGrade: "",
    endDate: "",
    dateEnrollment: dateEnrollment,
    cfu: cfu,
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
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi il corso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
