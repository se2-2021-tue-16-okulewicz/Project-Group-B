package se.backend.service.login;


import org.javatuples.Pair;
import org.springframework.http.HttpHeaders;
import se.backend.model.account.Account;
import se.backend.model.account.UserAccount;
import se.backend.wrapper.account.AuthenticationResults;
import se.backend.wrapper.account.UserType;

import java.util.List;

public interface LoginService {
    AuthenticationResults Authenticate(String username, String password);
    boolean Logout(String token);

    /**
     * First value is UserAccount - null if sth failed, Second value is error message (in the case of first value is null)
     */
    Pair<UserAccount, String> CreateAccount(UserAccount user);
    boolean UpdateUser(Account user);
    List<Account> GetUsers(String username);

    /**
     * First value is boolean - if token has required permissions. Second value is id of the user assigned to this token.
     */
    Pair<Boolean, Long> IsAuthorized(HttpHeaders httpHeaders, List<UserType> requiredPermissions);
}
