package marinalucentini.Unitutor.course;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.student.Student;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StudentCourse {
    @Id
    @GeneratedValue
    private UUID id;
    private int cfu;
    private LocalDate enrollmentDate;
    private int graduationGrade;
    @JsonIgnore
    @ManyToOne
    private Course course;
    @JsonIgnore
    @ManyToOne
    private Student student;

    public StudentCourse(int cfu, LocalDate enrollmentDate, int graduationGrade) {
        this.cfu = cfu;
        this.enrollmentDate = enrollmentDate;
        this.graduationGrade = graduationGrade;
    }
}
