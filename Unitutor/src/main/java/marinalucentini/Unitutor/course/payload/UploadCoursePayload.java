package marinalucentini.Unitutor.course.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;

public record UploadCoursePayload(
        @NotEmpty(message = "Il campo name è obbligatorio")
        String name,
        int graduationGrade,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
        LocalDate endDate,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
        LocalDate dateEnrollment,
        int cfu
) {
}
