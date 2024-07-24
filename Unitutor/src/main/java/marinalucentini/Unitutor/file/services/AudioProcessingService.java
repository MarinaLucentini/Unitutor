package marinalucentini.Unitutor.file.services;

import com.textrazor.AnalysisException;
import com.textrazor.NetworkException;
import marinalucentini.Unitutor.config.FirebaseStorageService;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.file.Keyword;
import marinalucentini.Unitutor.file.Transcription;
import marinalucentini.Unitutor.file.payload.KeywordPayload;
import marinalucentini.Unitutor.file.payload.TranscriptionFilePayload;
import marinalucentini.Unitutor.file.repository.KeywordRepository;
import marinalucentini.Unitutor.file.repository.TranscriptionRepository;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.services.StudentService;
import marinalucentini.Unitutor.subject.Subject;
import marinalucentini.Unitutor.subject.repository.SubjectRepository;
import org.cloudinary.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AudioProcessingService {
    @Autowired
    private SpeechFlowService speechFlowService;
    @Autowired
    private FirebaseStorageService firebaseStorageService;
    @Autowired
    private StudentService studentService;
    @Autowired
    private TranscriptionRepository transcriptionRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private TextRazorService textRazorService;
    @Autowired
    private KeywordRepository keywordRepository;
    public String processAndSaveAudio(UUID userId, UUID subjectId, String fileName) throws IOException {
        String transcription;
        try {
            transcription = speechFlowService.parseTranscriptionResult(speechFlowService.transcribeAudio(fileName)) ;
        } catch (Exception e) {
            throw new RuntimeException("Error during audio transcription", e);
        }

        Student student = studentService.findById(userId);
        Subject subject = student.getStudentCard().getCourseStudentCards().stream()
                .flatMap(courseStudentCard -> courseStudentCard.getSubjectList().stream())
                .filter(subject1 -> subject1.getId().equals(subjectId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("La materia non è stata trovata"));

        Transcription transcriptionEntry = new Transcription(subject, transcription);

        transcriptionRepository.save(transcriptionEntry);
        try {
            List<String> keywords = textRazorService.extractKeywords(transcription);
            Set<String> uniqueKeywords = new HashSet<>(keywords);
            for (String keyword : keywords) {
                Keyword keywordEntry = new Keyword(transcriptionEntry, keyword);
                keywordRepository.save(keywordEntry);
                transcriptionEntry.getKeywordList().add(keywordEntry);
            }
        } catch (AnalysisException e) {
            System.err.println("AnalysisException during keyword extraction" + e);

            throw new RuntimeException("AnalysisException during keyword extraction", e);
        } catch (NetworkException e) {
            System.err.println("NetworkException during keyword extraction"+ e);

            throw new RuntimeException("NetworkException during keyword extraction", e);
        } catch (Exception e) {
            System.err.println("Unexpected error during keyword extraction"+ e);

            throw new RuntimeException("Unexpected error during keyword extraction", e);
        }
        subject.getTranscriptions().add(transcriptionEntry);
        subjectRepository.save(subject);


        return "Il file audio è stato processato e il testo trascritto è stato salvato correttamente.";
    }
    public String updateProcessAudio(UUID userId, UUID subjectId, UUID transcriptionId, String text){
        Student student = studentService.findById(userId);
        Subject subject = student.getStudentCard().getCourseStudentCards().stream()
                .flatMap(courseStudentCard -> courseStudentCard.getSubjectList().stream())
                .filter(subject1 -> subject1.getId().equals(subjectId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("La materia non è stata trovata"));
        Transcription transcription = subject.getTranscriptions().stream()
                .filter(transcription1 -> transcription1.getId().equals(transcriptionId))
                .findFirst().orElseThrow(()-> new NotFoundException("La trascrizione non è stata trovata"));
        if(text != null){
        transcription.setText(text);
            keywordRepository.deleteAll(transcription.getKeywordList());
            transcription.getKeywordList().clear();

            try {
                List<String> keywords = textRazorService.extractKeywords(text);
                Set<String> uniqueKeywords = new HashSet<>(keywords);
                for (String keyword : uniqueKeywords) {
                    Keyword keywordEntry = new Keyword(transcription, keyword);
                    keywordRepository.save(keywordEntry);
                    transcription.getKeywordList().add(keywordEntry);
                }
            } catch (Exception e) {
                throw new RuntimeException("Error during keyword extraction", e);
            }

        }
        transcriptionRepository.save(transcription);

        return "La trascrizione è stata correttamente modificata";
    }
    public String findByIdAndDelete(UUID userId, UUID subjectId, UUID transcriptionId){
        Student student = studentService.findById(userId);
        Subject subject = student.getStudentCard().getCourseStudentCards().stream()
                .flatMap(courseStudentCard -> courseStudentCard.getSubjectList().stream())
                .filter(subject1 -> subject1.getId().equals(subjectId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("La materia non è stata trovata"));
        Transcription transcription = subject.getTranscriptions().stream()
                .filter(transcription1 -> transcription1.getId().equals(transcriptionId))
                .findFirst().orElseThrow(()-> new NotFoundException("La trascrizione non è stata trovata"));
        keywordRepository.deleteAll(transcription.getKeywordList());
        transcription.getKeywordList().clear();
        subject.getTranscriptions().removeIf(transcription1 -> transcription1.getId().equals(transcriptionId));
        transcriptionRepository.delete(transcription);
        subjectRepository.save(subject);

        return "La trascrizione è stata correttamente cancellata";
    }
    public Page<TranscriptionFilePayload> getTranscriptionsBySubject(UUID subjectId, int pageNumber, int pageSize, String sortBy) {
        if (pageSize > 100) pageSize = 100;
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));


        Page<Transcription> transcriptions = transcriptionRepository.findBySubjectId(subjectId, pageable);

        return transcriptions.map(transcription -> {
            List<KeywordPayload> keywordPayloads = transcription.getKeywordList().stream()
                    .map(keyword -> new KeywordPayload(keyword.getKeyword()))
                    .distinct()
                    .collect(Collectors.toList());

            return new TranscriptionFilePayload(
                    transcription.getText(),
                    keywordPayloads
            );
        });
    }

}
