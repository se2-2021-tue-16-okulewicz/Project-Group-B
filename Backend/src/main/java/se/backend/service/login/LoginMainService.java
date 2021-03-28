package se.backend.service.login;

import org.javatuples.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
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
import se.backend.service.lostdogs.LostDogMainService;
import se.backend.wrapper.account.AuthenticationResults;
import se.backend.wrapper.account.UserType;

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Service
public class LoginMainService implements LoginService {
    private final Logger logger = LoggerFactory.getLogger(LoginMainService.class);

    private final UserAccountRepository userAccountRepository;
    private final DogShelterAccountRepository dogShelterAccountRepository;
    private final AdminAccountRepository adminAccountRepository;

    private static Long GetLongFromString(String s) {
        if(s == null || s.isBlank() || s.isEmpty())
            return 0L;

        try {
            return Long.parseUnsignedLong(s);
        } catch (NumberFormatException e) {
            return 0L;
        }
    }

    private static HashMap<String, Pair<UserType, Long>> sessions = null;

    ExampleMatcher LOGIN_INFORMATION_MATCHER = ExampleMatcher.matching()
            .withIgnorePaths("id")
            .withMatcher("username", ExampleMatcher.GenericPropertyMatchers.ignoreCase())
            .withMatcher("password", ExampleMatcher.GenericPropertyMatchers.caseSensitive());

    @Autowired
    public LoginMainService (UserAccountRepository userAccountRepository,
                             DogShelterAccountRepository dogShelterAccountRepository,
                             AdminAccountRepository adminAccountRepository,
                             @Value("${testToken.regularId:0}") String userTestTokenId,
                             @Value("${testToken.shelterId:0}") String shelterTestTokenId,
                             @Value("${testToken.adminId:0}") String adminTestTokenId,
                             @Value("${testToken.regular:regularUserTestToken}") String userTestToken,
                             @Value("${testToken.shelter:shelterSecretTestToken}") String shelterTestToken,
                             @Value("${testToken.admin:testTokenForAdmins}") String adminTestToken) {

        //Initiates sessions, if test token for given type is present, it is added to the sessions
        if(sessions == null) {
            sessions = new HashMap<>();

            if(userTestToken != null && !userTestToken.isBlank() && !userTestToken.isEmpty())
                sessions.put(userTestToken, new Pair<>(UserType.Regular, GetLongFromString(userTestTokenId)));
            if(shelterTestToken != null && !shelterTestToken.isBlank() && !shelterTestToken.isEmpty())
                sessions.put(shelterTestToken, new Pair<>(UserType.Shelter,  GetLongFromString(shelterTestTokenId)));
            if(adminTestToken != null && !adminTestToken.isBlank() && !adminTestToken.isEmpty())
                sessions.put(adminTestToken, new Pair<>(UserType.Admin,  GetLongFromString(adminTestTokenId)));
        }

        this.userAccountRepository = userAccountRepository;
        this.dogShelterAccountRepository = dogShelterAccountRepository;
        this.adminAccountRepository = adminAccountRepository;
    }

    @Override
    public AuthenticationResults Authenticate(String username, String password) {
        //Normal account
        UserAccount userProbe = new UserAccount();
        userProbe.setPassword(getSHA256Hash(password));
        userProbe.setAssociatedEmail(username);
        Example<UserAccount> userExample = Example.of(userProbe, LOGIN_INFORMATION_MATCHER);
        var normalUser = userAccountRepository.findOne(userExample);

        if(normalUser.isPresent()){
            var result = new AuthenticationResults(UserType.Regular);
            result.setId(normalUser.get().getId());
            sessions.put(result.getToken(), new Pair<>(result.getUserType(), normalUser.get().getId()));
            return result;
        }

        //Dog shelter account
        DogShelterAccount dogShelterProbe = new DogShelterAccount();
        dogShelterProbe.setPassword(getSHA256Hash(password));
        dogShelterProbe.setAssociatedEmail(username);
        Example<DogShelterAccount> shelterExample = Example.of(dogShelterProbe, LOGIN_INFORMATION_MATCHER);
        var shelterUser = dogShelterAccountRepository.findOne(shelterExample);
        if(shelterUser.isPresent()){
            var result = new AuthenticationResults(UserType.Shelter);
            result.setId(shelterUser.get().getId());
            sessions.put(result.getToken(), new Pair<>(result.getUserType(), shelterUser.get().getId()));
            return result;
        }

        //Admin account
        AdminAccount adminProbe = new AdminAccount();
        adminProbe.setPassword(getSHA256Hash(password));
        adminProbe.setAssociatedEmail(username);
        Example<AdminAccount> adminExample = Example.of(adminProbe, LOGIN_INFORMATION_MATCHER);
        var adminUser = adminAccountRepository.findOne(adminExample);
        if(adminUser.isPresent()){
            var result = new AuthenticationResults(UserType.Admin);
            result.setId(adminUser.get().getId());
            sessions.put(result.getToken(), new Pair<>(result.getUserType(), adminUser.get().getId()));
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
    public Pair<Boolean, Long> IsAuthorized(HttpHeaders httpHeaders, List<UserType> requiredPermissions) {
        if(!httpHeaders.containsKey("token"))
            return new Pair<>(false, 0L);

        var token = Objects.requireNonNull(httpHeaders.get("token")).get(0);

        if(sessions.containsKey(token)){
            var session = sessions.get(token);
            return new Pair<>(requiredPermissions.contains(session.getValue0()), session.getValue1());
        }

        return new Pair<>(false, 0L);
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
