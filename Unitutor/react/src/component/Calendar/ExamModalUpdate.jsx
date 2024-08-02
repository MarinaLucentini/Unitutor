import { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateExam } from "../../redux/actions/exam";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const ExamModalUpdate = ({ date, subjectName, show, handleClose, grade, pass, id }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    subjectName: subjectName,
    dateTime: date,
    pass: pass,
    grade: grade,
    examId: id,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(UpdateExam(formData));
    handleClose();
    setFormData({
      subjectName: subjectName,
      dateTime: date,
      pass: pass,
      grade: grade,
      examId: id,
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{"Aggiungi l'esame"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="d-flex flex-column align-items-center justify-content-center">
                  <Form.Label>La data se è cambiata</Form.Label>
                  <Form.Control type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} className="w-50" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3 d-flex flex-column align-items-center justify-content-center ">
                  <Form.Label>Voto</Form.Label>
                  <Form.Control type="number" name="grade" value={formData.grade} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Check
              type="checkbox"
              label="Esame passato"
              name="pass"
              checked={formData.pass}
              onChange={handleChange}
              className="d-flex justify-content-center "
            />

            <Button variant="primary" type="submit" className="my-3">
              {"Modifica l'esame"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ExamModalUpdate;
