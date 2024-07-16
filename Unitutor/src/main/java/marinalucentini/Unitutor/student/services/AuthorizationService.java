package marinalucentini.Unitutor.student.services;

import marinalucentini.Unitutor.exception.UnauthorizedException;
import marinalucentini.Unitutor.security.JwtTool;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.payload.StudentLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {
    @Autowired
    StudentService studentService;
    @Autowired
    private JwtTool jwtTool;
    @Autowired
    private PasswordEncoder bcrypt;
    public String authenticateUserAndGenerateToken(StudentLogin payload){

        Student student = studentService.findByEmail(payload.email());

        if(bcrypt.matches(payload.password(), student.getPassword())){

            return jwtTool.createToken(student);
        } else {

            throw new UnauthorizedException("Credenziali non corrette!");
        }
    }
}
