package marinalucentini.Unitutor.professor.payload;

import jakarta.validation.constraints.NotEmpty;

public record UpdateProfessorPayload(
        @NotEmpty (message = "Il campo nome professore è obbligatorio")
        String oldName,
        @NotEmpty (message = "Il campo cognome professore è obbligatorio")
        String oldSurname,
        String newName,
        String newSurname,
        @NotEmpty (message = "Il campo nome corso è obbligatorio")
        String courseName,
        @NotEmpty (message = "Il campo nome materia è obbligatorio")
        String subjectName
) {
}
