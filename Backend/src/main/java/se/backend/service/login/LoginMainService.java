package se.backend.service.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import se.backend.dao.AdminAccountRepository;
import se.backend.dao.DogShelterAccountRepository;
import se.backend.dao.UserAccountRepository;
import se.backend.model.account.Account;
import se.backend.model.account.AdminAccount;
import se.backend.model.account.DogShelterAccount;
import se.backend.model.account.UserAccount;
import se.backend.wrapper.account.AuthenticationResults;
import se.backend.wrapper.account.UserType;

import java.util.List;

@Service
public class LoginMainService implements LoginService {

    private UserAccountRepository userAccountRepository;
    private DogShelterAccountRepository dogShelterAccountRepository;
    private AdminAccountRepository adminAccountRepository;

    ExampleMatcher LOGIN_INFORMATION_MATCHER = ExampleMatcher.matching()
            .withIgnorePaths("id")
            .withMatcher("username", ExampleMatcher.GenericPropertyMatchers.ignoreCase())
            .withMatcher("password", ExampleMatcher.GenericPropertyMatchers.caseSensitive());

    @Autowired
    public LoginMainService (UserAccountRepository userAccountRepository, DogShelterAccountRepository dogShelterAccountRepository, AdminAccountRepository adminAccountRepository) {
        this.userAccountRepository = userAccountRepository;
        this.dogShelterAccountRepository = dogShelterAccountRepository;
        this.adminAccountRepository = adminAccountRepository;
    }

    @Override
    public AuthenticationResults authenticate(String username, String password) {
        UserAccount userProbe = new UserAccount();
        userProbe.setPassword(password);
        userProbe.setAssociatedEmail(username);
        Example<UserAccount> userExample = Example.of(userProbe, LOGIN_INFORMATION_MATCHER);
        boolean exists = this.userAccountRepository.exists(userExample);
        if(exists){
            return new AuthenticationResults(UserType.Regular);
        }
        DogShelterAccount dogShelterProbe = new DogShelterAccount();
        dogShelterProbe.setPassword(password);
        dogShelterProbe.setAssociatedEmail(username);
        Example<DogShelterAccount> dogExample = Example.of(dogShelterProbe, LOGIN_INFORMATION_MATCHER);
        exists = this.dogShelterAccountRepository.exists(dogExample);
        if(exists){
            return new AuthenticationResults(UserType.Shelter);
        }
        AdminAccount adminProbe = new AdminAccount();
        adminProbe.setPassword(password);
        adminProbe.setAssociatedEmail(username);
        Example<AdminAccount> adminExample = Example.of(adminProbe, LOGIN_INFORMATION_MATCHER);
        exists = this.adminAccountRepository.exists(adminExample);
        if(exists){
            return new AuthenticationResults(UserType.Admin);
        }
        return null;
    }

    @Override
    public AuthenticationResults createAccount(Account user) {
        return null;
    }

    @Override
    public boolean updateUser(Account user) {
        return false;
    }

    @Override
    public List<Account> getUsers(String username) {
        return null;
    }
}
