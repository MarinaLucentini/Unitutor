package marinalucentini.Unitutor.file.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import marinalucentini.Unitutor.config.FirebaseStorageService;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.file.File;
import marinalucentini.Unitutor.file.repository.FileRepository;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.services.StudentService;
import marinalucentini.Unitutor.subject.Subject;
import marinalucentini.Unitutor.subject.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class FileService {
    @Autowired
    FileRepository fileRepository;
    @Autowired
    private Cloudinary cloudinaryUploader;
@Autowired
private StudentService studentService;
@Autowired
private SubjectRepository subjectRepository;
@Autowired
private FirebaseStorageService firebaseStorageService;
    // salvataggio file audio
    public String saveFileAudio (UUID userId, UUID subjectId, MultipartFile audio) throws IOException {
//        if (audio.getSize() > 10 * 1024 * 1024) {
//            throw new MaxUploadSizeExceededException(10 * 1024 * 1024);
//        }
        // firebase con spring
      Student student = studentService.findById(userId);
        Subject subject =
      student.getStudentCard().getCourseStudentCards().stream()
              .flatMap(courseStudentCard -> courseStudentCard.getSubjectList().stream())
                      .filter(subject1 -> subject1.getId().equals(subjectId)).findFirst()
                      .orElseThrow(()-> new NotFoundException("La materia non è stata trovata"));
        String fileUrl = firebaseStorageService.uploadFile(subjectId, audio);
        File file = new File(subject.getName() + " " + audio.getOriginalFilename(), audio.getContentType(), fileUrl);
        file.setSubject(subject);
        fileRepository.save(file);
        subject.getFileList().add(file);
        subjectRepository.save(subject);
        return "Il file è stato salvato correttamente";
    }
    public File findById(UUID id){
        return fileRepository.findById(id).orElseThrow(()-> new NotFoundException("Il file non è stato trovato"));
    }
}
