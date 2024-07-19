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
public class CourseStudentCard {
    @Id
    @GeneratedValue
    private UUID id;
    private int cfu;
    private LocalDate enrollmentDate;
    private int graduationGrade;
    private LocalDate endDate;
    @JsonIgnore
    @ManyToOne
    private StudentCard studentCard;
@ManyToMany(fetch = FetchType.EAGER)
@JoinTable(
        name = "studentCard_course",
        joinColumns = @JoinColumn(name = "studentCard_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
)
private List<Course> courseList = new ArrayList<>();
    @OneToMany(mappedBy = "course", fetch = FetchType.EAGER)
    private List<Subject> subjectList;
    public CourseStudentCard(LocalDate enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

}
