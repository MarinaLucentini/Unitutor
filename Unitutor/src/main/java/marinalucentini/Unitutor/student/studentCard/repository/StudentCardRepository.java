package marinalucentini.Unitutor.student.studentCard.repository;

import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.studentCard.StudentCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StudentCardRepository extends JpaRepository<StudentCard, UUID> {
}
