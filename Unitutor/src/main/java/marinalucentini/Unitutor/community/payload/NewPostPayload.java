package marinalucentini.Unitutor.community.payload;

import jakarta.validation.constraints.NotEmpty;

public record NewPostPayload(
        @NotEmpty (message = "Il campo titolo è obbligatorio")
String title,
@NotEmpty(message = "Il campo contenuto è obbligatorio")
String content
) {
}
