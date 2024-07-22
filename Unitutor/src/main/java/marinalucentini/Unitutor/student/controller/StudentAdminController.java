package marinalucentini.Unitutor.student.controller;

import marinalucentini.Unitutor.community.Post;
import marinalucentini.Unitutor.community.payload.ResponseCommentPayload;
import marinalucentini.Unitutor.community.payload.ResponsePostPayload;
import marinalucentini.Unitutor.community.services.CommentService;
import marinalucentini.Unitutor.community.services.PostService;
import marinalucentini.Unitutor.course.Course;
import marinalucentini.Unitutor.course.payload.ResponseCoursePayload;
import marinalucentini.Unitutor.course.services.CourseService;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.payload.StudentCardUpdatePayload;
import marinalucentini.Unitutor.student.services.StudentService;
import marinalucentini.Unitutor.student.studentCard.services.StudentCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class StudentAdminController {
    @Autowired
   private StudentService studentService;
    @Autowired
    private CourseService courseService;
@Autowired
private PostService postService;
@Autowired
private CommentService commentService;
    // 1 cancella profilo in base all'id
    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteProfile(@PathVariable UUID userId){
return studentService.findByIdAndDelete(userId);
    }
    // 2 visualizzazione di tutti gli studenti iscritti all'app
    @GetMapping("/allStudents")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<Student> getAllUsers(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
        return studentService.getUsers(page, size, sortBy);
    }
    @GetMapping("/allCourses")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<ResponseCoursePayload> getAllCourses(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
        return courseService.getCourses(page, size, sortBy);
    }
    //3 modifica della matricola o del codice dello studente
    @PatchMapping("/{userId}/register")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String updateRegister(@PathVariable UUID userId, @RequestBody @Validated StudentCardUpdatePayload body, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return studentService.uploadRegister(userId, body.newRecord());

    }
    //4 visualizza un post tramite id
    @GetMapping("/{postId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponsePostPayload getPost(@PathVariable UUID postId){
        Post post = postService.findById(postId);
        List<ResponseCommentPayload> comments = post.getCommentList().stream()
                .map(comment -> new ResponseCommentPayload(
                        comment.getId(),
                        comment.getStudent().getUsername(),
                        comment.getContent()
                ))
                .collect(Collectors.toList());

        return new ResponsePostPayload(
                post.getId(),
                comments,
                post.getTitle(),
                post.getContent(),
                post.getStudent().getUsername()
        );
    }
    //5 cancella post tramite id
    @DeleteMapping("/{postId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deletePost(@PathVariable UUID postId){
        return postService.findByIdAndDelete(postId);
    }
    // 6 cancella commento tramite id
    @DeleteMapping("/{userId}/{commentId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteComment(@PathVariable UUID userId, @PathVariable UUID commentId){
        return commentService.deleteComment(userId, commentId);
    }
}
