package marinalucentini.Unitutor.lesson.controller;

import marinalucentini.Unitutor.exam.payload.ResponseExam;
import marinalucentini.Unitutor.exam.service.ExamService;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.lesson.payload.DeleteLesson;
import marinalucentini.Unitutor.lesson.payload.LessonPayload;
import marinalucentini.Unitutor.lesson.payload.ResponseLesson;
import marinalucentini.Unitutor.lesson.payload.UpdateLesson;
import marinalucentini.Unitutor.lesson.service.LessonService;
import marinalucentini.Unitutor.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/lessons")
public class LessonController {
    @Autowired
    LessonService lessonService;
    @Autowired
    ExamService examService;
    // 1 salvare la lezione associata a una materia del corso
    @PostMapping("/add")
    public ResponseEntity<Object> saveNewLesson(@AuthenticationPrincipal Student student, @RequestBody @Validated LessonPayload body, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        try {
            String response =lessonService.saveLesson(student.getId(), body);
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }

    }
    // 2 modifica una lezione collegata a una materia del corso
    @PatchMapping("/update")
    public ResponseEntity<Object> updateLesson(@AuthenticationPrincipal Student student, @RequestBody @Validated UpdateLesson body, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        try {
            String response =lessonService.updateLesson(student.getId(), body);
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }

    }
    // 3 visualizzare tutte le lezione dell'utente collegato
    @GetMapping("/getAllLesson")
    public Page<ResponseLesson> getAllLessons(
            @AuthenticationPrincipal Student student,

            @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "10") int size,
                                              @RequestParam(defaultValue = "dateTime") String sortBy) {
        return lessonService.getAllLesson(page, size, sortBy, student.getId());
    }
    // 4 cancellare una lezione collegata a una materia del corso
    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteLesson(@AuthenticationPrincipal Student student, @RequestBody @Validated DeleteLesson body, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        try {
            String response =lessonService.deleteLesson(student.getId(), body);
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    
    }
    // 5 get lesson by date
    @GetMapping("/lessons-exams")
    public ResponseEntity<Map<String, List<?>>> getLessonsAndExamsByDate(@AuthenticationPrincipal Student student, @RequestParam  String date) {
        LocalDate localDate = LocalDate.parse(date);
        List<ResponseLesson> lessons = lessonService.getLessonsByDate(localDate, student.getId());
        List<ResponseExam> exams = examService.getExamsByDate(localDate, student.getId());
        Map<String, List<?>> response = new HashMap<>();
        response.put("lessons", lessons);
        response.put("exams", exams);
        return ResponseEntity.ok(response);
    }
}
