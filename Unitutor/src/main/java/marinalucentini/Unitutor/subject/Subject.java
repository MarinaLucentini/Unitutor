package marinalucentini.Unitutor.subject;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.course.Course;
import marinalucentini.Unitutor.exam.Exam;
import marinalucentini.Unitutor.file.File;
import marinalucentini.Unitutor.lesson.Lesson;
import marinalucentini.Unitutor.professor.Professor;
import marinalucentini.Unitutor.student.Student;

import java.util.List;
import java.util.SimpleTimeZone;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Subject {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private int subjectGrade;
    private int cfu;
    @ManyToOne
    private Course course;
    @ManyToMany(mappedBy = "subjectList")
    private List<Professor> professorList;
    @OneToMany (mappedBy = "subject")
    private List<Exam> examList;
    @OneToMany (mappedBy = "subject")
    private List<File> fileList;
    @OneToMany (mappedBy = "subject")
    private List<Lesson> lessonList;
}
