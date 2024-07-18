package marinalucentini.Unitutor.course.payload;

import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;

public record NewCoursePayload(
        @NotEmpty (message = "Il campo nome è obbligatorio")
        String name
//
//        int cfu,
//        @NotEmpty (message = "Il campo data di iscrizione è obbligatorio")
//        LocalDate dateEnrollment

) {
}
