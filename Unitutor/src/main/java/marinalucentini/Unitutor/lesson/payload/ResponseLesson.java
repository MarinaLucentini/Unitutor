package marinalucentini.Unitutor.lesson.payload;

import java.time.LocalDateTime;
import java.util.UUID;

public record ResponseLesson(
        UUID id,
        String subjectName,
        LocalDateTime dataAndTime
) {
}
