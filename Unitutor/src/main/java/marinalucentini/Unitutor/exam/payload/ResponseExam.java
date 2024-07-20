package marinalucentini.Unitutor.exam.payload;

import java.time.LocalDateTime;
import java.util.UUID;

public record ResponseExam(
        UUID id,
        String subjectName,
        LocalDateTime dataAndTime,
        int grade,
        boolean pass
) {
}
