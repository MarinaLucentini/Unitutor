package marinalucentini.Unitutor.student.studentCard.services;

import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.student.studentCard.StudentCard;
import marinalucentini.Unitutor.student.studentCard.repository.StudentCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class StudentCardService {
    @Autowired
    private StudentCardRepository studentCardRepository;
    public StudentCard findById(UUID id){
        return studentCardRepository.findById(id).orElseThrow(()-> new NotFoundException("Il libretto non è stato trovato"));
    }
    public String save(StudentCard studentCard){
        studentCardRepository.save(studentCard);
        return "Il libretto è stato correttamente salvato nel db";
    }

}
