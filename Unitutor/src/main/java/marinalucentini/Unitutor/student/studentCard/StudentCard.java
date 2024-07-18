package marinalucentini.Unitutor.student.studentCard;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.course.Course;
import marinalucentini.Unitutor.student.Student;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StudentCard {
    @Id
    @GeneratedValue
    private UUID id;
@OneToOne
@JsonIgnore
    private Student student;
private String register;
@ManyToMany ( fetch = FetchType.EAGER)
@JoinTable(name = "studentCard_course",
        joinColumns = @JoinColumn(name = "studentCard_id", nullable = false),
        inverseJoinColumns = @JoinColumn(name = "course_id", nullable = false)
)
    private List<Course> courseList;

}
