import { Col, ListGroup, Row } from "react-bootstrap";

const ExamSection = ({ subject }) => {
  return (
    <>
      <Row className="flex-column">
        <Col className="mb-3">
          <div className="d-flex align-items-center justify-content-evenly mx-3">
            <p className="text-uppercase">Esami</p>
          </div>
        </Col>
        <Col>
          <ListGroup className=" align-items-center">
            {subject &&
              subject.examList.map((lesson) => (
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
export default ExamSection;
