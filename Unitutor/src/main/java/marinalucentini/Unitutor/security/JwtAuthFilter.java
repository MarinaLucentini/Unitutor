package marinalucentini.Unitutor.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import marinalucentini.Unitutor.exception.UnauthorizedException;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class            JwtAuthFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTool jwtTools;
    @Autowired
    private StudentService studentService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")) throw new UnauthorizedException("Per favore inserisci correttamente il token nell'header");


        String accessToken = authHeader.substring(7);

        jwtTools.verifyToken(accessToken);
        String studentId = jwtTools.extractIdFromToken(accessToken);
        Student currentStudent = studentService.findById(UUID.fromString(studentId));
        Authentication authentication = new UsernamePasswordAuthenticationToken(currentStudent, null, currentStudent.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);

    }
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        return new AntPathMatcher().match("/auth/**", request.getServletPath());
    }

}
