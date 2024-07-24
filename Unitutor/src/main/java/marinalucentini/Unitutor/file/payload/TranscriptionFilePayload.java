package marinalucentini.Unitutor.file.payload;

import java.util.List;

public record TranscriptionFilePayload(
        String text,
        List<KeywordPayload> keywordPayloads
) {
}
