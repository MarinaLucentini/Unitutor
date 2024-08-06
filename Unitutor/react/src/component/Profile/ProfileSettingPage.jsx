import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/actions";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import ModalDeleteProfile from "./ModalDeleteProfile";

const ProfileSettingPage = () => {
  const { content } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const [showModalDelete, setShowModalDelete] = useState(null);
  const handleCloseModaleDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = () => setShowModalDelete(true);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    dateOfBirth: "",
    email: "",
  });
  useEffect(() => {
    if (content) {
      setFormData({
        username: content.username,
        name: content.name,
        surname: content.surname,
        dateOfBirth: content.dateOfBirth,
        email: content.email,
      });
    }
  }, [content]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile(formData));
  };
  return (
    <>
      <Container className="my-3 bg-secondary  bg-opacity-10 rounded-4 p-3">
        <Row>
          <Col>
            <Button variant="btn" size="sm">
              <BsXLg className="text-secondary" size={44} onClick={handleShowModalDelete} />
            </Button>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Scrivi il tuo nome" name="name" value={formData.name} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formSurname">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control type="text" placeholder="Scrivi il tuo cognome" name="surname" value={formData.surname} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formBirthDate">
                    <Form.Label>Data di nascita</Form.Label>
                    <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Inserisci la tua email" name="email" value={formData.email} onChange={handleChange} />
              </Form.Group>

              <Button variant="btn btn-primary" type="submit">
                Submit
              </Button>
            </Form>
            <ModalDeleteProfile show={showModalDelete} handleClose={handleCloseModaleDelete} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ProfileSettingPage;
