package marinalucentini.Unitutor.community.services;

import marinalucentini.Unitutor.community.Comment;
import marinalucentini.Unitutor.community.Post;
import marinalucentini.Unitutor.community.payload.NewCommentPayload;
import marinalucentini.Unitutor.community.payload.ResponseCommentPayload;
import marinalucentini.Unitutor.community.payload.ResponsePostPayload;
import marinalucentini.Unitutor.community.payload.UpdateCommentPayload;
import marinalucentini.Unitutor.community.repositories.CommentRepository;
import marinalucentini.Unitutor.community.repositories.PostRepository;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.repositories.StudentRepository;
import marinalucentini.Unitutor.student.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    StudentService studentService;
    @Autowired
    PostRepository postRepository;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    PostService postService;
// creazione di un commento
    public String addNewComment(UUID userId, UUID postId, NewCommentPayload body){
        Student student = studentService.findById(userId);
        Post post = postService.findById(postId);
        Comment comment = new Comment(body.content());
        commentRepository.save(comment);
        comment.setStudent(student);
        comment.setPost(post);
student.getCommentList().add(comment);
post.getCommentList().add(comment);
studentRepository.save(student);
postRepository.save(post);
return "Il commento è stato correttamente salvato";
    }
    // modifica commento del post
    public String updateComment(UUID userId, UUID commentId, UpdateCommentPayload body){
        Student student = studentService.findById(userId);
        Comment comment = student.getCommentList().stream().filter(comment1 -> comment1.getId().equals(commentId))
                .findFirst().orElseThrow(()-> new NotFoundException("Il commento non è stato trovato"));
        if(body.content() != null){
            comment.setContent(body.content());
        }

        commentRepository.save(comment);
        return "Il commento è stato corremente modificato";
    }
    // cancella commento del post
    public String deleteComment(UUID userId, UUID commentId){
        Student student = studentService.findById(userId);
        Comment comment = student.getCommentList().stream().filter(comment1 -> comment1.getId().equals(commentId))
                .findFirst().orElseThrow(()-> new NotFoundException("Il commento non è stato trovato"));
        student.getCommentList().removeIf(comment1 -> comment1.getId().equals(commentId));
        for (Post post : student.getPostList()) {
            post.getCommentList().removeIf(comment1 -> comment1.getId().equals(commentId));
        }
studentRepository.save(student);
        for (Post post : student.getPostList()) {
            postRepository.save(post);
        }
        commentRepository.delete(comment);
        return "Il commento è stato correttamente cancellato";
    }
    // visualizza tutti i commenti
    public Page<ResponseCommentPayload> getPosts(UUID postId, int pageNumber, int pageSize, String sortBy) {
        if (pageSize > 100) pageSize = 100;
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Comment> comments = commentRepository.findByPostId(postId, pageable);
        return comments.map(comment -> new ResponseCommentPayload(comment.getId(),   comment.getStudent().getUsername(), comment.getContent()) );
    }

    public Comment findById(UUID id){
        return commentRepository.findById(id).orElseThrow(()-> new NotFoundException("Il commento non è stato trovato"));
    }
}
