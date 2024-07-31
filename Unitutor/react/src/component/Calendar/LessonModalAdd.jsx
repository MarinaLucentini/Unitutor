import { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddNewLesson } from "../../redux/actions/lesson";
import { addHours } from "date-fns";

const LessonModalAdd = ({ show, handleClose, date }) => {
  const { loading, content } = useSelector((state) => state.authentication);
  const courses = content.studentCard.courseStudentCards;
  const allCourses = courses.flatMap((course) => course.courseList);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    courseName: "",
    subjectName: "",
    dateTime: date,
  });

  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [time, setTime] = useState("");
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      dateTime: date,
    }));
  }, [date]);

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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
    dispatch(AddNewLesson(finalFormData));
    handleClose();
    setFormData({
      courseName: "",
      subjectName: "",
      dateTime: date,
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi la lezione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
            <Form.Group className="align-items-center">
              <Form.Label>{"Seleziona l'orario"}</Form.Label>
              <Form.Control type="time" name="time" value={time} onChange={handleTimeChange} size="sm" />
            </Form.Group>
            <Button variant="primary" type="submit" className="my-3">
              Aggiungi la lezione
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default LessonModalAdd;
