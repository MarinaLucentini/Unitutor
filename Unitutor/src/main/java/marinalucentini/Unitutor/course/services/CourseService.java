package marinalucentini.Unitutor.course.services;

import marinalucentini.Unitutor.course.Course;
import marinalucentini.Unitutor.course.payload.NewCoursePayload;
import marinalucentini.Unitutor.course.repositories.CourseRepository;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.studentCard.StudentCard;
import marinalucentini.Unitutor.student.studentCard.services.StudentCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    Course existingCourse;
    try {
        existingCourse = findByName(coursePayload.name());
    } catch (NotFoundException e) {
        existingCourse = null;
    }

    if (existingCourse != null) {

        boolean courseExist = studentCard.getCourseList().stream()
                .anyMatch(course -> course.getName().equalsIgnoreCase(coursePayload.name()));

        if (!courseExist) {

            existingCourse.getStudentCard().add(studentCard);
            studentCard.getCourseList().add(existingCourse);
            courseRepository.save(existingCourse);

            return "Il corso " + coursePayload.name() + " esiste già nel db ed è stato associato allo studente " + studentCard.getStudent().getUsername();
        } else {
            throw new BadRequestException("Il corso " + coursePayload.name() + " è già stato associato allo studente");
        }
    } else {
        Course newCourse = new Course(coursePayload.name(),
                coursePayload.cfu() != 0 ? coursePayload.cfu() : 0,
                coursePayload.dateEnrollment());
        if(coursePayload.register() != null){
            studentCard.setRegister(coursePayload.register());
        }

        List<StudentCard> studentCards = new ArrayList<>();
        newCourse.setStudentCard(studentCards);
        newCourse.getStudentCard().add(studentCard);
        studentCard.getCourseList().add(newCourse);
        courseRepository.save(newCourse);

        return "Il corso " + coursePayload.name() + " è stato correttamente inserito nel db e associato allo studente " + studentCard.getStudent().getUsername();
    }
}

public Course findByName(String name){
    return courseRepository.findByName(name).orElseThrow(()-> new NotFoundException("Il corso " + name + " non è stato trovato nel db"));
}
    //2 cencellazione del corso dal libretto e dal db
public String findAndDelete(String name, UUID id){
    StudentCard studentCard = studentCardService.findById(id);
    Course course = findByName(name);
    boolean courseExistsInStudentCard = studentCard.getCourseList().stream()
            .anyMatch(course1 -> course1.getName().equalsIgnoreCase(name));
String response = "";
    if (courseExistsInStudentCard) {
        studentCard.getCourseList().remove(course);
        course.getStudentCard().remove(studentCard);
        if (course.getStudentCard().isEmpty()) {
            courseRepository.delete(course);
         response = "Il corso " + name + " è stato rimosso dalla lista dei corsi dello studente e dal database";
        }
        studentCardService.save(studentCard);
        response = "Il corso " + name + " è stato rimosso dalla lista dei corsi dello studente";
        return response;
    } else {
        throw new NotFoundException("Il corso " + name + " non è associato a questo studente.");
    }
}
// 3 visualizzazione di tutti i corsi
public Page<Course> getCourses(int pageNumber, int pageSize, String sortBy) {
    if (pageSize > 100) pageSize = 100;
    Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
    return courseRepository.findAll(pageable);
}


}
