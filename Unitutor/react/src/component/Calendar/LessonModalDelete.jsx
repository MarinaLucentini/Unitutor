import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { DeleteLesson } from "../../redux/actions/lesson";

const LessonModalDelete = ({ show, handleClose, subjectName, id }) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    subjectName: subjectName,

    lessonId: id,
  });
  const handleDelete = () => {
    dispatch(DeleteLesson(formData));
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sei sicuro di voler eliminare la materia ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="secondary" onClick={handleClose} className="mx-3">
            Torna indietro
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Elimina
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default LessonModalDelete;
