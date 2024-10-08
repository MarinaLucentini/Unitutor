package marinalucentini.Unitutor.role;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.student.Student;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue
private UUID id;
    private String name;
    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private List<Student> studentsList;

    public Role(String name) {
        this.name = name;
    }
}
