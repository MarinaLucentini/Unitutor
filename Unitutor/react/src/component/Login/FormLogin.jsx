import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Alert, Button, Card, Form, InputGroup, Spinner } from "react-bootstrap";
import logo from "../../assets/g19.svg";
import monnalisa from "../../assets/monnalisa.png";
import { loginUser } from "../../redux/actions";
import { PiEye, PiEyeClosed } from "react-icons/pi";

const FormLogin = () => {
  const navigate = useNavigate();
  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.authentication);
  const { loading, error, success } = userLogin;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasAttemptedLogin(true);
    dispatch(loginUser(formData));
  };
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    }
  }, [success, navigate]);
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
            {error && !loading && hasAttemptedLogin && <Alert variant="danger">Qualcosa è andato storto riprova</Alert>}
            {success && hasAttemptedLogin && <Alert variant="success">Login effettuato! Verrai automaticamente indirizzato alla pagina del profilo</Alert>}
            <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Inserisci la tua e-mail" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3 d-flex flex-column align-items-center" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Inserisci la tua Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <PiEye /> : <PiEyeClosed />}
                </Button>
              </InputGroup>
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
