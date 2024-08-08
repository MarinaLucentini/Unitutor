import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { transcriptionDeleteFunction } from "../../redux/actions/transcription";

const TranscriptionDeleteModal = ({ show, handleClose, subjectId, TranscriptionId }) => {
  const { error } = useSelector((state) => state.transcription);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(transcriptionDeleteFunction(subjectId, TranscriptionId));
    if (!error) {
      navigate("/profile");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sei sicuro di voler eliminare la trascrizione ?</Modal.Title>
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
export default TranscriptionDeleteModal;
