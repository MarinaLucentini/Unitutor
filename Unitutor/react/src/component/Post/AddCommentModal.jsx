import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AddNewComment } from "../../redux/actions/comment";
import { useDispatch } from "react-redux";

const AddCommentModal = ({ show, handleClose, postId }) => {
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
    dispatch(AddNewComment(formData, postId));
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi una materia al corso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 ">
              <Form.Label>A cosa stai pensando?</Form.Label>
              <Form.Control as="textarea" rows={3} className="w-100" value={formData.content} name="content" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Commenta
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddCommentModal;
