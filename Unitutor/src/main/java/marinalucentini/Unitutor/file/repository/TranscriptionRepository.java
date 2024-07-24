package marinalucentini.Unitutor.file.repository;

import marinalucentini.Unitutor.file.Transcription;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface TranscriptionRepository extends JpaRepository<Transcription, UUID> {
    Page<Transcription> findBySubjectId(UUID subjectId, Pageable pageable);
 //   Page<Transcription> findBySubjectIdTimestampBetween(UUID subjectId, LocalDateTime fromDate, LocalDateTime toDate, Pageable pageable);
}
