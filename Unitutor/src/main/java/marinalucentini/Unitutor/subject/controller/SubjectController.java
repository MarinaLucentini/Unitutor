package marinalucentini.Unitutor.subject.controller;

import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.subject.payloads.NewSubjectPayload;
import marinalucentini.Unitutor.subject.payloads.UpdateSubjectPayload;
import marinalucentini.Unitutor.subject.services.SubjectService;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subjects")
public class SubjectController {
    @Autowired
    SubjectService subjectService;
    // 1 creazione della materia e associazione al corso indicato
    @PostMapping("/newSubject")
    public String createNewSubject(@AuthenticationPrincipal Student student, @RequestBody @Validated NewSubjectPayload body, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return subjectService.saveNewSubject(student.getId(), body);
    }
    // 2 modifica materia aggiungendo cfu se sbagliati e voto
@PatchMapping("/updateSubject")
    public String updateSubject(@AuthenticationPrincipal Student student, @RequestBody @Validated UpdateSubjectPayload body, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return subjectService.updateSubject(student.getId(), body);
}
    // 3 cancellazione della materia

}
