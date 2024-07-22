package marinalucentini.Unitutor.community.payload;

import marinalucentini.Unitutor.community.Comment;

import java.util.List;
import java.util.UUID;

public record ResponsePostPayload(
        UUID idPost,
        List<ResponseCommentPayload> commentList,
String title,
        String content,
        String usernameAuthor

) {
}
