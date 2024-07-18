package marinalucentini.Unitutor.course.payload;

import jakarta.validation.constraints.NotEmpty;

public record DeleteCoursePayload(
        @NotEmpty (message = "Il campo name è obbligatorio")
        String name
) {
}
