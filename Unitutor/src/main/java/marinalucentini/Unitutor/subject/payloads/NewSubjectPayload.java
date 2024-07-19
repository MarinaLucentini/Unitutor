package marinalucentini.Unitutor.subject.payloads;

import jakarta.validation.constraints.NotEmpty;

public record NewSubjectPayload(
        @NotEmpty (message = "Il campo nome è obbligatorio")
        String name,
        int cfu,
        @NotEmpty (message = "Il campo nome del corso è obbliatorio ")
        String courseName
) {
}
