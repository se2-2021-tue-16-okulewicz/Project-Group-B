package se.backend.wrapper.account;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class LoginInfo {
    private String username;
    private String password;

    public LoginInfo(String username, String password){
        this.username = username;
        this.password = password;
    }
}
