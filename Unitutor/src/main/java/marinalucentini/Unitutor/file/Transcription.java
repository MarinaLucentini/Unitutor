package marinalucentini.Unitutor.file;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.subject.Subject;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Transcription {
    @Id
    @GeneratedValue
    private UUID id;

    @JsonIgnore
    @ManyToOne
    private Subject subject;
    @Column(columnDefinition = "TEXT")
    private String text;
    private LocalDateTime timestamp;

    public Transcription(Subject subject, String text) {
        this.subject = subject;
        this.text = text;
        this.timestamp = LocalDateTime.now();
    }
}
