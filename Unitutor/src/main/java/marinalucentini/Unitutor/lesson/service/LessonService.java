package marinalucentini.Unitutor.lesson.service;

import marinalucentini.Unitutor.course.CourseStudentCard;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.lesson.Lesson;
import marinalucentini.Unitutor.lesson.payload.LessonPayload;
import marinalucentini.Unitutor.lesson.repository.LessonRepository;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.services.StudentService;
import marinalucentini.Unitutor.subject.Subject;
import marinalucentini.Unitutor.subject.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class LessonService {
    @Autowired
    LessonRepository lessonRepository;
    @Autowired
    StudentService studentService;
    @Autowired
    SubjectRepository subjectRepository;
    // salvataggio nuova lezione
    public String saveLesson(UUID id, LessonPayload body){
        Student student = studentService.findById(id);
        CourseStudentCard courseStudentCard = student.getStudentCard().getCourseStudentCards().stream()
                .filter(courseStudentCard1 -> courseStudentCard1.getCourseList().stream()
                        .anyMatch(course -> course.getName().equalsIgnoreCase(body.courseName())))
                .findFirst().orElseThrow(()-> new NotFoundException("Il corso " + body.courseName() + " non è stato trovato"));
        Subject existingSubject = courseStudentCard.getSubjectList().stream()
                .filter(subject -> subject.getName().equalsIgnoreCase(body.subjectName())).findFirst()
                .orElseThrow(() -> new NotFoundException("La materia " +body.subjectName() + " non è stata trovata"));
        Lesson lesson = new Lesson(body.dateTime());
        lessonRepository.save(lesson);
        lesson.setSubject(existingSubject);
        existingSubject.getLessonList().add(lesson);
        subjectRepository.save(existingSubject);
        return "La lezione è stata salvata con successo";
    }


   public Lesson findById(UUID id){
        return lessonRepository.findById(id).orElseThrow(()-> new NotFoundException("La lezione non è stata trovata"));
    }
  public  Lesson findByName(String name){
        return lessonRepository.findByName(name).orElseThrow(()-> new NotFoundException("La lezione non è stata trovata"));
    }
}
