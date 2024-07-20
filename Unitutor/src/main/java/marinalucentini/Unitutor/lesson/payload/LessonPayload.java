package marinalucentini.Unitutor.lesson.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record LessonPayload(
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
        @NotNull (message = "Il campo ora e data della lezione è obbligatorio")
        LocalDateTime dateTime,
        @NotEmpty(message = "Il campo nome del corso è obbligatorio")
        String courseName,
        @NotEmpty (message = "Il campo nome della materia è obbligatorio")
        String subjectName
) {
}
