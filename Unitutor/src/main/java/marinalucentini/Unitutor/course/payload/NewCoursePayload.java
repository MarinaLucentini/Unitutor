package marinalucentini.Unitutor.course.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record NewCoursePayload(
        @NotEmpty (message = "Il campo nome è obbligatorio")
        String name,
       int cfu,
        String register,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
      @NotNull(message = "Il campo data di iscrizione è obbligatorio")
       LocalDate dateEnrollment

) {
}
