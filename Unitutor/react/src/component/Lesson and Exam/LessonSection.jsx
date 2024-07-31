import { Col, ListGroup, Row } from "react-bootstrap";

const LessonSection = ({ subject }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day}/${month}/${year} alle ${hours}:${minutes}`;
  };
  return (
    <>
      <Row className="flex-column">
        <Col className="mb-3">
          <div className="d-flex align-items-center justify-content-evenly mx-3">
            <p className="text-uppercase">Lezioni</p>
          </div>
        </Col>
        <Col>
          <ListGroup className=" align-items-center">
            {subject &&
              subject.lessonList.map((lesson) => (
                <ListGroup.Item variant="info" className="d-flex align-items-center " key={lesson.id}>
                  {formatDate(lesson.dateAndTime)}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};
export default LessonSection;
