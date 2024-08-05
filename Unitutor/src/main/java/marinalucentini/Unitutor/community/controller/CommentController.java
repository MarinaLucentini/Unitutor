package marinalucentini.Unitutor.community.controller;

import marinalucentini.Unitutor.community.payload.NewCommentPayload;
import marinalucentini.Unitutor.community.payload.UpdateCommentPayload;
import marinalucentini.Unitutor.community.services.CommentService;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.UUID;

@RestController
@RequestMapping("/comments")
public class CommentController {
    @Autowired
    CommentService commentService;
    // 1 aggiungere un commento a un post
@PostMapping("/add/{postId}")
    public ResponseEntity<Object> createComment(@PathVariable UUID postId, @AuthenticationPrincipal Student student, @RequestBody @Validated NewCommentPayload body, BindingResult bindingResult){
    if(bindingResult.hasErrors()){
        throw new BadRequestException(bindingResult.getAllErrors());
    }
    try {
        String response =  commentService.addNewComment(student.getId(), postId, body);
        return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
    } catch (BadRequestException e) {
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
    }


}
    // 2 modificare il commento del post
    @PatchMapping("/update/{commentId}")
    public ResponseEntity<Object> updateComment(@AuthenticationPrincipal Student student, @PathVariable UUID commentId, @RequestBody @Validated UpdateCommentPayload body, BindingResult bindingResult){
    if(bindingResult.hasErrors()){
        throw new BadRequestException(bindingResult.getAllErrors());
    }
        try {
            String response = commentService.updateComment(student.getId(), commentId, body);
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }


    }
    // 3 cancellare il commento
    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<Object> deleteComment(@AuthenticationPrincipal Student student, @PathVariable UUID commentId){
        try {
            String response =commentService.deleteComment(student.getId(), commentId);
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }

    }


}
