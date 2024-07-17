package marinalucentini.Unitutor.student.controller;

import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.payload.StudentPayload;
import marinalucentini.Unitutor.student.payload.StudentUploadPasswordPayload;
import marinalucentini.Unitutor.student.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class StudentProfileController {
    @Autowired
    StudentService studentService;
    @GetMapping
    public Student getProfile(@AuthenticationPrincipal Student currentAuthenticatedUser){
        return currentAuthenticatedUser;
    }
// 1 modificare password
    @PatchMapping("/password")
    public String uploadPassword(@AuthenticationPrincipal Student currentAuthenticatedUser, @RequestBody @Validated StudentUploadPasswordPayload passwordPayload, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
       return studentService.uploadPassword(currentAuthenticatedUser.getId(), passwordPayload.password() );
    }
 // 2 immagine profilo
    // 3 modificare username
    // 4 cancellare profilo
// 5 modificare immagine profilo
    // 6 creazione student card

}
