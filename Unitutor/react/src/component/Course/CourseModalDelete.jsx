import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCourse, resetCourseState } from "../../redux/actions/course";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CourseModalDelete = ({ show, handleClose, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector((state) => state.course);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleDelete = () => {
    dispatch(DeleteCourse(name));
  };

  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(resetCourseState());
        navigate("/profile");
      }, 3000);
    }
  }, [success, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
        dispatch(resetCourseState());
      }, 3000);
    }
  }, [error, dispatch]);
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Sei sicuro di voler eliminare il corso?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <Spinner animation="border" />}
        {showErrorMessage && <Alert variant="danger">Qualcosa è andato storto, riprova</Alert>}
        {showSuccessMessage && <Alert variant="success">Corso eliminato con successo, sarai reindirizzato alla tua pagina profilo</Alert>}
        <Button variant="secondary" onClick={handleClose} className="mx-3">
          Torna indietro
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Elimina
        </Button>
      </Modal.Body>
    </Modal>
  );
};
export default CourseModalDelete;
