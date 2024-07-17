package marinalucentini.Unitutor.student.controller;

import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
public class StudentProfileController {
    @Autowired
    StudentService studentService;
    @GetMapping("/me")
    public Student getProfile(@AuthenticationPrincipal Student currentAuthenticatedUser){
        return currentAuthenticatedUser;
    }
// 1 modificare password
 // 2 immagine profilo
    // 3 modificare username
    // 4 cancellare profilo
// 5 modificare immagine profilo
    // 6 creazione student card

}
