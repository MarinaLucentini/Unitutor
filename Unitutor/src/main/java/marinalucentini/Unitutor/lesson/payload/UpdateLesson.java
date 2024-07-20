package marinalucentini.Unitutor.lesson.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

public record UpdateLesson(
        @NotNull (message = "Il campo id lezione è obbligatorio")
        UUID lessonId,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
        @NotNull(message = "Il campo ora e data della lezione è obbligatorio")
        LocalDateTime dateTime,
        @NotNull(message = "Il campo nome del corso è obbligatorio")
        String courseName,
        @NotNull(message = "Il campo nome della materia è obbligatorio")
        String subjectName
) {
}
