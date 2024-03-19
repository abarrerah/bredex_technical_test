package abarrerah.app.controllers;

import abarrerah.app.dto.UserDTO;
import abarrerah.app.models.User;
import abarrerah.app.security.User.UserRequest;
import abarrerah.app.security.User.UserResponse;
import abarrerah.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200"})
public class UserController {
    private final UserService userService;

    @GetMapping(value = "{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Integer id) {
        UserDTO userDTO = userService.getUser(id);
        if (userDTO == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(userDTO);
        }
    }

    @GetMapping(value = "all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(users);
        }
    }

    @PutMapping()
    public ResponseEntity<UserResponse> updateUser(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(userService.updateUser(userRequest));
    }
}
