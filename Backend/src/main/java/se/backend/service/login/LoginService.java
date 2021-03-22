package se.backend.service.login;


import se.backend.model.account.Account;
import se.backend.model.account.UserAccount;
import se.backend.wrapper.account.AuthenticationResults;
import se.backend.wrapper.account.UserType;

import java.util.List;

public interface LoginService {
    AuthenticationResults authenticate(String username, String password);
    AuthenticationResults createAccount(Account user);
    boolean updateUser(Account user);
    List<Account> getUsers(String username);
    boolean isAuthorized(String token, UserType permissions);
}
