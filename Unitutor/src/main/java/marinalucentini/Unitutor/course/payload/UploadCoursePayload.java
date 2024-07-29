package marinalucentini.Unitutor.course.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;

public record UploadCoursePayload(
        @NotEmpty(message = "Il campo name è obbligatorio")
        String name,
        int graduationGrade,

        LocalDate endDate,

        LocalDate dateEnrollment,
        int cfu
) {
}
