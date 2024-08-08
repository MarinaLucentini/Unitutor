import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { UpdatePost } from "../../redux/actions/post";
import { useEffect, useState } from "react";

const PostUpdateModal = ({ show, handleClose, post }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    postId: "",
  });
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        postId: post.idPost,
      });
    }
  }, [post]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdatePost(formData));
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica il post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 ">
              <Form.Label>Dai un titolo al tuo post</Form.Label>
              <Form.Control type="text" className="w-100" value={formData.title} name="title" onChange={handleChange} />
            </Form.Group>
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
export default PostUpdateModal;
