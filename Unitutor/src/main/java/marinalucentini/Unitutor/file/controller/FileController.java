package marinalucentini.Unitutor.file.controller;


import marinalucentini.Unitutor.file.payload.TranscriptionFilePayload;
import marinalucentini.Unitutor.file.payload.TranscriptionFileUploadPayload;
import marinalucentini.Unitutor.file.services.AudioProcessingService;
import marinalucentini.Unitutor.file.services.FileService;
import marinalucentini.Unitutor.file.services.SpeechFlowService;
import marinalucentini.Unitutor.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;

import java.io.IOException;
import java.nio.file.Files;


import java.nio.file.Path;
import java.util.UUID;

@RestController
@RequestMapping("/files")
public class FileController {
    @Autowired
    private FileService fileService;
    @Autowired
    private AudioProcessingService audioProcessingService;
    @Autowired
    private SpeechFlowService speechFlowService;
    @PostMapping("/add/{subjectId}/audio")
    public String addAudio(@AuthenticationPrincipal Student student, @PathVariable UUID subjectId, @RequestParam("audio") MultipartFile audio) throws IOException{
        return fileService.saveFileAudio(student.getId(), subjectId, audio);
    }
// processare file audio
    @PostMapping("/{subjectId}/transcription")
    public ResponseEntity<String> transcriptionAudio(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal Student student, @PathVariable UUID subjectId) {
        try {

            Path tempDir = Files.createTempDirectory("uploaded-audio");
            File tempFile = new File(tempDir.toFile(), file.getOriginalFilename());
            file.transferTo(tempFile);


            String response = audioProcessingService.processAndSaveAudio(student.getId(), subjectId, tempFile.getAbsolutePath());


            Files.deleteIfExists(tempFile.toPath());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error during audio transcription: " + e.getMessage());
        }
    }
    // modifica file di testo estratto
    @PatchMapping("/{subjectId}/{transcriptionId}")
    public String updateTranscription (@AuthenticationPrincipal Student student, @PathVariable UUID subjectId, @PathVariable UUID transcriptionId, @RequestBody TranscriptionFileUploadPayload transcriptionFilePayload){
return audioProcessingService.updateProcessAudio(student.getId(), subjectId, transcriptionId, transcriptionFilePayload.text());
    }
    // cancellazione file audio
    @DeleteMapping("delete/file/audio/{subjectId}/{fileId}")
    public String deleteFileAudio(@AuthenticationPrincipal Student student, @PathVariable UUID subjectId, @PathVariable UUID fileId){
        return fileService.deleteFileAudio(student.getId(), subjectId, fileId);
    }
    // cancellazione file di testo
    @DeleteMapping("delete/transcription/{subjectId}/{transcriptionId}")
    public String deleteTranscription(@AuthenticationPrincipal Student student, @PathVariable UUID subjectId, @PathVariable UUID transcriptionId){
        return audioProcessingService.findByIdAndDelete(student.getId(), subjectId, transcriptionId);
    }
    // visualizzazione di tutti i file trascritti per materia
@GetMapping("/{subjectId}/transcription")
    public Page<TranscriptionFilePayload> getTranscriptionBySubject(@PathVariable UUID subjectId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy){
        return audioProcessingService.getTranscriptionsBySubject(subjectId, page, size, sortBy);
}

}


