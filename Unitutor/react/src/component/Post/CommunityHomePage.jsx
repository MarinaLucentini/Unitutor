import { useEffect, useState } from "react";
import { Button, Card, Col, Collapse, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddNewPost, GetAllPost } from "../../redux/actions/post";
import { BsFeather, BsXLg } from "react-icons/bs";
import PostUpdateModal from "./PostUpdateModal";
import PostDeleteModal from "./PostDeleteModal";
import { FaPlus } from "react-icons/fa";
import AddCommentModal from "./AddCommentModal";

const CommunityHomePage = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { content } = useSelector((state) => state.authentication);
  const [postToUpdate, setPostToUpdate] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);

  const [openComments, setOpenComments] = useState(null);

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
  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = (post) => {
    setShowModalDelete(true);
    setPostToDelete(post.idPost);
  };
  const [showModalAddComment, setShowModalAddComment] = useState(false);
  const handleCloseModalAddComment = () => setShowModalAddComment(false);
  const handleShowModalAddComment = (post) => {
    setShowModalAddComment(true);
    setPostToDelete(post.idPost);
  };

  const handleShowComments = (postId) => {
    if (openComments === postId) {
      setOpenComments(null);
    } else {
      setOpenComments(postId);
    }
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
                          <BsXLg className="text-secondary" size={16} onClick={() => handleShowModalDelete(post)} />
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                    <Card.Title>Autore : {post.usernameAuthor} </Card.Title>
                    <Card.Subtitle>Titolo: {post.title}</Card.Subtitle>
                    <Card.Text>{post.content}</Card.Text>
                    <Card.Text>
                      Commenti:
                      <Button
                        onClick={() => handleShowComments(post.idPost)}
                        aria-expanded={openComments === post.idPost}
                        aria-controls={`comments-${post.idPost}`}
                        variant="btn"
                        className="mx-3"
                      >
                        {post.commentList.length}
                      </Button>
                      <Button variant="btn" size="sm">
                        <FaPlus className="text-secondary" size={24} onClick={() => handleShowModalAddComment(post)} />
                      </Button>
                      {post.commentList && post.commentList.length > 0 ? (
                        post.commentList.map((comment) => (
                          <Collapse in={openComments === post.idPost} key={comment.commentId} id={`comments-${post.idPost}`}>
                            <div>
                              <Button variant="btn" size="sm">
                                <BsFeather className="text-secondary" size={16} />
                              </Button>
                              <Button variant="btn" size="sm">
                                <BsXLg className="text-secondary" size={16} />
                              </Button>
                              <h6> Autore: {comment.usernameAuthor} </h6>
                              <p>{comment.content}</p>
                            </div>
                          </Collapse>
                        ))
                      ) : (
                        <></>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>Nessun post disponibile.</p>
            )}
            <PostUpdateModal show={showModalUpdate} handleClose={handleCloseModalUpdate} post={postToUpdate} />
            <PostDeleteModal show={showModalDelete} handleClose={handleCloseModalDelete} postId={postToDelete} />
            <AddCommentModal show={showModalAddComment} handleClose={handleCloseModalAddComment} postId={postToDelete} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CommunityHomePage;
