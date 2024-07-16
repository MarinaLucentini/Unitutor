package marinalucentini.Unitutor.professor;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.subject.Subject;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Professor {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String surname;
    @ManyToMany
    @JoinTable(name = "professor_subject",
            joinColumns = @JoinColumn(name = "professor_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "subject_id", nullable = false)
    )
    private List<Subject> subjectList;
}