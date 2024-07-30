package marinalucentini.Unitutor.subject.controller;

import marinalucentini.Unitutor.course.payload.DeleteCoursePayload;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.subject.payloads.DeleteSubjectPayload;
import marinalucentini.Unitutor.subject.payloads.NewSubjectPayload;
import marinalucentini.Unitutor.subject.payloads.UpdateSubjectPayload;
import marinalucentini.Unitutor.subject.services.SubjectService;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/subjects")
public class SubjectController {
    @Autowired
    SubjectService subjectService;
    // 1 creazione della materia e associazione al corso indicato
    @PostMapping("/newSubject")
    public ResponseEntity<Object> createNewSubject(@AuthenticationPrincipal Student student, @RequestBody @Validated NewSubjectPayload body, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        try {
            String response = subjectService.saveNewSubject(student.getId(), body);
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    
    }
    // 2 modifica materia aggiungendo cfu se sbagliati e voto
@PatchMapping("/updateSubject")
    public ResponseEntity<Object> updateSubject(@AuthenticationPrincipal Student student, @RequestBody @Validated UpdateSubjectPayload body, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
    try {
        String response =subjectService.updateSubject(student.getId(), body);
        return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
    } catch (BadRequestException e) {
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
    }

}
    // 3 cancellazione della materia
    @DeleteMapping("/deleteSubject")
    public ResponseEntity<Object> deleteSubject(@AuthenticationPrincipal Student student, @RequestBody @Validated DeleteSubjectPayload body, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        try {
            String response =subjectService.deleteSubject(student.getId(), body);
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }

 
    }

}
