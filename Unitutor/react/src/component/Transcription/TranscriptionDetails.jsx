import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const TrascriptionDetails = () => {
  const { id } = useParams();
  const { content } = useSelector((state) => state.authentication);

  const [transcription, setTranscription] = useState(null);
  const [subjectName, setSubjectName] = useState(null);
  const [highlight, setHighlight] = useState(true);
  useEffect(() => {
    if (content && content.studentCard) {
      content.studentCard.courseStudentCards.forEach((card) => {
        card.subjectList.forEach((subject) => {
          const foundTranscription = subject.transcriptions.find((trans) => trans.id === id);
          if (foundTranscription) {
            setTranscription(foundTranscription);
            setSubjectName(subject.name);
          }
        });
      });
    }
  }, [content, id]);

  if (!transcription) {
    return <div>Loading...</div>;
  }

  const highlightKeywords = (text, keywordList) => {
    if (!keywordList || keywordList.length === 0) return text;

    const keywordArray = keywordList
      .map((keywordObj) => {
        if (keywordObj && typeof keywordObj.keyword === "string") {
          return keywordObj.keyword.trim().toLowerCase();
        }
        return null;
      })
      .filter((keyword) => keyword);

    if (keywordArray.length === 0) return text;

    const regex = new RegExp(`\\b(${keywordArray.join("|")})\\b`, "gi");
    return text.split(regex).map((part, index) =>
      typeof part === "string" && keywordArray.includes(part.toLowerCase()) ? (
        <mark key={index} className={highlight ? "highlight-keyword" : "highlight-keyword-none"}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handleHighlight = () => {
    setHighlight(!highlight);
  };
  return (
    <>
      <Container className="my-3 bg-secondary bg-opacity-10 rounded-4 p-3">
        <Row className="flex-column">
          <Col>
            <h3>
              Trascrizione del {formatDate(transcription.timestamp)} di {subjectName}{" "}
            </h3>
            <div>{highlightKeywords(transcription.text, transcription.keywordList)}</div>
          </Col>
          <Col>
            <Button variant="primary" onClick={handleHighlight}>
              {highlight ? "Non evidenziare" : "Evidenzia"}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default TrascriptionDetails;
