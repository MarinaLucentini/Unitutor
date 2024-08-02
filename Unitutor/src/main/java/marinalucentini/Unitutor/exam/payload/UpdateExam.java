package marinalucentini.Unitutor.exam.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

public record UpdateExam(
        @NotNull(message = "Il campo id esame è obbligatorio")
        UUID examId,


        LocalDateTime dateTime,
        @NotNull(message = "Il campo nome del corso è obbligatorio")
        String courseName,
        @NotNull(message = "Il campo nome della materia è obbligatorio")
        String subjectName,
        boolean pass,
        int grade
) {
}
