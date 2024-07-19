package marinalucentini.Unitutor.student.payload;

import jakarta.validation.constraints.NotNull;
import marinalucentini.Unitutor.role.Role;
import marinalucentini.Unitutor.student.studentCard.StudentCard;

import java.time.LocalDate;
import java.util.List;

public record StudentResponse(
        String name,
        String surname,
        String username,
        String email,
        LocalDate dateOfBirth,
        String urlAvatar,
        List<Role> roles,
        @NotNull(message = "Il campo student card è obbligatorio")
        StudentCard studentCard
) {
}
