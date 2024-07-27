import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import logo from "../../assets/g19.svg";
import monnalisa from "../../assets/monnalisa.png";

const FormLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.student);
  const { loading, error } = userRegister;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData));
    navigate("/profile");
  };

  return (
    <>
      <Card className="bg-secondary bg-opacity-10 align-items-center">
        <Card.Img variant="top" src={monnalisa} className=" monnalisa" />
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-center">
            <img src={logo} alt="" className="img-fluid img-brand mx-3" />
            <h2 className="text-uppercase">Unitutor</h2>
          </Card.Title>
          <Card.Subtitle className="mb-2">
            Non hai ancora un account?
            <Link className="btn btn-secondary mx-3 opacity-75" to={"/registerPage"}>
              Registrati
            </Link>
          </Card.Subtitle>

          <Form onSubmit={handleSubmit}>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Inserisci la tua e-mail" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Inserisci la tua Password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>

            <Link className="mx-3">Ho dimenticato la password</Link>
            <Button variant="btn btn-primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
export default FormLogin;
