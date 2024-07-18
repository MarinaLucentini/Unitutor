package marinalucentini.Unitutor.course.services;

import marinalucentini.Unitutor.course.Course;
import marinalucentini.Unitutor.course.payload.NewCoursePayload;
import marinalucentini.Unitutor.course.repositories.CourseRepository;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.student.studentCard.StudentCard;
import marinalucentini.Unitutor.student.studentCard.services.StudentCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CourseService {
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    StudentCardService studentCardService;
// 1.1 creazione del corso ed associarlo al libretto
    public String createNewCourse(NewCoursePayload coursePayload, UUID id) {

        StudentCard studentCard = studentCardService.findById(id);
        boolean courseExist = studentCard.getCourseList().stream().anyMatch(course-> course.getName().equalsIgnoreCase(coursePayload.name()));
        if (courseExist) {
          throw new BadRequestException("Il corso " + coursePayload.name() + " è già stato associato allo studente");
        }
        Course newCourse = new Course(coursePayload.name(),coursePayload.cfu() != 0 ? coursePayload.cfu() : 0, coursePayload.dateEnrollment());
        List<StudentCard> studentCards = new ArrayList<>();
        newCourse.setStudentCard(studentCards);
newCourse.getStudentCard().add(studentCard);
        studentCard.getCourseList().add(newCourse);
        courseRepository.save(newCourse);
        return "Il corso " + coursePayload.name() + " è stato correttamente inserito nel db e associato allo studente " + studentCard.getStudent().getUsername();

    }

}
