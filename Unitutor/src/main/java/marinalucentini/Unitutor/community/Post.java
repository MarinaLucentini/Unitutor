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
    private String content;
    private LocalDate insertionDate;
    @ManyToOne
    private Student student;
    @OneToMany (mappedBy = "post")
    private List<Comment> commentList;
}
