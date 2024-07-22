package marinalucentini.Unitutor.file.repository;

import marinalucentini.Unitutor.file.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FileRepository extends JpaRepository<File, UUID> {
}
