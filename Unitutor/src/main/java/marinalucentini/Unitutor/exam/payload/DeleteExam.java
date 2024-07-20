package marinalucentini.Unitutor.exam.payload;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record DeleteExam(
        @NotNull(message = "Il campo id esame è obbligatorio")
        UUID examId,
        @NotNull(message = "Il campo nome del corso è obbligatorio")
        String courseName,
        @NotNull(message = "Il campo nome della materia è obbligatorio")
        String subjectName
) {
}
