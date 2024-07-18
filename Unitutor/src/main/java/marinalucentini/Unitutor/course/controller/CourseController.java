package marinalucentini.Unitutor.course.controller;

import marinalucentini.Unitutor.course.payload.NewCoursePayload;
import marinalucentini.Unitutor.course.services.CourseService;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/course")
public class CourseController {
    @Autowired
    private CourseService courseService;
    //1 creazione del corso e associarlo al libretto
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public String createNewCourse(@AuthenticationPrincipal Student student, @RequestBody @Validated NewCoursePayload body, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return courseService.createNewCourse(body, student.getStudentCard().getId());
    }
}
