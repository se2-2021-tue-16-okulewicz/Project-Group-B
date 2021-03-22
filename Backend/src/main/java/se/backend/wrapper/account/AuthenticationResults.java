package se.backend.wrapper.account;

import lombok.Data;

import java.util.UUID;

@Data
public class AuthenticationResults {
    private UserType userType;

    private String token;

    public AuthenticationResults(UserType userType) {
        this.userType = userType;
        token = UUID.randomUUID().toString();
    }
}
