package marinalucentini.Unitutor.course;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.student.studentCard.StudentCard;
import marinalucentini.Unitutor.subject.Subject;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue
    private UUID id;
private String name;
@JsonIgnore
@ManyToMany(mappedBy = "courseList")
private List<CourseStudentCard> courseStudentCard = new ArrayList<>();

    public Course(String name) {
        this.name = name;

    }
}
