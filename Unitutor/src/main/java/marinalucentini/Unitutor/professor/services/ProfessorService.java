package marinalucentini.Unitutor.professor.services;

import marinalucentini.Unitutor.course.CourseStudentCard;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.professor.Professor;
import marinalucentini.Unitutor.professor.payload.ProfessorPayload;
import marinalucentini.Unitutor.professor.payload.UpdateProfessorPayload;
import marinalucentini.Unitutor.professor.repositories.ProfessorRepository;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.services.StudentService;
import marinalucentini.Unitutor.subject.Subject;
import marinalucentini.Unitutor.subject.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProfessorService {
    @Autowired
    ProfessorRepository professorRepository;
    @Autowired
    StudentService studentService;
    @Autowired
    SubjectRepository subjectRepository;
    // creazione professore e associazione al corso
    public String newProfessor(UUID id, ProfessorPayload body){
        Student student = studentService.findById(id);
        CourseStudentCard courseStudentCard = student.getStudentCard().getCourseStudentCards().stream()
                .filter(courseStudentCard1 -> courseStudentCard1.getCourseList().stream()
                        .anyMatch(course -> course.getName().equalsIgnoreCase(body.courseName())))
                .findFirst().orElseThrow(()-> new NotFoundException("Il corso " + body.courseName() + " non è stato trovato"));
        Subject existingSubject = courseStudentCard.getSubjectList().stream()
                .filter(subject -> subject.getName().equalsIgnoreCase(body.subjectName())).findFirst()
                .orElseThrow(() -> new NotFoundException("La materia " +body.subjectName() + " non è stata trovata"));

        Professor professor = new Professor(body.professorName(), body.professorSurname());
        professorRepository.save(professor);
        existingSubject.getProfessorList().add(professor);
        professor.getSubjectList().add(existingSubject);
        subjectRepository.save(existingSubject);
        return "Il professore " + body.professorName() + " " + body.professorSurname() +   " è stato corretamente inserito e aggiunto alla materia " + body.subjectName();
    }
    // modifica
public String updateProfessor(UUID id, UpdateProfessorPayload body){
        Student student = studentService.findById(id);
        CourseStudentCard courseStudentCard = student.getStudentCard().getCourseStudentCards().stream().filter(courseStudentCard1 -> courseStudentCard1.getCourseList().stream()
                .anyMatch(course -> course.getName().equalsIgnoreCase(body.courseName()))).findFirst().orElseThrow(() -> new NotFoundException("Il corso " + body.courseName() + " non è stato trovato"));
        Subject subject = courseStudentCard.getSubjectList().stream()
                .filter(subject1 -> subject1.getName().equalsIgnoreCase(body.subjectName())).findFirst()
                .orElseThrow(()-> new NotFoundException("La materia " + body.subjectName() + " non è stata trovata"));
        Professor professor = subject.getProfessorList().stream()
                .filter(professor1 -> professor1.getName().equalsIgnoreCase(body.oldName()) && professor1.getSurname().equalsIgnoreCase(body.oldSurname()))
                .findFirst().orElseThrow(()-> new NotFoundException("Il professore " + body.oldName() + " " + body.oldSurname() + " non è stato trovato"));
        if(body.newName() != null){
            professor.setName(body.newName());
        }
        if(body.newSurname() != null){
            professor.setSurname(body.newSurname());
        }
        professorRepository.save(professor);
        return "Il professore è stato modificato correttamente";
}
// cancellazione
public String deleteProfessor(UUID id, ProfessorPayload body){
    Student student = studentService.findById(id);
    CourseStudentCard courseStudentCard = student.getStudentCard().getCourseStudentCards().stream().filter(courseStudentCard1 -> courseStudentCard1.getCourseList().stream()
            .anyMatch(course -> course.getName().equalsIgnoreCase(body.courseName()))).findFirst().orElseThrow(() -> new NotFoundException("Il corso " + body.courseName() + " non è stato trovato"));
    Subject subject = courseStudentCard.getSubjectList().stream()
            .filter(subject1 -> subject1.getName().equalsIgnoreCase(body.subjectName())).findFirst()
            .orElseThrow(()-> new NotFoundException("La materia " + body.subjectName() + " non è stata trovata"));

    Professor professor = subject.getProfessorList().stream()
            .filter(professor1 -> professor1.getName().equalsIgnoreCase(body.professorName()) && professor1.getSurname().equalsIgnoreCase(body.professorSurname()))
            .findFirst().orElseThrow(()-> new NotFoundException("Il professore " + body.professorName() + " " + body.professorSurname() + " non è stato trovato"));
    subject.getProfessorList().removeIf(professor1 -> professor1.getId().equals(professor.getId()));
    subjectRepository.save(subject);
    professorRepository.delete(professor);
    return "Il professore è stato correttamente cancellato";
}


    public Professor findById(UUID id){
        return professorRepository.findById(id).orElseThrow(()-> new NotFoundException("Il professore non è stato trovato"));
    }
    public Professor findByName(String name){
        return professorRepository.findByName(name).orElseThrow(()-> new NotFoundException("Il professore non è stato trovato"));
    }
}
