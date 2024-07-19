package marinalucentini.Unitutor.subject.payloads;

import jakarta.validation.constraints.NotEmpty;

public record DeleteSubjectPayload(
        @NotEmpty(message = "Il campo nome è obbligatorio")
        String name,
        @NotEmpty(message = "Il campo nome corso è obbligatorio")
        String nameCourse
) {
}
