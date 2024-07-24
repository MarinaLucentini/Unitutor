package marinalucentini.Unitutor.file.repository;

import marinalucentini.Unitutor.file.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, UUID> {
}
