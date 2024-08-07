package marinalucentini.Unitutor.subject;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.course.Course;
import marinalucentini.Unitutor.course.CourseStudentCard;
import marinalucentini.Unitutor.exam.Exam;
import marinalucentini.Unitutor.file.File;

import marinalucentini.Unitutor.file.Transcription;
import marinalucentini.Unitutor.lesson.Lesson;
import marinalucentini.Unitutor.professor.Professor;


import java.util.ArrayList;
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
    @JsonIgnore
    @ManyToOne
    private CourseStudentCard course;
    @ManyToMany(mappedBy = "subjectList", fetch = FetchType.EAGER)
    private List<Professor> professorList = new ArrayList<>();
    @OneToMany (mappedBy = "subject", fetch = FetchType.EAGER)
    private List<Exam> examList = new ArrayList<>();
    @OneToMany (mappedBy = "subject", fetch = FetchType.EAGER)
    private List<File> fileList = new ArrayList<>();
    @OneToMany (mappedBy = "subject", fetch = FetchType.EAGER)
    private List<Lesson> lessonList = new ArrayList<>();
    @OneToMany (mappedBy = "subject", fetch = FetchType.EAGER)
    private List<Transcription> transcriptions = new ArrayList<>();

    public Subject(String name) {
        this.name = name;
    }
}
