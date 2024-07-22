package marinalucentini.Unitutor.file.controller;

import marinalucentini.Unitutor.file.services.FileService;
import marinalucentini.Unitutor.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/files")
public class FileController {
    @Autowired
    private FileService fileService;
    @PostMapping("/add/{subjectId}/audio")
    public String addAudio(@AuthenticationPrincipal Student student, @PathVariable UUID subjectId, @RequestParam("audio") MultipartFile audio) throws IOException{
        return fileService.saveFileAudio(student.getId(), subjectId, audio);
    }

}
