import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions";
import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/g19.svg";
import monnalisa from "../../assets/statua.png";

const FormRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    dateOfBirth: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, errorMsg, content } = useSelector((state) => state.student);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "La password non corrisponde riprova" });
      return;
    }
    setErrors({});
    dispatch(registerUser(formData, setErrors));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/loginPage");
      }, 2000);

      return () => clearTimeout(timer); // Pulizia del timer se il componente si smonta
    }
  }, [success, navigate]);

  return (
    <>
      <Card className="bg-secondary bg-opacity-10 align-items-center">
        <Card.Body>
          <Card.Title className="d-flex  align-items-center justify-content-center">
            <img src={logo} alt="" className="img-fluid img-brand mx-3" />
            <h2 className="text-uppercase">Unitutor</h2>
          </Card.Title>
          <p>Compila il form e crea il tuo account per iniziare ad utilizzare tutte le funzionalità.</p>
          <Card.Subtitle className="mb-2">
            Hai già un account?
            <Link className="btn btn-secondary mx-3 opacity-75" to={"/loginPage"}>
              Effettua il log-in
            </Link>
          </Card.Subtitle>

          <Form onSubmit={handleSubmit}>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{errorMsg}</Alert>}
            {success && <Alert variant="success">{content}</Alert>}
            <img src={monnalisa} alt="" className=" monnalisa" />
            <Row>
              <Col>
                <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Scrivi il tuo nome"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formSurname">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Scrivi il tuo cognome"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    isInvalid={!!errors.surname}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formBirthDate">
                  <Form.Label>Data di nascita</Form.Label>
                  <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} isInvalid={!!errors.dateOfBirth} required />
                  <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} isInvalid={!!errors.username} required />
                  <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci la tua email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formBasicPasswordConfirm">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Conferma Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Row className="justify-content-between">
              <Col xs={9}>
                <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Giuro solennemente di non avere buone intenzioni"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button variant="btn btn-primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
export default FormRegistration;
