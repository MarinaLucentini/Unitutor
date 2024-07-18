package marinalucentini.Unitutor.course.repositories;

import marinalucentini.Unitutor.course.StudentCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StudentCourseRepository extends JpaRepository<StudentCourse, UUID> {
}
