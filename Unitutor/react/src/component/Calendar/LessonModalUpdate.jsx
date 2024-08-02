import { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateLesson } from "../../redux/actions/lesson";
import { Button, Form, Modal } from "react-bootstrap";

const LessonModalUpdate = ({ show, handleClose, id, subjectName }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    subjectName: subjectName,
    dateTime: "",
    lessonId: id,
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

    dispatch(UpdateLesson(formData));
    handleClose();
    setFormData({
      subjectName: subjectName,
      dateTime: "",
      lessonId: id,
    });
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica la lezione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="d-flex flex-column align-items-center justify-content-center">
              <Form.Label>Seleziona la data corretta</Form.Label>
              <Form.Control type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} size="sm" />
            </Form.Group>
            <Button variant="primary" type="submit" className="my-3">
              Modifica la lezione
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default LessonModalUpdate;
