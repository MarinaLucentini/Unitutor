package marinalucentini.Unitutor.professor.payload;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ProfessorDelete(
        @NotEmpty(message = "Il campo nome materia è obbligatorio")
        String subjectName,
        @NotNull(message = "Il campo id professore è obbligatorio")
        UUID id,
        @NotEmpty (message = "Il campo nome corso è obbligatorio")
        String courseName
) {
}
