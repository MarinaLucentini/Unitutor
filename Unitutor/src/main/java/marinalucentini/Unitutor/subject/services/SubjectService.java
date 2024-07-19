package marinalucentini.Unitutor.subject.services;

import marinalucentini.Unitutor.course.CourseStudentCard;
import marinalucentini.Unitutor.course.repositories.CourseStudentCardRepository;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.services.StudentService;
import marinalucentini.Unitutor.subject.Subject;
import marinalucentini.Unitutor.subject.payloads.DeleteSubjectPayload;
import marinalucentini.Unitutor.subject.payloads.NewSubjectPayload;
import marinalucentini.Unitutor.subject.payloads.UpdateSubjectPayload;
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
    // creazione nuova materia
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
    // modifica materia
    public String updateSubject(UUID id, UpdateSubjectPayload updateSubjectPayload){
        Student student = studentService.findById(id);
        Subject existingSubject = student.getStudentCard().getCourseStudentCards().stream()
                .flatMap(courseStudentCard -> courseStudentCard.getSubjectList().stream())
                .filter(subject1 -> subject1.getName().equalsIgnoreCase(updateSubjectPayload.name()))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("La materia " + updateSubjectPayload.name() + " non è stata trovata"));
if(updateSubjectPayload.newName() !=null){
    existingSubject.setName(updateSubjectPayload.newName());
}
if(updateSubjectPayload.cfu() != 0){
    existingSubject.setCfu(updateSubjectPayload.cfu());
}
if(updateSubjectPayload.subjectGrade() != 0){
    existingSubject.setSubjectGrade(updateSubjectPayload.subjectGrade());
}
        subjectRepository.save(existingSubject);
        return "La materia " + updateSubjectPayload.name() + " è stata correttamente aggiornata";
    }
    // cancellazione della materia
    public String deleteSubject (UUID id, DeleteSubjectPayload deleteSubjectPayload){
        Student student = studentService.findById(id);
        Subject existingSubject = student.getStudentCard().getCourseStudentCards().stream()
                .flatMap(courseStudentCard -> courseStudentCard.getSubjectList().stream())
                .filter(subject1 -> subject1.getName().equalsIgnoreCase(deleteSubjectPayload.name()))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("La materia " + deleteSubjectPayload.name() + " non è stata trovata"));
        student.getStudentCard().getCourseStudentCards().forEach(courseStudentCard ->
                courseStudentCard.getSubjectList().removeIf(subject -> subject.getId().equals(existingSubject.getId()))
        );
        student.getStudentCard().getCourseStudentCards().forEach(courseStudentCard ->
                courseStudentCardRepository.save(courseStudentCard)
        );
        subjectRepository.delete(existingSubject);
        return "La materia " + deleteSubjectPayload.name() + " è stata correttamente eliminata";
    }
}
