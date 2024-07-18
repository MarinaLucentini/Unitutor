package marinalucentini.Unitutor.course.services;

import marinalucentini.Unitutor.course.repositories.StudentCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentCourseService {
    @Autowired
    StudentCourseRepository studentCourseRepository;
}
