package marinalucentini.Unitutor.exam.repository;

import marinalucentini.Unitutor.exam.Exam;
import marinalucentini.Unitutor.lesson.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface ExamRepository extends JpaRepository<Exam, UUID> {

}
