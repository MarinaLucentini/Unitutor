package marinalucentini.Unitutor.student.services;

import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.payload.StudentPayload;
import marinalucentini.Unitutor.student.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class StudentService {
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    private PasswordEncoder bcrypt;
    public String saveStudent(StudentPayload studentDTO){        studentRepository.findByEmail(studentDTO.email()).ifPresent(
            student -> {
                throw new BadRequestException("L'email " + studentDTO.email() + " è già in uso!");
            }
    );
        String response = "Lo studente "  + studentDTO.username() + "è stato correttamente inserito nel db";
      Student student = new Student(studentDTO.name(), studentDTO.surname(), studentDTO.username(), studentDTO.email(),bcrypt.encode(studentDTO.password()), studentDTO.dateOfBirth());
        student.setUrlAvatar("https://unsplash.com/it/foto/donna-in-camicia-nera-sorridente-lNNHyRbmm0o");
        return response;
    }
    public Student findById(UUID id){
        return studentRepository.findById(id).orElseThrow(()-> new NotFoundException(id));
    }
    public Student findByEmail(String email){
        return studentRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Utente con email " + email + " non trovato!"));
    }
}
