package marinalucentini.Unitutor.lesson.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

public record DeleteLesson(
        @NotNull (message = "Il campo id lezione è obbligatorio")
        UUID lessonId,


        @NotNull(message = "Il campo nome della materia è obbligatorio")
        String subjectName
) {
}
