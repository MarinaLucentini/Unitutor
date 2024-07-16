package marinalucentini.Unitutor.student.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record StudentPayload(
        @NotEmpty (message = "Il campo nome è obbligatorio")
        String name,
        @NotEmpty (message = "Il campo cognome è obbligatorio")
        String surname,
        @NotEmpty (message = "Il campo username è obbligatorio")
        String username,
        @NotEmpty (message = "Il campo password è obbligatorio")
        String password,
        @Email (message = "L'email non è valida")
        String email,
        @NotNull (message = "Il campo data di nascita è obbligatorio")
        LocalDate dateOfBirth
) {
}
