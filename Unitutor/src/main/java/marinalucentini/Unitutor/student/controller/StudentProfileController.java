package marinalucentini.Unitutor.student.controller;

import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.student.Student;

import marinalucentini.Unitutor.student.payload.StudentResponse;
import marinalucentini.Unitutor.student.payload.StudentUploadPasswordPayload;
import marinalucentini.Unitutor.student.payload.StudentUploadUsernamePayload;
import marinalucentini.Unitutor.student.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/profile")
public class StudentProfileController {
    @Autowired
   private StudentService studentService;
    @GetMapping
    public StudentResponse getProfile(@AuthenticationPrincipal Student currentAuthenticatedUser){

        return   new StudentResponse(currentAuthenticatedUser.getName(), currentAuthenticatedUser.getSurname(), currentAuthenticatedUser.getUsername(), currentAuthenticatedUser.getEmail(), currentAuthenticatedUser.getDateOfBirth(), currentAuthenticatedUser.getUrlAvatar(), currentAuthenticatedUser.getRoles(), currentAuthenticatedUser.getStudentCard());
    }
// 1 modificare password
    @PatchMapping("/password")
    public String uploadPassword(@AuthenticationPrincipal Student currentAuthenticatedUser, @RequestBody @Validated StudentUploadPasswordPayload passwordPayload, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
       return studentService.uploadPassword(currentAuthenticatedUser.getId(), passwordPayload.password() );
    }
 // 2 aggiungere e modificare immagine profilo
@PatchMapping("/avatar")
    public String uploadImage(@AuthenticationPrincipal Student currentAuthenticatedUser, @RequestParam("avatar") MultipartFile image) throws IOException{
        return studentService.uploadImage(currentAuthenticatedUser.getId(), image);
}
    // 3 modificare username
    @PatchMapping("/username")
    public String uploadUsername(@AuthenticationPrincipal Student currentAutheticatedUser, @RequestBody @Validated StudentUploadUsernamePayload studentUploadUsernamePayload, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return studentService.uploadUsername(currentAutheticatedUser.getId(), studentUploadUsernamePayload.username());
    }
    // 4 cancellare profilo
@DeleteMapping
    public String deleteUser(@AuthenticationPrincipal Student student){
        return studentService.findByIdAndDelete(student.getId());
}




}
