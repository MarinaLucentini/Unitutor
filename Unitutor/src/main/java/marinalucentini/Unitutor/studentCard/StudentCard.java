package marinalucentini.Unitutor.studentCard;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StudentCard {
    @Id
    @GeneratedValue
    private UUID id;
private String register;

}
