package marinalucentini.Unitutor.student.controller;

import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.student.payload.StudentPayload;
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
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String studentResponseDto  (@RequestBody @Validated StudentPayload studentDTO, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        String response = studentService.saveStudent(studentDTO);

        return response;
    }
}
