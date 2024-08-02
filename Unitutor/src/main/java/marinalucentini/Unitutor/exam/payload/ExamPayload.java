package marinalucentini.Unitutor.exam.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ExamPayload(
        @NotEmpty(message = "Il campo nome del corso è obbligatorio")
        String courseName,
        @NotEmpty (message = "Il campo nome della materia è obbligatorio")
        String subjectName,

        @NotNull(message = "Il campo ora e data della lezione è obbligatorio")
        LocalDateTime dateTime,
         boolean pass,
        int grade
) {
}
