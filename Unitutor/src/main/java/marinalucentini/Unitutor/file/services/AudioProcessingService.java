package marinalucentini.Unitutor.file.services;

import marinalucentini.Unitutor.config.FirebaseStorageService;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.file.Transcription;
import marinalucentini.Unitutor.file.payload.TranscriptionFilePayload;
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
import java.util.UUID;

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
        subject.getTranscriptions().removeIf(transcription1 -> transcription1.getId().equals(transcriptionId));
        transcriptionRepository.delete(transcription);
        subjectRepository.save(subject);
        return "La trascrizione è stata correttamente cancellata";
    }
    public Page<TranscriptionFilePayload> getTranscriptionsBySubject(UUID subjectId, int pageNumber, int pageSize, String sortBy) {
        if (pageSize > 100) pageSize = 100;
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));


        Page<Transcription> transcriptions = transcriptionRepository.findBySubjectId(subjectId, pageable);

        return transcriptions.map(transcription -> new TranscriptionFilePayload(

                transcription.getText()

        ));
    }

}
