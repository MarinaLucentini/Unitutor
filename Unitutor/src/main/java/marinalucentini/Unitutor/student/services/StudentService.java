package marinalucentini.Unitutor.student.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import marinalucentini.Unitutor.course.Course;
import marinalucentini.Unitutor.course.CourseStudentCard;
import marinalucentini.Unitutor.course.repositories.CourseRepository;
import marinalucentini.Unitutor.course.repositories.CourseStudentCardRepository;
import marinalucentini.Unitutor.exam.Exam;
import marinalucentini.Unitutor.exam.repository.ExamRepository;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.file.File;
import marinalucentini.Unitutor.file.Keyword;
import marinalucentini.Unitutor.file.Transcription;
import marinalucentini.Unitutor.file.repository.FileRepository;
import marinalucentini.Unitutor.file.repository.KeywordRepository;
import marinalucentini.Unitutor.file.repository.TranscriptionRepository;
import marinalucentini.Unitutor.lesson.Lesson;
import marinalucentini.Unitutor.lesson.repository.LessonRepository;
import marinalucentini.Unitutor.professor.Professor;
import marinalucentini.Unitutor.professor.repositories.ProfessorRepository;
import marinalucentini.Unitutor.role.Role;
import marinalucentini.Unitutor.role.repository.RoleRepository;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.payload.StudentPayload;
import marinalucentini.Unitutor.student.payload.StudentUploadPayload;
import marinalucentini.Unitutor.student.repositories.StudentRepository;
import marinalucentini.Unitutor.student.studentCard.StudentCard;
import marinalucentini.Unitutor.student.studentCard.repository.StudentCardRepository;
import marinalucentini.Unitutor.student.studentCard.services.StudentCardService;
import marinalucentini.Unitutor.subject.Subject;
import marinalucentini.Unitutor.subject.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.UUID;

@Service
public class StudentService {
    @Autowired
   private StudentRepository studentRepository;
    @Autowired
    private PasswordEncoder bcrypt;
   @Autowired
   private StudentCardService studentCardService;
    @Autowired
    private Cloudinary cloudinaryUploader;
    @Autowired
    private StudentCardRepository studentCardRepository;
    @Autowired
    private CourseStudentCardRepository courseStudentCardRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private TranscriptionRepository transcriptionRepository;
    @Autowired
    private FileRepository fileRepository;
    @Autowired
    private KeywordRepository keywordRepository;
    @Autowired
    private LessonRepository lessonRepository;
    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private RoleRepository roleRepository;
    public String saveStudent(StudentPayload studentDTO){
        studentRepository.findByEmail(studentDTO.email()).ifPresent(
            student -> {
                throw new BadRequestException("L'email " + studentDTO.email() + " è già in uso!");
            }
    );
        studentRepository.findByUsername(studentDTO.username()).ifPresent(
                student -> {
                    throw new BadRequestException("Lo username " + studentDTO.username() + " è già in uso!");
                }
        );
        String response = "Lo studente "  + studentDTO.username() + " è stato correttamente registrato";
      Student student = new Student(studentDTO.name(), studentDTO.surname(), studentDTO.username(), studentDTO.email(),bcrypt.encode(studentDTO.password()), studentDTO.dateOfBirth());
        student.setUrlAvatar("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s");
        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new NotFoundException("Ruolo USER non trovato"));
        StudentCard studentCard = new StudentCard();
studentCardService.save(studentCard);
StudentCard studentCardSaved = studentCardService.findById(studentCard.getId());
        student.setStudentCard(studentCardSaved);
        student.setRoles(Collections.singletonList(userRole));
        studentRepository.save(student);
        Student studentSaved = findById(student.getId());
        studentCardSaved.setStudent(studentSaved);
        studentCardService.save(studentCardSaved);
        return response;
    }
    public String uploadPassword (UUID id, String password){
        Student student = findById(id);
        student.setPassword(bcrypt.encode(password));
        studentRepository.save(student);
        return "La password dell'utente " + student.getUsername() + " è stata correttamente modificata";

    }
    public String uploadImage(UUID id, MultipartFile image) throws IOException{
        Student student = findById(id);
        String imageUrl = (String) cloudinaryUploader.uploader().upload(image.getBytes(), ObjectUtils.emptyMap()).get("url");
        student.setUrlAvatar(imageUrl);
        studentRepository.save(student);
        return "Immagine del profilo aggiornata correttamente!";
    }
    public String uploadProfile(UUID id, StudentUploadPayload body){
        Student student = findById(id);
        if(body.username() != null){

        student.setUsername(body.username());
        }
        if(body.dateOfBirth() != null){
            student.setDateOfBirth(body.dateOfBirth());
        }
        if(body.email()!= null){
            student.setEmail(body.email());
        }
        if(body.name()!= null){
            student.setName(body.name());
        }
        if(body.surname() != null){
            student.setSurname(body.surname());
        }
        studentRepository.save(student);
        return "Lo studente è stato correttamente modificato!";
    }
    @Transactional
    public String findByIdAndDelete(UUID id){
        Student student = findById(id);
        StudentCard studentCard = studentCardService.findById(student.getStudentCard().getId());


        for (CourseStudentCard courseStudentCard : studentCard.getCourseStudentCards()) {


            for (Course course : courseStudentCard.getCourseList()) {


                for (Subject subject : courseStudentCard.getSubjectList()) {




                    for (Transcription transcription : subject.getTranscriptions()) {
                        for (Keyword keyword : transcription.getKeywordList()) {
                            keywordRepository.delete(keyword);
                        }
                        transcriptionRepository.delete(transcription);
                    }


                    for (Lesson lesson : subject.getLessonList()) {
                        lessonRepository.delete(lesson);
                    }


                    for (File file : subject.getFileList()) {
                        fileRepository.delete(file);
                    }


                    for (Professor professor : subject.getProfessorList()) {
                        professorRepository.delete(professor);
                    }


                    for (Exam exam : subject.getExamList()) {
                        examRepository.delete(exam);
                    }


                    subjectRepository.delete(subject);
                }


                boolean isCourseLinkedToOtherStudentCards = course.getCourseStudentCard().stream()
                        .anyMatch(csc -> !csc.equals(courseStudentCard));

                if (!isCourseLinkedToOtherStudentCards) {
                 
                    courseRepository.delete(course);
                }
            }


            courseStudentCardRepository.delete(courseStudentCard);
        }


        studentCardRepository.delete(studentCard);


        studentRepository.delete(student);

        return "L'utente è stato cancellato correttamente";
    }
    public String uploadRegister(UUID id, String newRegister){
        Student student = findById(id);

                StudentCard studentCard = student.getStudentCard();
        studentCard.setRegister(newRegister);
        studentCardService.save(studentCard);
        return "La matricola è stata correttamente modificata in " + newRegister;
    }
    public Page<Student> getUsers(int pageNumber, int pageSize, String sortBy) {
        if (pageSize > 100) pageSize = 100;
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        return studentRepository.findAll(pageable);
    }
    public Student findById(UUID id){
        return studentRepository.findById(id).orElseThrow(()-> new NotFoundException(id));
    }
    public Student findByEmail(String email){
        return studentRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Utente con email " + email + " non trovato!"));
    }
    public Student findByUsername(String username){
        return studentRepository.findByUsername(username).orElseThrow(()-> new NotFoundException("L'utente con lo username " + username + " non è stato trovato!"));
    }

}
