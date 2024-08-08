import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProfessor, resetProfessorState } from "../../redux/actions/professor";
import { useEffect, useState } from "react";

const ProfessorModalDelete = ({ show, handleClose, nameSubject, idProfessor, nameCourse }) => {
  const dispatch = useDispatch();
  const { success, loading, error } = useSelector((state) => state.professor);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    subjectName: nameSubject,
    id: idProfessor,
    courseName: nameCourse,
  });
  const handleDelete = () => {
    dispatch(DeleteProfessor(formData));
    handleClose();
  };
  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(resetProfessorState());
        handleClose();
      }, 3000);
    }
  }, [success, handleClose]);
  useEffect(() => {
    if (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
        dispatch(resetProfessorState());
      }, 3000);
    }
  }, [error]);
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sei sicuro di voler eliminare il professore?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Spinner animation="border" />}
          {showErrorMessage && <Alert variant="danger">Qualcosa è andato storto, riprova</Alert>}
          {showSuccessMessage && <Alert variant="success">Professore modificato con successo!</Alert>}
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
