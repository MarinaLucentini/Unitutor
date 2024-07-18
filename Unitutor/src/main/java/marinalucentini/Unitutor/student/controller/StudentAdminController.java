package marinalucentini.Unitutor.student.controller;

import marinalucentini.Unitutor.course.Course;
import marinalucentini.Unitutor.course.services.CourseService;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/admin")
public class StudentAdminController {
    @Autowired
   private StudentService studentService;
    @Autowired
    private CourseService courseService;
    // 1 cancella profilo in base all'id
    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteProfile(@PathVariable UUID userId){
return studentService.findByIdAndDelete(userId);
    }
    // 2 visualizzazione di tutti gli studenti iscritti all'app
    @GetMapping("/allStudents")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<Student> getAllUsers(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
        return studentService.getUsers(page, size, sortBy);
    }
    @GetMapping("/allCourses")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<Course> getAllCourses(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
        return courseService.getCourses(page, size, sortBy);
    }
}
