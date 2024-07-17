package marinalucentini.Unitutor.student.controller;

import marinalucentini.Unitutor.student.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/admin")
public class StudentAdminController {
    @Autowired
   private StudentService studentService;
    //cancella profilo in base all'id
    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteProfile(@PathVariable UUID userId){
return studentService.findByIdAndDelete(userId);
    }
}
