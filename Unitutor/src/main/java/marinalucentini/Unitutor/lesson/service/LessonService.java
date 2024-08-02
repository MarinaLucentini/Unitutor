package marinalucentini.Unitutor.lesson.service;

import marinalucentini.Unitutor.course.Course;
import marinalucentini.Unitutor.course.CourseStudentCard;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.lesson.Lesson;
import marinalucentini.Unitutor.lesson.payload.DeleteLesson;
import marinalucentini.Unitutor.lesson.payload.LessonPayload;
import marinalucentini.Unitutor.lesson.payload.ResponseLesson;
import marinalucentini.Unitutor.lesson.payload.UpdateLesson;
import marinalucentini.Unitutor.lesson.repository.LessonRepository;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.services.StudentService;
import marinalucentini.Unitutor.subject.Subject;
import marinalucentini.Unitutor.subject.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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

// modifica lezione
    public String updateLesson(UUID userId, UpdateLesson body){
        Student student = studentService.findById(userId);
        CourseStudentCard courseStudentCard = student.getStudentCard().getCourseStudentCards().stream()
                .filter(courseStudentCard1 -> courseStudentCard1.getSubjectList().stream()
                        .anyMatch(course -> course.getName().equalsIgnoreCase(body.subjectName())))
                .findFirst().orElseThrow(()-> new NotFoundException("La materia " + body.subjectName() + " non è stato trovato"));
        Subject existingSubject = courseStudentCard.getSubjectList().stream()
                .filter(subject -> subject.getName().equalsIgnoreCase(body.subjectName())).findFirst()
                .orElseThrow(() -> new NotFoundException("La materia " +body.subjectName() + " non è stata trovata"));
        Lesson lesson = existingSubject.getLessonList().stream().filter(lesson1 -> lesson1.getId().equals(body.lessonId()))
                .findFirst().orElseThrow(()-> new NotFoundException("La lezione non è stata trovata"));
        lesson.setDateAndTime(body.dateTime());
        lessonRepository.save(lesson);
return "La lezione con ID" + body.lessonId() + " è stata modificata correttamente";
    }
    // cancella lezione
    public String deleteLesson(UUID userId, DeleteLesson body){
        Student student = studentService.findById(userId);
        CourseStudentCard courseStudentCard = student.getStudentCard().getCourseStudentCards().stream()
                .filter(courseStudentCard1 -> courseStudentCard1.getSubjectList().stream()
                        .anyMatch(course -> course.getName().equalsIgnoreCase(body.subjectName())))
                .findFirst().orElseThrow(()-> new NotFoundException("Il corso " + body.subjectName() + " non è stato trovato"));
        Subject existingSubject = courseStudentCard.getSubjectList().stream()
                .filter(subject -> subject.getName().equalsIgnoreCase(body.subjectName())).findFirst()
                .orElseThrow(() -> new NotFoundException("La materia " +body.subjectName() + " non è stata trovata"));
        Lesson lesson = existingSubject.getLessonList().stream().filter(lesson1 -> lesson1.getId().equals(body.lessonId()))
                .findFirst().orElseThrow(()-> new NotFoundException("La lezione non è stata trovata"));
        existingSubject.getLessonList().removeIf(lesson1 -> lesson1.getId().equals(body.lessonId()));
        subjectRepository.save(existingSubject);
        lessonRepository.delete(lesson);
        return "La lezione è stata correttamente cancellata";

    }
    // tornare tutte le lezioni
    public Page<ResponseLesson> getAllLesson(int pageNumber, int pageSize, String sortBy, UUID userId){
        if (pageSize > 100) pageSize = 100;
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Student student = studentService.findById(userId);
        List<Lesson> lessons = student.getStudentCard().getCourseStudentCards().stream()
                .flatMap(courseStudentCard -> courseStudentCard.getSubjectList().stream()).flatMap(subject -> subject.getLessonList().stream())
                .collect(Collectors.toList());
        List<ResponseLesson> responseLessons = lessons.stream()
                .map(lesson -> new ResponseLesson(lesson.getId(), lesson.getSubject().getName(), lesson.getDateAndTime()))
                .collect(Collectors.toList());
        int start = Math.min((int)pageable.getOffset(), responseLessons.size());
        int end = Math.min((start + pageable.getPageSize()), responseLessons.size());
        Page<ResponseLesson> lessonPage = new PageImpl<>(responseLessons.subList(start, end), pageable, responseLessons.size());
        return lessonPage;
    }
    // torna le lezioni di una data specifica
    public List<ResponseLesson> getLessonsByDate(LocalDate date, UUID studentId) {

        Student student = studentService.findById(studentId);
        List<Lesson> lessons = student.getStudentCard().getCourseStudentCards().stream()
                .flatMap(courseStudentCard -> courseStudentCard.getSubjectList().stream())
                .flatMap(subject -> subject.getLessonList().stream()).filter(lesson -> lesson.getDateAndTime().toLocalDate()
                        .equals(date)).toList();
        List<ResponseLesson> responseLessons = lessons.stream()
                .map(lesson -> new ResponseLesson(lesson.getId(), lesson.getSubject().getName(), lesson.getDateAndTime()))
                .collect(Collectors.toList());
        return responseLessons;
    }
   public Lesson findById(UUID id){
        return lessonRepository.findById(id).orElseThrow(()-> new NotFoundException("La lezione non è stata trovata"));
    }


}
