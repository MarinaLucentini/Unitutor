package marinalucentini.Unitutor.student.payload;

import jakarta.validation.constraints.NotEmpty;

public record StudentUploadUsernamePayload(
        @NotEmpty (message = "Il campo username è obbligatorio")
        String username
) {
}
