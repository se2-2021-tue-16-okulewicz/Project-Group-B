package se.backend.service.login;


import se.backend.model.account.Account;
import se.backend.model.account.UserAccount;
import se.backend.wrapper.account.AuthenticationResults;
import se.backend.wrapper.account.UserType;

import java.net.http.HttpHeaders;
import java.util.List;

public interface LoginService {
    AuthenticationResults Authenticate(String username, String password);
    AuthenticationResults CreateAccount(Account user);
    boolean UpdateUser(Account user);
    List<Account> GetUsers(String username);
    boolean IsAuthorized(HttpHeaders httpHeaders, List<UserType> requiredPermissions);
}
