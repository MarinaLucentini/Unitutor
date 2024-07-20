package marinalucentini.Unitutor.exam;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.subject.Subject;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Exam {
    @Id
    @GeneratedValue
    private UUID id;
private LocalDateTime dateTime;
private boolean pass;
private int grade;
    @JsonIgnore
    @ManyToOne
    private Subject subject;

    public Exam(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}
