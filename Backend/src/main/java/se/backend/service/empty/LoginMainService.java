package se.backend.service.empty;

import se.backend.model.Account;

public class LoginMainService implements LoginService{
    @Override
    public boolean AuthorizeAccount(Account account) {
        return false;
    }
}
