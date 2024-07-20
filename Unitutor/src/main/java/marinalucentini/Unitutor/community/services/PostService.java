package marinalucentini.Unitutor.community.services;

import marinalucentini.Unitutor.community.Post;
import marinalucentini.Unitutor.community.payload.NewPostPayload;
import marinalucentini.Unitutor.community.payload.ResponsePostPayload;
import marinalucentini.Unitutor.community.payload.UpdatePostPayload;
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

import java.time.LocalDate;
import java.util.UUID;

@Service
public class PostService {
    @Autowired
    PostRepository postRepository;
    @Autowired
    StudentService studentService;
    @Autowired
    StudentRepository studentRepository;
    // creazione di un post
    public String createPost(UUID id, NewPostPayload body){
        Student student = studentService.findById(id);
        Post post = new Post(body.title(), body.content(), LocalDate.now());
        postRepository.save(post);
        post.setStudent(student);
        student.getPostList().add(post);
        studentRepository.save(student);
        return "Il post è stato aggiunto correttamente";
    }
    // modifica post
    public String updatePost(UUID id, UpdatePostPayload body){
        Student student = studentService.findById(id);
        Post post = student.getPostList().stream()
                .filter(post1 -> post1.getId().equals(body.postId())).findFirst()
                .orElseThrow(()-> new NotFoundException("Il post non è stato trovato"));
        if(body.title() != null){
            post.setTitle(body.title());
        }
        if(body.content() != null){
            post.setContent(body.content());
        }
        postRepository.save(post);
        return "Il post è stato correttamente modificato";

    }
    // cancella post
    public String deletePost(UUID userid, UUID postId ){
        Student student = studentService.findById(userid);
        Post post = findById(postId);
        student.getPostList().removeIf(post1 -> post1.getId().equals(postId));
        postRepository.delete(post);
        studentRepository.save(student);
        return "Il post è stato correttamente eliminato";
    }
    // visualizza tutti i post
    public Page<ResponsePostPayload> getPosts(int pageNumber, int pageSize, String sortBy) {
        if (pageSize > 100) pageSize = 100;
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Post> posts = postRepository.findAll(pageable);
        return posts.map(post -> new ResponsePostPayload(post.getId(),   post.getCommentList(), post.getTitle(), post.getContent(), post.getStudent().getUsername()) );
    }
    public Post findById(UUID id){
        return postRepository.findById(id).orElseThrow(()-> new NotFoundException("Il post non è stato trovato"));
    }
}
