import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const TranscriptionSection = ({ subject }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <>
      <h5>Sbobbinature</h5>
      {subject && subject.transcriptions.length > 0 ? (
        subject.transcriptions.map((transcription) => (
          <div key={transcription.id}>
            <Link to={`/transcription/${transcription.id}`} className="list-group-item list-group-item-info list-group-item-action">
              Sbobbinatura del {formatDate(transcription.timestamp)}
            </Link>
          </div>
        ))
      ) : (
        <Card body> Nessuna trascrizione per questa materia </Card>
      )}
    </>
  );
};
export default TranscriptionSection;
