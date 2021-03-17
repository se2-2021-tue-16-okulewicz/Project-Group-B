package se.backend.wrapper.account;

import java.util.UUID;

public class AuthenticationResults {
    private UserType userType;

    public UserType getUserType() {
        return userType;
    }

    private String token;

    public String getToken() {
        return token;
    }

    public AuthenticationResults(UserType userType) {
        this.userType = userType;
        token = UUID.randomUUID().toString();
    }
}
