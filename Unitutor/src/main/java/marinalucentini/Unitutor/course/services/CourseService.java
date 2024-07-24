package marinalucentini.Unitutor.course.services;

import marinalucentini.Unitutor.course.Course;
import marinalucentini.Unitutor.course.CourseStudentCard;
import marinalucentini.Unitutor.course.payload.NewCoursePayload;
import marinalucentini.Unitutor.course.payload.ResponseCoursePayload;
import marinalucentini.Unitutor.course.payload.UploadCoursePayload;
import marinalucentini.Unitutor.course.repositories.CourseRepository;
import marinalucentini.Unitutor.course.repositories.CourseStudentCardRepository;
import marinalucentini.Unitutor.exam.Exam;
import marinalucentini.Unitutor.exam.repository.ExamRepository;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.file.File;
import marinalucentini.Unitutor.file.Transcription;
import marinalucentini.Unitutor.file.repository.FileRepository;
import marinalucentini.Unitutor.file.repository.TranscriptionRepository;
import marinalucentini.Unitutor.lesson.Lesson;
import marinalucentini.Unitutor.lesson.repository.LessonRepository;
import marinalucentini.Unitutor.professor.Professor;
import marinalucentini.Unitutor.professor.repositories.ProfessorRepository;

import marinalucentini.Unitutor.student.studentCard.StudentCard;
import marinalucentini.Unitutor.student.studentCard.services.StudentCardService;
import marinalucentini.Unitutor.subject.Subject;
import marinalucentini.Unitutor.subject.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
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
    @Autowired
    CourseStudentCardRepository courseStudentCardRepository;
    @Autowired
    ProfessorRepository professorRepository;
    @Autowired
    ExamRepository examRepository;
    @Autowired
    LessonRepository lessonRepository;
    @Autowired
    FileRepository fileRepository;
    @Autowired
    SubjectRepository subjectRepository;
    @Autowired
    TranscriptionRepository transcriptionRepository;
// 1.1 creazione del corso ed associarlo al libretto
public String createNewCourse(NewCoursePayload coursePayload, UUID id) {
    StudentCard studentCard = studentCardService.findById(id);
    Course existingCourse = courseRepository.findByName(coursePayload.name()).orElse(null);

    if (existingCourse != null) {

        boolean courseExist = studentCard.getCourseStudentCards().stream()
                .anyMatch(courseStudentCard -> courseStudentCard.getCourseList().stream()
                        .anyMatch(course -> course.getName().equalsIgnoreCase(coursePayload.name())));

        if (!courseExist) {

            Optional<CourseStudentCard> existingCourseStudentCardOpt = studentCard.getCourseStudentCards().stream()
                    .filter(courseStudentCard -> courseStudentCard.getCourseList().stream()
                            .anyMatch(course -> course.getName().equalsIgnoreCase(coursePayload.name())))
                    .findFirst();

            CourseStudentCard newCourseStudentCard;

            if (existingCourseStudentCardOpt.isPresent()) {
                newCourseStudentCard = existingCourseStudentCardOpt.get();
            } else {
                newCourseStudentCard = new CourseStudentCard(coursePayload.dateEnrollment());
                if (coursePayload.cfu() != 0) {
                    newCourseStudentCard.setCfu(coursePayload.cfu());
                }
                if (coursePayload.register() != null) {
                    studentCard.setRegister(coursePayload.register());
                }
                newCourseStudentCard.setStudentCard(studentCard);
                studentCard.getCourseStudentCards().add(newCourseStudentCard);


                courseStudentCardRepository.save(newCourseStudentCard);
            }


            if (!newCourseStudentCard.getCourseList().contains(existingCourse)) {
                newCourseStudentCard.getCourseList().add(existingCourse);
            }
            if (existingCourse.getCourseStudentCard() == null || !existingCourse.getCourseStudentCard().equals(newCourseStudentCard)) {
                existingCourse.getCourseStudentCard().add(newCourseStudentCard);
            }


            courseRepository.save(existingCourse);

            return "Il corso " + coursePayload.name() + " esiste già nel db ed è stato associato allo studente " + studentCard.getStudent().getUsername();
        } else {
            throw new BadRequestException("Il corso " + coursePayload.name() + " è già stato associato allo studente");
        }
    } else {

        Course newCourse = new Course(coursePayload.name());
        CourseStudentCard newCourseStudentCard = new CourseStudentCard(coursePayload.dateEnrollment());

        if (coursePayload.cfu() != 0) {
            newCourseStudentCard.setCfu(coursePayload.cfu());
        }
        if (coursePayload.register() != null) {
            studentCard.setRegister(coursePayload.register());
        }
        newCourseStudentCard.setStudentCard(studentCard);
        newCourseStudentCard.setCourseList(new ArrayList<>(List.of(newCourse)));
        newCourse.getCourseStudentCard().add(newCourseStudentCard);


        studentCard.getCourseStudentCards().add(newCourseStudentCard);

        courseRepository.save(newCourse);

        courseStudentCardRepository.save(newCourseStudentCard);


        return "Il corso " + coursePayload.name() + " è stato correttamente inserito nel db e associato allo studente " + studentCard.getStudent().getUsername();
    }
}

public Course findByName(String name){
    return courseRepository.findByName(name).orElseThrow(()-> new NotFoundException("Il corso " + name + " non è stato trovato nel db"));
}
public Course findById(UUID id){
    return courseRepository.findById(id).orElseThrow(()-> new NotFoundException("Il corso non è stato trovato nel db"));
}
    //2 cencellazione del corso dal libretto e dal db
    public String findAndDelete(String name, UUID studentCardId) {
        StudentCard studentCard = studentCardService.findById(studentCardId);
        Course course = findByName(name);

        boolean courseExistsInStudentCard = studentCard.getCourseStudentCards().stream()
                .anyMatch(courseStudentCard -> courseStudentCard.getCourseList().stream()
                        .anyMatch(c -> c.getName().equalsIgnoreCase(name)));

        if (courseExistsInStudentCard) {

            CourseStudentCard courseStudentCard = studentCard.getCourseStudentCards().stream()
                    .filter(csc -> csc.getCourseList().stream()
                            .anyMatch(c -> c.getName().equalsIgnoreCase(name)))
                    .findFirst()
                    .orElseThrow(() -> new NotFoundException("Nessun CourseStudentCard associato trovato."));
for(Subject subject : courseStudentCard.getSubjectList()){
    for (Professor professor : subject.getProfessorList()){
        professorRepository.delete(professor);
    }
    for (Exam exam : subject.getExamList()){
        examRepository.delete(exam);
    }
    for(Lesson lesson : subject.getLessonList()){
        lessonRepository.delete(lesson);
    }
   for (File file : subject.getFileList()){
       fileRepository.delete(file);
   }
   for (Transcription transcription : subject.getTranscriptions()){
       transcriptionRepository.delete(transcription);
   }
    subjectRepository.delete(subject);
}

            courseStudentCard.getCourseList().remove(course);


            if (courseStudentCard.getCourseList().isEmpty()) {
                studentCard.getCourseStudentCards().remove(courseStudentCard);
                courseStudentCardRepository.delete(courseStudentCard);
            }


            if (course.getCourseStudentCard().isEmpty()) {
                courseRepository.delete(course);
            }

            studentCardService.save(studentCard);

            return "Il corso " + name + " è stato rimosso dalla lista dei corsi dello studente";
        } else {
            throw new NotFoundException("Il corso " + name + " non è associato a questo studente.");
        }
    }

// 3 visualizzazione di tutti i corsi
public Page<ResponseCoursePayload> getCourses(int pageNumber, int pageSize, String sortBy) {
    if (pageSize > 100) pageSize = 100;
    Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
    Page<Course> courses = courseRepository.findAll(pageable);

    return courses.map(course -> new ResponseCoursePayload(course.getName(), course.getCourseStudentCard() != null ? course.getCourseStudentCard().size() : 0 ));
}
//4 modifica corso
    public String findAndUpdate(UploadCoursePayload body, UUID id) {
        StudentCard studentCard = studentCardService.findById(id);


        CourseStudentCard courseStudentCard = studentCard.getCourseStudentCards().stream()
                .filter(csc -> csc.getCourseList().stream().anyMatch(course -> course.getName().equalsIgnoreCase(body.name())))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Il corso " + body.name() + " non è stato trovato nella lista dei corsi dello studente"));

        Course course = courseStudentCard.getCourseList().stream()
                .filter(c -> c.getName().equalsIgnoreCase(body.name()))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Il corso " + body.name() + " non è stato trovato nella lista dei corsi dello studente"));


        if (body.cfu() != 0) {
            courseStudentCard.setCfu(body.cfu());
        }
        if (body.endDate() != null) {
            courseStudentCard.setEndDate(body.endDate());
        }
        if (body.graduationGrade() != 0) {
            courseStudentCard.setGraduationGrade(body.graduationGrade());
        }
        if (body.dateEnrollment() != null) {
            courseStudentCard.setEnrollmentDate(body.dateEnrollment());
        }


        courseStudentCardRepository.save(courseStudentCard);

        return "Il corso " + course.getName() + " è stato correttamente modificato";

    }

}
