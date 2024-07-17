package marinalucentini.Unitutor.role.controller;

import marinalucentini.Unitutor.exception.BadRequestException;
import marinalucentini.Unitutor.role.payload.RoleAssignPayload;
import marinalucentini.Unitutor.role.payload.RolePayload;
import marinalucentini.Unitutor.role.payload.RoleUpdatePayload;
import marinalucentini.Unitutor.role.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    RoleService roleService;
    // 1 creazione ruolo
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ADMIN')")
    public String createRole (@RequestBody @Validated RolePayload rolePayload, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return roleService.saveNewRole(rolePayload);
    }
    // 2 assegnazione ruolo
    @PatchMapping("/assign")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String assignRole(@RequestBody @Validated RoleAssignPayload roleAssignPayload, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
       return roleService.assignRole(roleAssignPayload);
    }
    // 3 modifica ruolo
    @PatchMapping("/update")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String updateRole (@RequestBody @Validated RoleUpdatePayload roleUpdatePayload, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return roleService.updateRole(roleUpdatePayload);
    }
    // 4 cancellazione ruolo da lista utente
    @PatchMapping("/remove")
     @PreAuthorize("hasAuthority('ADMIN')")
    public String removeRole(@RequestBody @Validated RoleAssignPayload roleAssignPayload, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return roleService.removeRole(roleAssignPayload);
    }
    // 5 cancellazione ruolo dal db
    @DeleteMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteRole (@RequestBody @Validated RolePayload rolePayload, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return roleService.deleteRole(rolePayload);
    }
}
