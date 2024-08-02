import { addHours } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddNewExam } from "../../redux/actions/exam";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";

const ExamModalAdd = ({ show, handleClose, date }) => {
  const { loading, content } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    courseName: "",
    subjectName: "",
    dateTime: date,
    pass: false,
    grade: "",
  });

  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      dateTime: date,
    }));
  }, [date]);

  if (!content || !content.studentCard) {
    return null;
  }

  const courses = content.studentCard.courseStudentCards;
  const allCourses = courses.flatMap((course) => course.courseList);

  const handleCourseChange = (e) => {
    const selectedCourseName = e.target.value;
    setFormData({
      ...formData,
      courseName: selectedCourseName,
      subjectName: "",
    });

    const selectedCourse = courses.flatMap((courseStudentCard) => courseStudentCard.courseList).find((course) => course.name === selectedCourseName);

    if (selectedCourse) {
      const subjectsForSelectedCourse = courses
        .filter((courseStudentCard) => courseStudentCard.courseList.includes(selectedCourse))
        .flatMap((courseStudentCard) => courseStudentCard.subjectList);
      setFilteredSubjects(subjectsForSelectedCourse);
    } else {
      setFilteredSubjects([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [hours, minutes] = time.split(":");
    const dateTime = new Date(formData.dateTime);
    dateTime.setHours(hours, minutes);

    const finalDateTime = addHours(dateTime, 2);
    const finalFormData = {
      ...formData,
      dateTime: finalDateTime,
    };
    dispatch(AddNewExam(finalFormData));
    handleClose();
    setFormData({
      courseName: "",
      subjectName: "",
      dateTime: date,
      pass: false,
      grade: "",
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{"Aggiungi l'esame"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                {" "}
                <Form.Group>
                  <Form.Label>Seleziona il corso</Form.Label>
                  {loading && <Spinner />}
                  <Form.Select value={formData.courseName} onChange={handleCourseChange} name="courseName" size="sm">
                    <option>Apri la tendina per selezionare</option>
                    {allCourses.map((singleCourse) => (
                      <option key={singleCourse.id} value={singleCourse.name}>
                        {singleCourse.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group>
                  <Form.Label>Seleziona la materia</Form.Label>
                  {loading && <Spinner />}
                  <Form.Select value={formData.subjectName} onChange={handleChange} name="subjectName" size="sm">
                    <option>Apri la tendina per selezionare</option>
                    {filteredSubjects.map((singleSubject) => (
                      <option key={singleSubject.id} value={singleSubject.name}>
                        {singleSubject.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="d-flex flex-column align-items-center justify-content-center">
                  <Form.Label>{"Seleziona l'orario"}</Form.Label>
                  <Form.Control type="time" name="time" value={time} onChange={handleTimeChange} className="w-50" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3 d-flex flex-column align-items-center justify-content-center ">
                  <Form.Label>Voto</Form.Label>
                  <Form.Control type="number" name="grade" value={formData.grade} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Check
              type="checkbox"
              label="Esame passato"
              name="pass"
              checked={formData.pass}
              onChange={handleChange}
              className="d-flex justify-content-center "
            />

            <Button variant="primary" type="submit" className="my-3">
              {"Aggiungi l'esame"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ExamModalAdd;
