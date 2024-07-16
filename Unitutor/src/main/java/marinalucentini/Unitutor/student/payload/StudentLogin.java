package marinalucentini.Unitutor.student.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record StudentLogin(
        @Email (message = "Il campo email non è valido")
        String email,
        @NotEmpty (message = "Il campo password è obbligatorio")
        String password
) {
}
