package marinalucentini.Unitutor.exam.controller;

import marinalucentini.Unitutor.exam.payload.DeleteExam;
import marinalucentini.Unitutor.exam.payload.ExamPayload;
import marinalucentini.Unitutor.exam.payload.ResponseExam;
import marinalucentini.Unitutor.exam.payload.UpdateExam;
import marinalucentini.Unitutor.exam.service.ExamService;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.lesson.payload.ResponseLesson;
import marinalucentini.Unitutor.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exam")
public class ExamController {
    @Autowired
    ExamService examService;
    //1 salvataggio nuovo esame
    @PostMapping("/add")
    public String saveExam(@AuthenticationPrincipal Student student, @RequestBody @Validated ExamPayload body, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return examService.saveExam(student.getId(), body);
    }
    // 2 modifica esame
    @PatchMapping("/update")
    public String updateExam(@AuthenticationPrincipal Student student, @RequestBody @Validated UpdateExam body, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return examService.updateExam(student.getId(), body);
    }
    // 3 cancellazione esame
    @DeleteMapping("/delete")
    public String deleteExam(@AuthenticationPrincipal Student student, @RequestBody @Validated DeleteExam body, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return examService.deleteExam(student.getId(), body);
    }
    // 4 visualizza tutti gli esami dell'utente
    @GetMapping("/getAllExam")
    public Page<ResponseExam> getAllLessons(
            @AuthenticationPrincipal Student student,

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "dateTime") String sortBy) {
        return examService.getAllExam(page, size, sortBy, student.getId());
    }
}
