import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RESET_TRANSCRIPTION, transcriptionUpdateFunction } from "../../redux/actions/transcription";
import TranscriptionDeleteModal from "./TranscriptionDeleteModal";

const TranscriptionDetails = () => {
  const { id } = useParams();
  const { content } = useSelector((state) => state.authentication);
  const { loading, success } = useSelector((state) => state.transcription);

  const [transcription, setTranscription] = useState(null);
  const [subject, setSubject] = useState(null);
  const [highlight, setHighlight] = useState(true);
  const [transcriptionUpdate, setTranscriptionUpdate] = useState(false);
  const [showModalDeleteTranscription, setShowModalDeleteTranscription] = useState(false);
  const handleCloseModalDeleteTranscription = () => setShowModalDeleteTranscription(false);
  const handleShowModalDeleteTranscription = () => setShowModalDeleteTranscription(true);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    text: "",
  });

  useEffect(() => {
    if (content && content.studentCard) {
      content.studentCard.courseStudentCards.forEach((card) => {
        card.subjectList.forEach((subject) => {
          const foundTranscription = subject.transcriptions.find((trans) => trans.id === id);
          if (foundTranscription) {
            setTranscription(foundTranscription);
            setSubject(subject);
            setFormData({ text: foundTranscription.text });
          }
        });
      });
    }
  }, [content, id]);

  useEffect(() => {
    if (success) {
      setTranscriptionUpdate(false);
      setTimeout(() => {
        dispatch({ type: RESET_TRANSCRIPTION });
      }, 3000);
    }
  }, [success, dispatch]);

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

  const handleTranscriptionUpdate = () => {
    setTranscriptionUpdate(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(transcriptionUpdateFunction(formData, subject.id, transcription.id));
  };

  return (
    <>
      <Container className="my-3 bg-secondary bg-opacity-10 rounded-4 p-3">
        <Row className="flex-column">
          <Col>
            <h3>
              Trascrizione del {formatDate(transcription.timestamp)} di {subject.name}
            </h3>
            {!transcriptionUpdate ? (
              <div>{highlightKeywords(transcription.text, transcription.keywordList)}</div>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control as="textarea" rows={45} value={formData.text} onChange={handleChange} name="text" className="w-100" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Modifica
                </Button>
              </Form>
            )}
          </Col>
          {loading && <Alert variant="info">Loading....</Alert>}
          {success && <Alert variant="success">La trascrizione è stata correttamente modificata</Alert>}
          <TranscriptionDeleteModal
            show={showModalDeleteTranscription}
            handleClose={handleCloseModalDeleteTranscription}
            subjectId={subject.id}
            TranscriptionId={transcription.id}
          />
          {!transcriptionUpdate ? (
            <Col className="my-3 d-flex align-items-center">
              <Button variant="primary" onClick={handleHighlight}>
                {highlight ? "Non evidenziare" : "Evidenzia"}
              </Button>
              <Button onClick={handleTranscriptionUpdate}>Modifica</Button>
              <Button onClick={handleShowModalDeleteTranscription}>Cancella</Button>
            </Col>
          ) : (
            <Col></Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default TranscriptionDetails;
