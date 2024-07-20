package marinalucentini.Unitutor.community.payload;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record UpdatePostPayload(
        @NotNull(message = "Il campo id del post è obbligatorio")
        UUID postId,
        String title,
        String content
) {
}
