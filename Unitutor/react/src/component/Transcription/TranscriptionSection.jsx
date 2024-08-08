import { useMemo } from "react";
import { Col, ListGroup, Row, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { groupTranscriptionsByMonthFunc } from "../../redux/actions/transcription";

const TranscriptionSection = ({ transcriptions }) => {
  const groupTranscriptionsByMonth = useMemo(() => {
    return groupTranscriptionsByMonthFunc(transcriptions);
  }, [transcriptions]);

  const monthNames = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Row className="flex-column">
        <Col className="mb-3">
          <div className="d-flex align-items-center justify-content-evenly mx-3">
            <p className="text-uppercase">Sbobbinature</p>
          </div>
        </Col>
        <Col>
          <Tabs defaultActiveKey={Object.keys(groupTranscriptionsByMonth)[0]}>
            {Object.keys(groupTranscriptionsByMonth).map((monthYear) => {
              const [year, month] = monthYear.split("-");
              const transcriptionsForMonth = groupTranscriptionsByMonth[monthYear];

              return (
                <Tab eventKey={monthYear} title={`${monthNames[month - 1]} ${year}`} key={monthYear}>
                  <ListGroup className="align-items-center my-3">
                    {transcriptionsForMonth.map((transcription) => (
                      <ListGroup.Item variant="info" className="d-flex align-items-center" key={transcription.id}>
                        <Link to={`/transcription/${transcription.id}`} className="list-group-item list-group-item-info list-group-item-action">
                          Sbobbinatura del {formatDate(transcription.timestamp)}
                        </Link>
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
export default TranscriptionSection;
