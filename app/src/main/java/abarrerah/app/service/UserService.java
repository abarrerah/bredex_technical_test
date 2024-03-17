package abarrerah.app.service;

import abarrerah.app.dto.UserDTO;
import abarrerah.app.models.Role;
import abarrerah.app.models.User;
import abarrerah.app.repositories.UserRepository;
import abarrerah.app.security.User.UserRequest;
import abarrerah.app.security.User.UserResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {
        User user = User
                .builder()
                .id(userRequest.getId())
                .firstname(userRequest.getFirstname())
                .lastname(userRequest.getLastname())
                .country(userRequest.getCountry())
                .role(Role.USER)
                .build();

        Integer userUpdated = userRepository.updateUser(user.getId(), user.getFirstname(), user.getLastname(), user.getCountry());

        String userResponse = (userUpdated != 0) ? "The user has been updated successfully" : "Something went wrong!";

        return new UserResponse(userResponse);
    }

    public UserDTO getUser(Integer id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            return UserDTO
                    .builder()
                    .id(user.getId())
                    .firstname(user.getFirstname())
                    .username(user.getUsername())
                    .lastname(user.getLastname())
                    .country(user.getCountry())
                    .build();
        }
        return null;
    }
}
