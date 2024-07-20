package marinalucentini.Unitutor.exam.service;

import marinalucentini.Unitutor.course.CourseStudentCard;
import marinalucentini.Unitutor.exam.Exam;
import marinalucentini.Unitutor.exam.payload.DeleteExam;
import marinalucentini.Unitutor.exam.payload.ExamPayload;
import marinalucentini.Unitutor.exam.payload.ResponseExam;
import marinalucentini.Unitutor.exam.payload.UpdateExam;
import marinalucentini.Unitutor.exam.repository.ExamRepository;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.lesson.Lesson;
import marinalucentini.Unitutor.lesson.payload.ResponseLesson;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.services.StudentService;
import marinalucentini.Unitutor.subject.Subject;
import marinalucentini.Unitutor.subject.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ExamService {
    @Autowired
    ExamRepository examRepository;
    @Autowired
    StudentService studentService;
    @Autowired
    SubjectRepository subjectRepository;
    // creazione nuovo esame e salvataggio nel db
    public String saveExam(UUID userId, ExamPayload body){
        Student student = studentService.findById(userId);
        CourseStudentCard courseStudentCard = student.getStudentCard().getCourseStudentCards().stream()
                .filter(courseStudentCard1 -> courseStudentCard1.getCourseList().stream()
                        .anyMatch(course -> course.getName().equalsIgnoreCase(body.courseName())))
                .findFirst().orElseThrow(()-> new NotFoundException("Il corso " + body.courseName() + " non è stato trovato"));
        Subject existingSubject = courseStudentCard.getSubjectList().stream()
                .filter(subject -> subject.getName().equalsIgnoreCase(body.subjectName())).findFirst()
                .orElseThrow(() -> new NotFoundException("La materia " +body.subjectName() + " non è stata trovata"));
        Exam exam = new Exam(body.dateTime());
        if(body.pass()){
            exam.setPass(body.pass());
        }
        if(body.grade() != 0){
            exam.setGrade(body.grade());
            existingSubject.setSubjectGrade(body.grade());
        }
        examRepository.save(exam);
        exam.setSubject(existingSubject);
        existingSubject.getExamList().add(exam);
        subjectRepository.save(existingSubject);
        return "L'esame è stato correttamente salvato";
    }
// modifica esame
    public String updateExam(UUID userId, UpdateExam body){
        Student student = studentService.findById(userId);
        CourseStudentCard courseStudentCard = student.getStudentCard().getCourseStudentCards().stream()
                .filter(courseStudentCard1 -> courseStudentCard1.getCourseList().stream()
                        .anyMatch(course -> course.getName().equalsIgnoreCase(body.courseName())))
                .findFirst().orElseThrow(()-> new NotFoundException("Il corso " + body.courseName() + " non è stato trovato"));
        Subject existingSubject = courseStudentCard.getSubjectList().stream()
                .filter(subject -> subject.getName().equalsIgnoreCase(body.subjectName())).findFirst()
                .orElseThrow(() -> new NotFoundException("La materia " +body.subjectName() + " non è stata trovata"));
        Exam exam = existingSubject.getExamList().stream().filter(exam1 -> exam1.getId().equals(body.examId()))
                .findFirst().orElseThrow(()-> new NotFoundException("L'esame con id " + body.examId() + " non è stato trovato"));
       if(body.dateTime() != null){
        exam.setDateTime(body.dateTime());

       }
       if(body.pass()){
           exam.setPass(body.pass());
       }
       if(body.grade() != 0){
           exam.setGrade(body.grade());
           existingSubject.setSubjectGrade(body.grade());
       }
       examRepository.save(exam);
       return "L'esame è stato correttamente modificato";

    }
    // cancella esame
    public String deleteExam(UUID userId, DeleteExam body){
        Student student = studentService.findById(userId);
        CourseStudentCard courseStudentCard = student.getStudentCard().getCourseStudentCards().stream()
                .filter(courseStudentCard1 -> courseStudentCard1.getCourseList().stream()
                        .anyMatch(course -> course.getName().equalsIgnoreCase(body.courseName())))
                .findFirst().orElseThrow(()-> new NotFoundException("Il corso " + body.courseName() + " non è stato trovato"));
        Subject existingSubject = courseStudentCard.getSubjectList().stream()
                .filter(subject -> subject.getName().equalsIgnoreCase(body.subjectName())).findFirst()
                .orElseThrow(() -> new NotFoundException("La materia " +body.subjectName() + " non è stata trovata"));
        Exam exam = existingSubject.getExamList().stream().filter(exam1 -> exam1.getId().equals(body.examId()))
                .findFirst().orElseThrow(()-> new NotFoundException("L'esame con id " + body.examId() + " non è stato trovato"));
        existingSubject.getExamList().removeIf(exam1 -> exam1.getId().equals(body.examId()));
        subjectRepository.save(existingSubject);
        examRepository.delete(exam);
        return "L'esame è stato correttamente eliminato";
    }
    // torna tutti gli esami collegati all'utente
    public Page<ResponseExam> getAllExam(int pageNumber, int pageSize, String sortBy, UUID userId){
        if (pageSize > 100) pageSize = 100;
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Student student = studentService.findById(userId);
        List<Exam> exam = student.getStudentCard().getCourseStudentCards().stream()
                .flatMap(courseStudentCard -> courseStudentCard.getSubjectList().stream())
                .flatMap(subject -> subject.getExamList().stream())
                .collect(Collectors.toList());
        List<ResponseExam> responseLessons = exam.stream()
                .map(exam1 -> new ResponseExam(exam1.getId(), exam1.getSubject().getName(), exam1.getDateTime(), exam1.getGrade(), exam1.isPass()))
                .collect(Collectors.toList());
        int start = Math.min((int)pageable.getOffset(), responseLessons.size());
        int end = Math.min((start + pageable.getPageSize()), responseLessons.size());
        Page<ResponseExam> examPage = new PageImpl<>(responseLessons.subList(start, end), pageable, responseLessons.size());
        return examPage;
    }

    public Exam findById(UUID id){
       return examRepository.findById(id).orElseThrow(()-> new NotFoundException("L'esame non è stato trovato"));
    }
}
