package se.backend.wrapper.account;

import java.util.UUID;

public class AuthenticationResults {
    private UserType userType;
    private String token;

    public AuthenticationResults(UserType userType) {
        this.userType = userType;
        token = UUID.randomUUID().toString();
    }
}
