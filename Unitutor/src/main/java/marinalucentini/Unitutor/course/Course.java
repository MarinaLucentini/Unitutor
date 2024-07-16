package marinalucentini.Unitutor.course;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.student.studentCard.StudentCard;
import marinalucentini.Unitutor.subject.Subject;

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
@ManyToOne
    private StudentCard studentCard;
@OneToMany (mappedBy = "course")
    private List<StudentCourse> studentCourseList;
@OneToMany (mappedBy = "course")
    private List<Subject> subjectList;

}
