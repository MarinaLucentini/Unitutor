package marinalucentini.Unitutor.student;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.community.Comment;
import marinalucentini.Unitutor.community.Post;
import marinalucentini.Unitutor.course.StudentCourse;
import marinalucentini.Unitutor.role.Role;
import marinalucentini.Unitutor.student.studentCard.StudentCard;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Student {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String surname;
    private String username;
    private String email;
    private String password;
private LocalDate dateOfBirth;
private String urlAvatar;
@ManyToMany
@JoinTable(name = "role_student",
        joinColumns = @JoinColumn(name = "student_id", nullable = false),
        inverseJoinColumns = @JoinColumn(name = "role_id", nullable = false)
)
private List<Role> roles;
@OneToOne
    private StudentCard studentCard;
@OneToMany (mappedBy = "student")
    private List<StudentCourse> studentCourseList;
@OneToMany (mappedBy = "student")
    private List<Post> postList;
@OneToMany (mappedBy = "student")
    private List<Comment> commentList;

    public Student(String name, String surname, String username, String email, String password, LocalDate dateOfBirth) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
    }
}
