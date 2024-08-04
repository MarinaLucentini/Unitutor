import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const TrascriptionDetails = () => {
  const { id } = useParams();
  const { content } = useSelector((state) => state.authentication);

  const [transcription, setTranscription] = useState(null);
  useEffect(() => {
    if (content && content.studentCard) {
      content.studentCard.courseStudentCards.forEach((card) => {
        card.subjectList.forEach((subject) => {
          const foundTranscription = subject.transcriptions.find((trans) => trans.id === id);
          if (foundTranscription) {
            setTranscription(foundTranscription);
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
        <mark key={index} className="highlight-keyword">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <Card body>
        <h3>Transcription Details</h3>
        <div>{highlightKeywords(transcription.text, transcription.keywordList)}</div>
      </Card>
    </>
  );
};
export default TrascriptionDetails;
