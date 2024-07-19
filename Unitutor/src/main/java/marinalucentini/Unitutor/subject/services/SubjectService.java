package marinalucentini.Unitutor.subject.services;

import marinalucentini.Unitutor.course.CourseStudentCard;
import marinalucentini.Unitutor.course.repositories.CourseStudentCardRepository;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.services.StudentService;
import marinalucentini.Unitutor.subject.Subject;
import marinalucentini.Unitutor.subject.payloads.NewSubjectPayload;
import marinalucentini.Unitutor.subject.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SubjectService {
    @Autowired
    SubjectRepository subjectRepository;
    @Autowired
    StudentService studentService;
    @Autowired
    CourseStudentCardRepository courseStudentCardRepository;
    public Subject findByName(String name){
        return subjectRepository.findByName(name).orElseThrow(()-> new NotFoundException("La materia " + name + " non è stata trovata"));
    }
    public Subject findById(UUID id){
        return subjectRepository.findById(id).orElseThrow(()-> new NotFoundException("La materia non è stata trovata"));
    }
    public String saveNewSubject(UUID id, NewSubjectPayload newSubjectPayload){
        Student student = studentService.findById(id);
        CourseStudentCard courseStudentCard = student.getStudentCard().getCourseStudentCards().stream()
                .filter(courseStudentCard1 -> courseStudentCard1.getCourseList().stream()
                        .anyMatch(course -> course.getName().equalsIgnoreCase(newSubjectPayload.courseName()))).findFirst().orElseThrow(()-> new NotFoundException("Il corso " + newSubjectPayload.courseName() + " non è stato trovato"));

       boolean existSubject = courseStudentCard.getSubjectList().stream()
               .anyMatch(subject -> subject.getName().equalsIgnoreCase(newSubjectPayload.name()));
if(existSubject){
    throw new BadRequestException("La materia " + newSubjectPayload.name() + " è già esistente nell'elenco delle materie del corso");
}

        Subject subject = new Subject(newSubjectPayload.name());
        if(newSubjectPayload.cfu() != 0){
            subject.setCfu(newSubjectPayload.cfu());
        }
        subject.setCourse(courseStudentCard);
        subjectRepository.save(subject);
        courseStudentCard.getSubjectList().add(subject);
        courseStudentCardRepository.save(courseStudentCard);

        return "La materia " + newSubjectPayload.name() + " è stata correttamente salvata nel corso " + newSubjectPayload.courseName();
    }
}
