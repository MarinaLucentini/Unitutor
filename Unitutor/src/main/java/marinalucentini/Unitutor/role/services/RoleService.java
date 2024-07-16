package marinalucentini.Unitutor.role.services;

import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.exception.NotFoundException;
import marinalucentini.Unitutor.role.Role;
import marinalucentini.Unitutor.role.payload.RoleAssignPayload;
import marinalucentini.Unitutor.role.payload.RolePayload;
import marinalucentini.Unitutor.role.payload.RoleUpdatePayload;
import marinalucentini.Unitutor.role.repository.RoleRepository;
import marinalucentini.Unitutor.student.Student;
import marinalucentini.Unitutor.student.payload.StudentPayload;
import marinalucentini.Unitutor.student.repositories.StudentRepository;
import marinalucentini.Unitutor.student.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    StudentService studentService;
    @Autowired
    StudentRepository studentRepository;
    public String saveNewRole(RolePayload rolePayload){
        roleRepository.findByName(rolePayload.name().toUpperCase()).ifPresent(
                role -> {
                    throw new BadRequestException("Il ruolo  " + rolePayload.name() + " è già stato creato in precedenza!");
                }
        );
        String response = "Il ruolo "  + rolePayload.name().toUpperCase() + " è stato correttamente inserito nel db";
        Role role = new Role(rolePayload.name().toUpperCase());

     roleRepository.save(role);
        return response;
    }
    public String assignRole(RoleAssignPayload roleAssignPayload){
        Role role = findByName(roleAssignPayload.name().toUpperCase());
        Student student = studentService.findByUsername(roleAssignPayload.username());
        List<Role> roleList = student.getRoles();
        if(roleList == null){
            roleList = new ArrayList<>();
        }
        if (roleList.contains(role)) {
            throw new BadRequestException("Il ruolo " + roleAssignPayload.name() + " è già assegnato all'utente " + roleAssignPayload.username());
        }
        roleList.add(role);
        student.setRoles(roleList);
        String response = "Il ruolo " + roleAssignPayload.name() + " è stato correttamente assegnato al user" + roleAssignPayload.username();
        studentRepository.save(student);
        return response;
    }
    public String removeRole(RoleAssignPayload roleAssignPayload){
        Role role = findByName(roleAssignPayload.name().toUpperCase());
        Student student = studentService.findByUsername(roleAssignPayload.username());
        List<Role> roleList = student.getRoles();
        if (roleList == null || !roleList.contains(role)) {
            throw new BadRequestException("Il ruolo " + roleAssignPayload.name() + " non è assegnato all'utente " + roleAssignPayload.username());
        }
        roleList.remove(role);
        student.setRoles(roleList);
        studentRepository.save(student);

        return "Il ruolo " + roleAssignPayload.name() + " è stato rimosso dall'utente " + roleAssignPayload.username();
    }
    public String updateRole(RoleUpdatePayload roleUpdatePayload){
        Role oldRole = findByName(roleUpdatePayload.oldRole());
        Role newRole = findByName(roleUpdatePayload.newRole());
        Student student = studentService.findByUsername(roleUpdatePayload.username());
        List<Role> roleList = student.getRoles();
        if (roleList == null || !roleList.contains(oldRole)) {
            throw new BadRequestException("Il ruolo " + roleUpdatePayload.oldRole() + " non è assegnato all'utente " + roleUpdatePayload.username());
        }

        if (roleList.contains(newRole)) {
            throw new BadRequestException("Il ruolo " + roleUpdatePayload.newRole() + " è già assegnato all'utente " + roleUpdatePayload.username());
        }

        roleList.remove(oldRole);
        roleList.add(newRole);
        student.setRoles(roleList);
        studentRepository.save(student);
        return "Il ruolo " + roleUpdatePayload.oldRole() + " è stato aggiornato a " + roleUpdatePayload.newRole() + " per l'utente " + roleUpdatePayload.username();
    }
    public Role findByName(String name){
        return roleRepository.findByName(name).orElseThrow(()-> new NotFoundException("Il ruolo non è stato trovato"));
    }
}
