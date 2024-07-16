package marinalucentini.Unitutor.role.payload;

import jakarta.validation.constraints.NotEmpty;

public record RoleUpdatePayload(
        @NotEmpty (message = "Il campo oldRole è obbligatorio")
        String oldRole,
        @NotEmpty (message = "Il campo newRole è obbligatorio")
        String newRole,
        @NotEmpty (message = "Il campo username è obbligatorio")
        String username
) {
}
