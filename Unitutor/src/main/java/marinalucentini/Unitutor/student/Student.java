package marinalucentini.Unitutor.student;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
}
