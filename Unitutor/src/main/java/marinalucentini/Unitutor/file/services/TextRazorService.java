package marinalucentini.Unitutor.file.services;

import com.textrazor.AnalysisException;
import com.textrazor.NetworkException;
import com.textrazor.TextRazor;
import com.textrazor.annotations.AnalyzedText;
import com.textrazor.annotations.Entity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TextRazorService {
    private static final Logger logger = LoggerFactory.getLogger(TextRazorService.class);
    @Value("${text.razon.apy.key}")
    private String apiKey;

    public List<String> extractKeywords(String text) throws AnalysisException, NetworkException {
        logger.info("Starting keyword extraction for text: {}", text);
        TextRazor client = new TextRazor(apiKey);
        client.addExtractor("entities");
        client.addExtractor("topics");

        AnalyzedText response = client.analyze(text);
        List<String> keywords = new ArrayList<>();
        for (Entity entity : response.getResponse().getEntities()) {
            keywords.add(entity.getEntityId());
            System.out.println("Matched Entity: " + entity.getEntityId());
        }

        return keywords;
    }
}
