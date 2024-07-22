package marinalucentini.Unitutor.community.payload;

import jakarta.validation.constraints.NotEmpty;

public record NewCommentPayload(
        @NotEmpty (message = "Il campo contenuto è obbligatorio")
        String content
) {
}
