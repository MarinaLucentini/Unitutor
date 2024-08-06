package marinalucentini.Unitutor.community.controller;

import marinalucentini.Unitutor.community.Post;
import marinalucentini.Unitutor.community.payload.NewPostPayload;
import marinalucentini.Unitutor.community.payload.ResponsePostPayload;
import marinalucentini.Unitutor.community.payload.UpdatePostPayload;
import marinalucentini.Unitutor.community.services.PostService;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.UUID;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    PostService postService;
    // 3 cancella un post

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<Object> deletePost(@AuthenticationPrincipal Student student, @PathVariable UUID postId){
        System.out.println("Received request to delete post with ID: " + postId);
        try {
            String response = postService.deletePost(student.getId(), postId);
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }
    // 1 aggiungi un post
@PostMapping("/add")
    public ResponseEntity<Object> saveNewPost(@AuthenticationPrincipal Student student, @RequestBody @Validated NewPostPayload body, BindingResult bindingResult){
    if(bindingResult.hasErrors()){
        throw new BadRequestException(bindingResult.getAllErrors());
    }
    try {
        String response = postService.createPost(student.getId(), body);
        return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
    } catch (BadRequestException e) {
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
    }

}
    // 2 modifica un post
    @PatchMapping("/update")
    public ResponseEntity<Object> updatePost(@AuthenticationPrincipal Student student, @RequestBody @Validated UpdatePostPayload body, BindingResult bindingResult){
    if(bindingResult.hasErrors()){
        throw new BadRequestException(bindingResult.getAllErrors());
    }
        try {
            String response = postService.updatePost(student.getId(), body);
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }

    }

    // 4 visualizza tutti i post
    @GetMapping("/allPost")
    public Page<ResponsePostPayload> getAllPosts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
        return postService.getPosts(page, size, sortBy);
    }
}
