import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../redux/actions/uploadImage";

const ProfileImageModal = ({ show, handleClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const { loading, message, error, success } = useSelector((state) => state.uploadImage);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSaveChanges = () => {
    if (!selectedFile) {
      alert("Per favore seleziona un'immagine prima di salvare.");
      return;
    }

    dispatch(uploadImage(selectedFile));
  };
  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        handleClose();
      }, 3000);
    }
  }, [success, handleClose]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cambia la tua immagine del profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center flex-column">
          {" "}
          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {showSuccessMessage && <Alert variant="success">{message}</Alert>}
          <Form.Control type="file" onChange={handleFileChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSaveChanges} disabled={loading}>
            Salva modifiche
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ProfileImageModal;
