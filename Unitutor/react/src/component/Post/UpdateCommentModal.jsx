import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { UpdateComment } from "../../redux/actions/comment";

const UpdateCommentModal = ({ commentId, show, handleClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    content: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentId) {
      dispatch(UpdateComment(formData, commentId));
      handleClose();
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica il commento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 ">
              <Form.Label>A cosa stai pensando?</Form.Label>
              <Form.Control as="textarea" rows={3} className="w-100" value={formData.content} name="content" onChange={handleChange} />
            </Form.Group>
            <Button type="submit">Modifica</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default UpdateCommentModal;
