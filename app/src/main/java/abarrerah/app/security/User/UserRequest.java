package abarrerah.app.security.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private int id;
    private String username;
    private String firstname;
    private String lastname;
    private String country;
}
