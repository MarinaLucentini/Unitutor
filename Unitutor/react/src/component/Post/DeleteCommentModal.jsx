import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { DeleteComment } from "../../redux/actions/comment";

const DeleteCommentModal = ({ show, handleClose, commentId }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    if (commentId) {
      dispatch(DeleteComment(commentId));
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sei sicuro di voler eliminare il commento?</Modal.Title>
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
export default DeleteCommentModal;
