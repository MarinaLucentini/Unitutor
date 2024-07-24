package marinalucentini.Unitutor.subject.services;

import marinalucentini.Unitutor.course.CourseStudentCard;
import marinalucentini.Unitutor.course.repositories.CourseStudentCardRepository;
import marinalucentini.Unitutor.exam.Exam;
import marinalucentini.Unitutor.exam.repository.ExamRepository;
import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.file.File;
import marinalucentini.Unitutor.file.Keyword;
import marinalucentini.Unitutor.file.Transcription;
import marinalucentini.Unitutor.file.repository.FileRepository;
import marinalucentini.Unitutor.file.repository.KeywordRepository;
import marinalucentini.Unitutor.file.repository.TranscriptionRepository;
import marinalucentini.Unitutor.lesson.Lesson;
import marinalucentini.Unitutor.lesson.repository.LessonRepository;
import marinalucentini.Unitutor.professor.Professor;
import marinalucentini.Unitutor.professor.repositories.ProfessorRepository;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.services.StudentService;
import marinalucentini.Unitutor.subject.Subject;
import marinalucentini.Unitutor.subject.payloads.DeleteSubjectPayload;
import marinalucentini.Unitutor.subject.payloads.NewSubjectPayload;
import marinalucentini.Unitutor.subject.payloads.UpdateSubjectPayload;
import marinalucentini.Unitutor.subject.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SubjectService {
    @Autowired
    SubjectRepository subjectRepository;
    @Autowired
    StudentService studentService;
    @Autowired
    CourseStudentCardRepository courseStudentCardRepository;
    @Autowired
    FileRepository fileRepository;
    @Autowired
    ExamRepository examRepository;
    @Autowired
    TranscriptionRepository transcriptionRepository;
    @Autowired
    LessonRepository lessonRepository;
    @Autowired
    ProfessorRepository professorRepository;
    @Autowired
    KeywordRepository keywordRepository;
    public Subject findByName(String name){
        return subjectRepository.findByName(name).orElseThrow(()-> new NotFoundException("La materia " + name + " non è stata trovata"));
    }
    public Subject findById(UUID id){
        return subjectRepository.findById(id).orElseThrow(()-> new NotFoundException("La materia non è stata trovata"));
    }
    // creazione nuova materia
    public String saveNewSubject(UUID id, NewSubjectPayload newSubjectPayload){
        Student student = studentService.findById(id);
        CourseStudentCard courseStudentCard = student.getStudentCard().getCourseStudentCards().stream()
                .filter(courseStudentCard1 -> courseStudentCard1.getCourseList().stream()
                        .anyMatch(course -> course.getName().equalsIgnoreCase(newSubjectPayload.courseName())))
                .findFirst().orElseThrow(()-> new NotFoundException("Il corso " + newSubjectPayload.courseName() + " non è stato trovato"));

       boolean existSubject = courseStudentCard.getSubjectList().stream()
               .anyMatch(subject -> subject.getName().equalsIgnoreCase(newSubjectPayload.name()));
if(existSubject){
    throw new BadRequestException("La materia " + newSubjectPayload.name() + " è già esistente nell'elenco delle materie del corso");
}

        Subject subject = new Subject(newSubjectPayload.name());
        if(newSubjectPayload.cfu() != 0){
            subject.setCfu(newSubjectPayload.cfu());
        }
        subject.setCourse(courseStudentCard);
        subjectRepository.save(subject);
        courseStudentCard.getSubjectList().add(subject);
        courseStudentCardRepository.save(courseStudentCard);

        return "La materia " + newSubjectPayload.name() + " è stata correttamente salvata nel corso " + newSubjectPayload.courseName();
    }
    // modifica materia
    public String updateSubject(UUID id, UpdateSubjectPayload updateSubjectPayload){
        Student student = studentService.findById(id);
        CourseStudentCard courseStudentCard = student.getStudentCard().getCourseStudentCards().stream()
                .filter(courseStudentCard1 -> courseStudentCard1.getCourseList().stream()
                        .anyMatch(course -> course.getName().equalsIgnoreCase(updateSubjectPayload.nameCourse())))
                .findFirst().orElseThrow(()-> new NotFoundException("Il corso " + updateSubjectPayload.nameCourse() + " non è stato trovato"));
        Subject existingSubject = courseStudentCard.getSubjectList().stream()
                .filter(subject -> subject.getName().equalsIgnoreCase(updateSubjectPayload.name())).findFirst()
                .orElseThrow(() -> new NotFoundException("La materia " + updateSubjectPayload.name() + " non è stata trovata"));
if(updateSubjectPayload.newName() !=null){
    existingSubject.setName(updateSubjectPayload.newName());
}
if(updateSubjectPayload.cfu() != 0){
    existingSubject.setCfu(updateSubjectPayload.cfu());
}
if(updateSubjectPayload.subjectGrade() != 0){
    existingSubject.setSubjectGrade(updateSubjectPayload.subjectGrade());
}
        subjectRepository.save(existingSubject);
        return "La materia " + updateSubjectPayload.name() + " è stata correttamente aggiornata";
    }
    // cancellazione della materia
    public String deleteSubject (UUID id, DeleteSubjectPayload deleteSubjectPayload){
        Student student = studentService.findById(id);
        CourseStudentCard courseStudentCard = student.getStudentCard().getCourseStudentCards().stream()
                .filter(courseStudentCard1 -> courseStudentCard1.getCourseList().stream()
                        .anyMatch(course -> course.getName().equalsIgnoreCase(deleteSubjectPayload.nameCourse())))
                .findFirst().orElseThrow(()-> new NotFoundException("Il corso " + deleteSubjectPayload.nameCourse() + " non è stato trovato"));
        Subject existingSubject = courseStudentCard.getSubjectList().stream()
                .filter(subject -> subject.getName().equalsIgnoreCase(deleteSubjectPayload.name())).findFirst()
                .orElseThrow(() -> new NotFoundException("La materia " +deleteSubjectPayload.name() + " non è stata trovata"));
        courseStudentCard.getSubjectList().removeIf(subject -> subject.getId().equals(existingSubject.getId()));

                courseStudentCardRepository.save(courseStudentCard);
        for (Professor professor : existingSubject.getProfessorList()){
            professorRepository.delete(professor);
        }
        for (Exam exam : existingSubject.getExamList()){
            examRepository.delete(exam);
        }
        for(Lesson lesson : existingSubject.getLessonList()){
            lessonRepository.delete(lesson);
        }
        for (File file : existingSubject.getFileList()){
            fileRepository.delete(file);
        }
        for (Transcription transcription : existingSubject.getTranscriptions()){
            for (Keyword keyword : transcription.getKeywordList()){
              keywordRepository.delete(keyword);
            }
            transcriptionRepository.delete(transcription);
        }

        subjectRepository.delete(existingSubject);
        return "La materia " + deleteSubjectPayload.name() + " è stata correttamente eliminata";
    }
}
