import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const TranscriptionSection = ({ subject }) => {
  return (
    <>
      {subject && subject.transcriptions.length > 0 ? (
        subject.transcriptions.map((transcription) => (
          <div key={transcription.id}>
            <Link to={`/transcription/${transcription.id}`} className="list-group-item list-group-item-info list-group-item-action">
              {transcription.timestamp}
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
