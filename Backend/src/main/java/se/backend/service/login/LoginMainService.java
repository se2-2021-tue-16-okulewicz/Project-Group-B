package se.backend.service.login;

import javassist.compiler.ast.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpHeaders;
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

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Service
public class LoginMainService implements LoginService {

    private UserAccountRepository userAccountRepository;
    private DogShelterAccountRepository dogShelterAccountRepository;
    private AdminAccountRepository adminAccountRepository;

    private static final HashMap<String,UserType> sessions = new HashMap<>();

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
    public AuthenticationResults Authenticate(String username, String password) {
        UserAccount userProbe = new UserAccount();
        userProbe.setPassword(getSHA256Hash(password));
        userProbe.setAssociatedEmail(username);
        Example<UserAccount> userExample = Example.of(userProbe, LOGIN_INFORMATION_MATCHER);
        boolean exists = this.userAccountRepository.exists(userExample);
        if(exists){
            var result = new AuthenticationResults(UserType.Regular);
            sessions.put(result.getToken(),result.getUserType());
            return result;
        }
        DogShelterAccount dogShelterProbe = new DogShelterAccount();
        dogShelterProbe.setPassword(getSHA256Hash(password));
        dogShelterProbe.setAssociatedEmail(username);
        Example<DogShelterAccount> dogExample = Example.of(dogShelterProbe, LOGIN_INFORMATION_MATCHER);
        exists = this.dogShelterAccountRepository.exists(dogExample);
        if(exists){
            var result = new AuthenticationResults(UserType.Shelter);
            sessions.put(result.getToken(),result.getUserType());
            return result;
        }
        AdminAccount adminProbe = new AdminAccount();
        adminProbe.setPassword(getSHA256Hash(password));
        adminProbe.setAssociatedEmail(username);
        Example<AdminAccount> adminExample = Example.of(adminProbe, LOGIN_INFORMATION_MATCHER);
        exists = this.adminAccountRepository.exists(adminExample);
        if(exists){
            var result = new AuthenticationResults(UserType.Admin);
            sessions.put(result.getToken(),result.getUserType());
            return result;
        }
        return null;
    }

    @Override
    public AuthenticationResults CreateAccount(Account user) {
        return null;
    }

    @Override
    public boolean UpdateUser(Account user) {
        return false;
    }

    @Override
    public List<Account> GetUsers(String username) {
        return null;
    }

    @Override
    public boolean IsAuthorized(String token, UserType permissions) {
        if(this.sessions.containsKey(token)){
            return this.sessions.get(token).equals(permissions);
        }
        return false;
    }

    private String getSHA256Hash(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hash); // make it printable
        } catch(Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    private String bytesToHex(byte[] hash) {
        return DatatypeConverter.printHexBinary(hash);
    }
}
