package marinalucentini.Unitutor.student.controller;

import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.student.payload.StudentLogin;
import marinalucentini.Unitutor.student.payload.StudentLoginResponse;
import marinalucentini.Unitutor.student.payload.StudentPayload;
import marinalucentini.Unitutor.student.services.AuthorizationService;
import marinalucentini.Unitutor.student.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    StudentService studentService;
    @Autowired
    AuthorizationService authorizationService;
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String studentResponseDto  (@RequestBody @Validated StudentPayload studentDTO, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return studentService.saveStudent(studentDTO);
    }
    @PostMapping("/login")
    public StudentLoginResponse login(@RequestBody @Validated StudentLogin payload, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return new StudentLoginResponse(authorizationService.authenticateUserAndGenerateToken(payload));
    }
}
