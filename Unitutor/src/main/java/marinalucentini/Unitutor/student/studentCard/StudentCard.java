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
private String register;
@OneToOne
@JsonIgnore
    private Student student;
@OneToMany (mappedBy = "studentCard", fetch = FetchType.EAGER)
    private List<Course> courseList;

}
