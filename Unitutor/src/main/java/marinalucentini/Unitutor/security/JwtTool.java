package marinalucentini.Unitutor.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import marinalucentini.Unitutor.exception.UnauthorizedException;
import marinalucentini.Unitutor.student.Student;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTool {
    @Value("${jwt.secret}")
    private String secret;
    public String createToken(Student student){
        return Jwts.builder()
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 *7))
                .subject(String.valueOf(student.getId()))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .compact();
    }

    public void verifyToken(String token){
        try {
            Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build().parse(token);


        } catch (Exception ex){
            throw new UnauthorizedException("Problemi col token! Per favore effettua di nuovo il login!");

        }
    }
    public String extractIdFromToken(String token){
        return Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build()
                .parseSignedClaims(token).getPayload().getSubject(); }
}
