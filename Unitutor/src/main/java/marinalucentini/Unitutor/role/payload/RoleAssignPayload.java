package marinalucentini.Unitutor.role.payload;

import jakarta.validation.constraints.NotEmpty;
import lombok.NoArgsConstructor;

public record RoleAssignPayload(
        @NotEmpty (message = "Il campo name è obbligatorio")
        String name,
        @NotEmpty (message = "Il campo username è obbligatorio")
        String username
) {
}
