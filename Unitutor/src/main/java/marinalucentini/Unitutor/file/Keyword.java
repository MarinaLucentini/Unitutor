package marinalucentini.Unitutor.file;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Keyword {
    @Id
    @GeneratedValue
    private UUID id;
    @JsonIgnore
    @ManyToOne
    private Transcription transcription;

    private String keyword;

    public Keyword(Transcription transcription, String keyword) {
        this.transcription = transcription;
        this.keyword = keyword;
    }
}
