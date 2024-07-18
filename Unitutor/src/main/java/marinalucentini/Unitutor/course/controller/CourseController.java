package marinalucentini.Unitutor.course.controller;

import marinalucentini.Unitutor.course.Course;
import marinalucentini.Unitutor.course.payload.DeleteCoursePayload;
import marinalucentini.Unitutor.course.payload.NewCoursePayload;
import marinalucentini.Unitutor.course.payload.UploadCoursePayload;
import marinalucentini.Unitutor.course.services.CourseService;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.student.Student;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
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
    // 2 cancellazione del corso dalla lista
@DeleteMapping("/delete")
    public String deleteCourse(@AuthenticationPrincipal Student student, @RequestBody @Validated DeleteCoursePayload body, BindingResult bindingResult){

        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return courseService.findAndDelete(body.name(), student.getStudentCard().getId());
}
    //3 modifica dei cfu, data di iscrizione
    @PutMapping("/update")
    public String updateCourse(@AuthenticationPrincipal Student student, @RequestBody @Validated UploadCoursePayload body, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw  new BadRequestException(bindingResult.getAllErrors());
        }
        return courseService.findAndUpdate(body, student.getStudentCard().getId());
    }






}
