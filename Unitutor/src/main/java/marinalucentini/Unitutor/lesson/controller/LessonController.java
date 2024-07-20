package marinalucentini.Unitutor.lesson.controller;

import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.lesson.payload.LessonPayload;
import marinalucentini.Unitutor.lesson.service.LessonService;
import marinalucentini.Unitutor.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lessons")
public class LessonController {
    @Autowired
    LessonService lessonService;
    // 1 salvare la lezione associata a una materia del corso
    @PostMapping("/add")
    public String saveNewLesson(@AuthenticationPrincipal Student student, @RequestBody @Validated LessonPayload body, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return lessonService.saveLesson(student.getId(), body);
    }
    // 2 modifica una lezione collegata a una materia del corso
    // 3 visualizzare tutte le lezione collegate a una materia del corso
    // 4 cancellare una lezione collegata a una materia del corso
}
