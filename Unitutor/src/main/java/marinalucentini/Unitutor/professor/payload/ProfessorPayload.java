package marinalucentini.Unitutor.professor.payload;

import jakarta.validation.constraints.NotEmpty;

public record ProfessorPayload(
        @NotEmpty(message = "Il campo nome materia è obbligatorio")
        String subjectName,
        @NotEmpty (message = "Il campo nome professore è obbligatorio")
        String professorName,
        @NotEmpty (message = "Il campo cognome professore è obbligatorio")
        String professorSurname,
        @NotEmpty (message = "Il campo nome corso è obbligatorio")
        String courseName
) {
}
