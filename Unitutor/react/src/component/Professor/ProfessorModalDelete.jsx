import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { DeleteProfessor } from "../../redux/actions/professor";
import { useState } from "react";

const ProfessorModalDelete = ({ show, handleClose, nameSubject, idProfessor, nameCourse }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    subjectName: nameSubject,
    id: idProfessor,
    courseName: nameCourse,
  });
  const handleDelete = () => {
    dispatch(DeleteProfessor(formData));
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sei sicuro di voler eliminare il professore?</Modal.Title>
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
export default ProfessorModalDelete;
