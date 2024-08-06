package marinalucentini.Unitutor.student;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import marinalucentini.Unitutor.community.Comment;
import marinalucentini.Unitutor.community.Post;
import marinalucentini.Unitutor.role.Role;
import marinalucentini.Unitutor.student.studentCard.StudentCard;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties({"password", "role", "authorities", "enabled", "accountNonExpired", "credentialsNonExpired", "accountNonLocked"})
public class Student implements UserDetails {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String surname;
    private String username;
    private String email;
    private String password;
private LocalDate dateOfBirth;
private String urlAvatar;
@ManyToMany(fetch = FetchType.EAGER)
@JoinTable(name = "role_student",
        joinColumns = @JoinColumn(name = "student_id", nullable = false),
        inverseJoinColumns = @JoinColumn(name = "role_id", nullable = false)
)
private List<Role> roles;
@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private StudentCard studentCard;

@OneToMany (mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
@JsonIgnore
    private List<Post> postList;
@OneToMany (mappedBy = "student",  cascade = CascadeType.ALL, orphanRemoval = true)
@JsonIgnore
    private List<Comment> commentList;

    public Student(String name, String surname, String username, String email, String password, LocalDate dateOfBirth) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
