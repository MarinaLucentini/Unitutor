import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetLessonState, UpdateLesson } from "../../redux/actions/lesson";
import { Alert, Button, Form, Modal } from "react-bootstrap";

const LessonModalUpdate = ({ show, handleClose, id, subjectName }) => {
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.lesson);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
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
  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(resetLessonState());
        handleClose();
      }, 3000);
    }
  }, [success, handleClose]);

  useEffect(() => {
    if (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
        dispatch(resetLessonState());
      }, 3000);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(UpdateLesson(formData));

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
          {showErrorMessage && <Alert variant="danger">Qualcosa è andato storto, riprova</Alert>}
          {showSuccessMessage && <Alert variant="success">Lezione modificata con successo</Alert>}
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
