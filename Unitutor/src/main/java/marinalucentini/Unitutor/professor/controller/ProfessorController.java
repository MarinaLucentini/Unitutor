package marinalucentini.Unitutor.professor.controller;

import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.professor.payload.ProfessorPayload;
import marinalucentini.Unitutor.professor.payload.UpdateProfessorPayload;
import marinalucentini.Unitutor.professor.services.ProfessorService;
import marinalucentini.Unitutor.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/professor")
public class ProfessorController {
    @Autowired
    ProfessorService professorService;
    // 1 aggiungere professore alle materie
    @PostMapping("/add")
    public ResponseEntity<Object> addProfessor (@AuthenticationPrincipal Student student, @RequestBody @Validated ProfessorPayload newProfessorPayload, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        try {
            String response =professorService.newProfessor(student.getId(), newProfessorPayload);
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
       
    }
    // 2 modificare professore associato
@PatchMapping("/update")
    public String updateProfessore(@AuthenticationPrincipal Student student, @RequestBody @Validated UpdateProfessorPayload updateProfessorPayload, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return professorService.updateProfessor(student.getId(), updateProfessorPayload);
}
    //3 eliminare professore
    @DeleteMapping("/delete")
    public String deleteProfessor(@AuthenticationPrincipal Student student, @RequestBody @Validated ProfessorPayload professorPayload, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return professorService.deleteProfessor(student.getId(), professorPayload);
    }
}
