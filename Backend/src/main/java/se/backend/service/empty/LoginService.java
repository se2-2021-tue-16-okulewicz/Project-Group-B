package se.backend.service.empty;


import se.backend.model.Account;
import se.backend.model.UserAccount;

/**
 * Create class responsible for authorizing user, creating new user accounts
 */
public interface LoginService {
    boolean accountAuthorized(LoginInformation account);
}
