package marinalucentini.Unitutor.student.controller;

import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.student.Student;

import marinalucentini.Unitutor.student.payload.StudentResponse;
import marinalucentini.Unitutor.student.payload.StudentUploadPasswordPayload;
import marinalucentini.Unitutor.student.payload.StudentUploadPayload;
import marinalucentini.Unitutor.student.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;

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
    // aggiungo endpoint con e-mail
 // 2 aggiungere e modificare immagine profilo
@PatchMapping("/avatar")
    public ResponseEntity<Object> uploadImage(@AuthenticationPrincipal Student currentAuthenticatedUser, @RequestParam("avatar") MultipartFile image) throws IOException{

    try {
        String response = studentService.uploadImage(currentAuthenticatedUser.getId(), image);
        return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
    } catch (BadRequestException e) {
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
    }

}
    // 3 modificare username
    @PatchMapping("/update")
    public ResponseEntity<Object> uploadUsername(@AuthenticationPrincipal Student currentAutheticatedUser, @RequestBody @Validated StudentUploadPayload studentUploadUsernamePayload, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        try {
            String response = studentService.uploadProfile(currentAutheticatedUser.getId(), studentUploadUsernamePayload);
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }

    }


    // 4 cancellare profilo
@DeleteMapping("/delete")
    public ResponseEntity<Object> deleteUser(@AuthenticationPrincipal Student student){
    try {
        String response = studentService.findByIdAndDelete(student.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
    } catch (BadRequestException e) {
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
    }

}




}
