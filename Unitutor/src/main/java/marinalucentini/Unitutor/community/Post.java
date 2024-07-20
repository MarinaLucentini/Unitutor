package marinalucentini.Unitutor.community;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.student.Student;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue
    private UUID id;
    private String title;

    private String content;
    private LocalDate insertionDate;
    @ManyToOne
    private Student student;
    @OneToMany (mappedBy = "post", fetch = FetchType.EAGER)
    private List<Comment> commentList;

    public Post(String title, String content, LocalDate insertionDate) {
        this.title = title;
        this.content = content;
        this.insertionDate = insertionDate;
    }
}
