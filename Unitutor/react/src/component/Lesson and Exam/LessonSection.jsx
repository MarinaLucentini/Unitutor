import { Col, ListGroup, Row } from "react-bootstrap";

const LessonSection = ({ subject }) => {
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
                  {lesson.dateAndTime}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};
export default LessonSection;
