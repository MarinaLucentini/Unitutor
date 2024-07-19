package marinalucentini.Unitutor.subject.payloads;

import jakarta.validation.constraints.NotEmpty;

public record UpdateSubjectPayload(
        @NotEmpty(message = "Il campo nome è obbligatorio")
        String name,
        int subjectGrade,
int cfu,
        String newName,
        @NotEmpty(message = "Il campo nome corso è obbligatorio")
        String nameCourse
) {
}
