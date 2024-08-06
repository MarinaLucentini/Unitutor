import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddNewPost, GetAllPost } from "../../redux/actions/post";
import { BsFeather, BsXLg } from "react-icons/bs";
import PostUpdateModal from "./PostUpdateModal";

const CommunityHomePage = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { content } = useSelector((state) => state.authentication);
  const [postToUpdate, setPostToUpdate] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
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
    dispatch(AddNewPost(formData));
  };
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const handleCloseModalUpdate = () => setShowModalUpdate(false);
  const handleShowModalUpdate = (post) => {
    setShowModalUpdate(true);
    setPostToUpdate(post);
  };
  useEffect(() => {
    dispatch(GetAllPost());
  }, [dispatch]);

  return (
    <>
      <Container className="my-3 bg-secondary bg-opacity-10 rounded-4 p-3">
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 ">
                <Form.Label>Dai un titolo al tuo post</Form.Label>
                <Form.Control type="text" className="w-100" value={formData.title} name="title" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Form.Label>A cosa stai pensando?</Form.Label>
                <Form.Control as="textarea" rows={3} className="w-100" value={formData.content} name="content" onChange={handleChange} />
              </Form.Group>
              <Button type="submit">Posta</Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            {posts && posts.content && posts.content.length > 0 ? (
              posts.content.map((post) => (
                <Card key={post.idPost} className="my-3">
                  <Card.Body>
                    {post.usernameAuthor === content.username ? (
                      <>
                        <Button variant="btn" size="sm">
                          <BsFeather className="text-secondary" size={16} onClick={() => handleShowModalUpdate(post)} />
                        </Button>
                        <Button variant="btn" size="sm">
                          <BsXLg className="text-secondary" size={16} />
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                    <strong>Autore:</strong> {post.usernameAuthor} <br />
                    <strong>Titolo:</strong> {post.title} <br />
                    <strong>Testo:</strong> {post.content}
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>Nessun post disponibile.</p>
            )}
            <PostUpdateModal show={showModalUpdate} handleClose={handleCloseModalUpdate} post={postToUpdate} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CommunityHomePage;
