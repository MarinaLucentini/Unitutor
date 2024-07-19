package marinalucentini.Unitutor.course.repositories;

import marinalucentini.Unitutor.course.CourseStudentCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CourseStudentCardRepository extends JpaRepository<CourseStudentCard, UUID> {
}
