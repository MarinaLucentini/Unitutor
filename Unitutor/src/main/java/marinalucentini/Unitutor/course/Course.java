package marinalucentini.Unitutor.course;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.student.studentCard.StudentCard;
import marinalucentini.Unitutor.subject.Subject;

import java.time.LocalDate;
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
    private int cfu;
    private LocalDate enrollmentDate;
    private int graduationGrade;
    private LocalDate endDate;


@JsonIgnore
@ManyToMany(mappedBy = "courseList")
    private List<StudentCard> studentCard;

@OneToMany (mappedBy = "course", fetch =FetchType.EAGER)
    private List<Subject> subjectList;

    public Course(String name, int cfu, LocalDate enrollmentDate) {
        this.name = name;
        this.cfu = cfu;
        this.enrollmentDate = enrollmentDate;
    }
}
