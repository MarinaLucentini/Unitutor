import { useMemo } from "react";
import { Col, ListGroup, Row, Tab, Tabs } from "react-bootstrap";

const LessonAndExamSection = ({ subject }) => {
  const groupItemsByMonthFunc = (items, dateField) => {
    const itemsByMonth = {};

    items.forEach((item) => {
      const date = new Date(item[dateField]);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!itemsByMonth[monthYear]) {
        itemsByMonth[monthYear] = [];
      }

      itemsByMonth[monthYear].push(item);
    });

    return itemsByMonth;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day}/${month}/${year} alle ${hours}:${minutes}`;
  };

  const groupItemsByMonth = useMemo(() => {
    const lessonsByMonth = groupItemsByMonthFunc(subject.lessonList, "dateAndTime");
    const examsByMonth = groupItemsByMonthFunc(subject.examList, "dateTime");

    const itemsByMonth = { ...lessonsByMonth };
    for (const [monthYear, exams] of Object.entries(examsByMonth)) {
      if (!itemsByMonth[monthYear]) {
        itemsByMonth[monthYear] = [];
      }
      itemsByMonth[monthYear] = [...itemsByMonth[monthYear], ...exams];
    }

    return itemsByMonth;
  }, [subject.lessonList, subject.examList]);

  const monthNames = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];

  return (
    <>
      <Row className="flex-column">
        <Col className="mb-3">
          <div className="d-flex align-items-center justify-content-evenly mx-3">
            <p className="text-uppercase">Lezioni ed Esami</p>
          </div>
        </Col>
        <Col>
          <Tabs defaultActiveKey={Object.keys(groupItemsByMonth)[0]}>
            {Object.keys(groupItemsByMonth).map((monthYear) => {
              const [year, month] = monthYear.split("-");
              const lessons = groupItemsByMonth[monthYear].filter((item) => item.dateAndTime);
              const exams = groupItemsByMonth[monthYear].filter((item) => item.dateTime);

              return (
                <Tab eventKey={monthYear} title={`${monthNames[month - 1]} ${year}`} key={monthYear}>
                  <h5 className="my-3">Lezioni</h5>
                  <ListGroup className="align-items-center">
                    {lessons.map((lesson) => (
                      <ListGroup.Item variant="info" className="d-flex align-items-center" key={lesson.id}>
                        {formatDate(lesson.dateAndTime)}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <h5 className="mt-3">Esami</h5>
                  <ListGroup className="align-items-center">
                    {exams.map((exam) => (
                      <ListGroup.Item variant="info" className="d-flex align-items-center" key={exam.id}>
                        {formatDate(exam.dateTime)}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Tab>
              );
            })}
          </Tabs>
        </Col>
      </Row>
    </>
  );
};
export default LessonAndExamSection;
