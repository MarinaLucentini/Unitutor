package marinalucentini.Unitutor.community.controller;

import marinalucentini.Unitutor.community.payload.NewCommentPayload;
import marinalucentini.Unitutor.community.payload.UpdateCommentPayload;
import marinalucentini.Unitutor.community.services.CommentService;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/comments")
public class CommentController {
    @Autowired
    CommentService commentService;
    // 1 aggiungere un commento a un post
@PostMapping("/add/{postId}")
    public String createComment(@PathVariable UUID postId, @AuthenticationPrincipal Student student, @RequestBody @Validated NewCommentPayload body, BindingResult bindingResult){
    if(bindingResult.hasErrors()){
        throw new BadRequestException(bindingResult.getAllErrors());
    }
    return commentService.addNewComment(student.getId(), postId, body);
}
    // 2 modificare il commento del post
    @PatchMapping("/update/{commentId}")
    public String updateComment(@AuthenticationPrincipal Student student, @PathVariable UUID commentId, @RequestBody @Validated UpdateCommentPayload body, BindingResult bindingResult){
    if(bindingResult.hasErrors()){
        throw new BadRequestException(bindingResult.getAllErrors());
    }
    return commentService.updateComment(student.getId(), commentId, body);
    }
    // 3 cancellare il commento
    @DeleteMapping("/delete/{commentId}")
    public String deleteComment(@AuthenticationPrincipal Student student, @PathVariable UUID commentId){
    return commentService.deleteComment(student.getId(), commentId);
    }
    // 4 visualizzare i commenti del post?

}
