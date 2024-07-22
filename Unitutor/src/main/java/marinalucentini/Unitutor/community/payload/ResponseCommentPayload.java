package marinalucentini.Unitutor.community.payload;

import java.util.UUID;

public record ResponseCommentPayload(
        UUID commentId,
        String usernameAuthor,
        String content
) {
}
