package marinalucentini.Unitutor.student.payload;

import jakarta.validation.constraints.NotEmpty;

public record StudentCardUpdatePayload(
        @NotEmpty(message = "Il campo matricola è obbligatorio")
        String newRecord
) {
}
