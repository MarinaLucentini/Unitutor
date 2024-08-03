import { Card } from "react-bootstrap";

const TranscriptionSection = ({ subject }) => {
  return (
    <>
      {subject && subject.transcriptions.length > 0 ? (
        subject.transcriptions.map((transcription) => (
          <Card key={transcription.id} body>
            {transcription.text}
          </Card>
        ))
      ) : (
        <Card body> Nessuna trascrizione per questa materia </Card>
      )}
    </>
  );
};
export default TranscriptionSection;
