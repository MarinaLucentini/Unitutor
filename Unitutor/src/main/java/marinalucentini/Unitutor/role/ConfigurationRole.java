package marinalucentini.Unitutor.role;

import jakarta.annotation.PostConstruct;
import marinalucentini.Unitutor.role.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Optional;

@Configuration
public class ConfigurationRole {
    @Autowired
    private RoleRepository roleRepository;

    @PostConstruct
    public void init() {
        createRoleIfNotFound("USER");
        createRoleIfNotFound("ADMIN");
    }

    private void createRoleIfNotFound(String roleName) {
        Optional<Role> role = roleRepository.findByName(roleName);
        if (role.isEmpty()) {
            Role newRole = new Role(roleName);
            roleRepository.save(newRole);
        }
    }
}
