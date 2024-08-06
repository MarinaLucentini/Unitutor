import { useDispatch } from "react-redux";

import { Button, Modal } from "react-bootstrap";
import { DeletePost } from "../../redux/actions/post";

const PostDeleteModal = ({ show, handleClose, postId }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    if (postId) {
      dispatch(DeletePost(postId));
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Sei sicuro di voler eliminare il post?</Modal.Title>
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
  );
};

export default PostDeleteModal;
