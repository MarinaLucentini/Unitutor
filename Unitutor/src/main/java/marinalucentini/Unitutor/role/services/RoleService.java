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
import java.util.stream.Collectors;

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
        Role oldRole = findByName(roleUpdatePayload.oldRole().toUpperCase());
        Role newRole = findByName(roleUpdatePayload.newRole().toUpperCase());
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
        return roleRepository.findByName(name).orElseThrow(()-> new NotFoundException("Il ruolo " + name + " non è stato trovato"));
    }
    public String deleteRole(RolePayload rolePayload){
        Role roleToRemove = findByName(rolePayload.name().toUpperCase());
        if(roleToRemove == null){
            throw new BadRequestException("Il ruolo " + rolePayload.name() + " non è presente nel db");
        }
        List<Student> studentsWithRole = studentRepository.findAll().stream()
                .filter(student -> student.getRoles().contains(roleToRemove))
                .collect(Collectors.toList());
        for (Student student : studentsWithRole) {
            student.getRoles().remove(roleToRemove);
            studentRepository.save(student);
        }
        roleRepository.delete(roleToRemove);
        return "Il ruolo " + rolePayload.name() + " è stato corretamente eliminato dal db";
    }
}
