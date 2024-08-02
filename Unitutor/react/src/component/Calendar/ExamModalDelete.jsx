import { useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteExam } from "../../redux/actions/exam";
import { Button, Modal } from "react-bootstrap";

const ExamModalDelete = ({ id, subjectName, show, handleClose }) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    subjectName: subjectName,
    examId: id,
  });
  const handleDelete = () => {
    dispatch(DeleteExam(formData));
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
export default ExamModalDelete;
