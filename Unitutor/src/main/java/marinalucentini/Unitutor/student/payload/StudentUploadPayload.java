package marinalucentini.Unitutor.student.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;

public record StudentUploadPayload(

        String username,
        String name,
        String surname,
        LocalDate dateOfBirth,
        @Email(message = "Campo email non valido")
        String email
) {
}
