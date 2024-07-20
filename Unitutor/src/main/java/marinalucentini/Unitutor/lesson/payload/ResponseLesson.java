package marinalucentini.Unitutor.lesson.payload;

import java.time.LocalDateTime;

public record ResponseLesson(
        String subjectName,
        LocalDateTime dataAndTime
) {
}
