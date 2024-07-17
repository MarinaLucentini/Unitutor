package marinalucentini.Unitutor.student.payload;

import jakarta.validation.constraints.NotEmpty;

public record StudentUploadPasswordPayload(
        @NotEmpty (message = "Il campo password è obbligatorio")
        String password
) {
}
