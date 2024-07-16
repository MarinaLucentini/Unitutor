package marinalucentini.Unitutor.course;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.student.Student;

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
    private int enrollmentYear;
    private int graduationGrade;
    @ManyToOne
    private Course course;
    @ManyToOne
    private Student student;
}
