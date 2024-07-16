package marinalucentini.Unitutor.role.payload;

import jakarta.validation.constraints.NotEmpty;

public record RolePayload(
        @NotEmpty (message = "Il campo name è obbligatorio")
        String name
) {
}
