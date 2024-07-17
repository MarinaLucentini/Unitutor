package marinalucentini.Unitutor.student.services;

import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.role.Role;
import marinalucentini.Unitutor.role.repository.RoleRepository;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.payload.StudentPayload;
import marinalucentini.Unitutor.student.repositories.StudentRepository;
import marinalucentini.Unitutor.student.studentCard.StudentCard;
import marinalucentini.Unitutor.student.studentCard.repository.StudentCardRepository;
import marinalucentini.Unitutor.student.studentCard.services.StudentCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        String response = "Lo studente "  + studentDTO.username() + " è stato correttamente inserito nel db";
      Student student = new Student(studentDTO.name(), studentDTO.surname(), studentDTO.username(), studentDTO.email(),bcrypt.encode(studentDTO.password()), studentDTO.dateOfBirth());
        student.setUrlAvatar("https://unsplash.com/it/foto/donna-in-camicia-nera-sorridente-lNNHyRbmm0o");
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
