import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetsubjectsState, UpdateSubject } from "../../redux/actions/subject";

const SubjectModalUpdate = ({ show, handleClose, nome, nameCourse, cfu }) => {
  const dispatch = useDispatch();
  const { loading, success, content, error } = useSelector((state) => state.subject);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: nome,
    subjectGrade: "",
    cfu: cfu || 0,
    nameCourse: nameCourse,
    newName: nome,
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
    dispatch(UpdateSubject(formData));
  };
  useEffect(() => {
    setFormData({
      name: nome,
      subjectGrade: "",
      cfu: cfu || 0,
      nameCourse: nameCourse,
      newName: nome,
    });
  }, [nome, cfu]);
  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(resetsubjectsState());
        handleClose();
      }, 3000);
    }
  }, [success, handleClose]);
  useEffect(() => {
    if (error) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
        dispatch(resetsubjectsState());
      }, 3000);
    }
  }, [error]);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica la materia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {content && loading && <Spinner animation="border" />}
          {showErrorMessage && <Alert variant="danger">{content}</Alert>}
          {showSuccessMessage && <Alert variant="success">{content}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3 d-flex flex-column align-items-center">
                  <Form.Label>Nome Materia</Form.Label>
                  <Form.Control type="text" name="newName" value={formData.newName} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3  d-flex flex-column align-items-center">
                  <Form.Label>Cfu </Form.Label>
                  <Form.Control type="number" onChange={handleChange} name="cfu" value={formData.cfu} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group className="mb-3  d-flex flex-column align-items-center">
                <Form.Label>Voto </Form.Label>
                <Form.Control type="number" onChange={handleChange} name="subjectGrade" value={formData.subjectGrade} />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Modifica corso
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default SubjectModalUpdate;
