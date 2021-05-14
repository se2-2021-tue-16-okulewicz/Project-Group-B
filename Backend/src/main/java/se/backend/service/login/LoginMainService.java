package se.backend.service.login;

import org.javatuples.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import se.backend.dao.AdminAccountRepository;
import se.backend.dao.DogShelterRepository;
import se.backend.dao.UserAccountRepository;
import se.backend.model.account.Account;
import se.backend.model.account.AdminAccount;
import se.backend.model.account.Shelter;
import se.backend.model.account.UserAccount;
import se.backend.utils.StringUtils;
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
    private final DogShelterRepository dogShelterRepository;
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

    private final HashMap<String, Pair<UserType, Long>> sessions;

    private static final ExampleMatcher LOGIN_ADMIN_INFORMATION_MATCHER = ExampleMatcher.matching()
            .withIgnorePaths("id")
            .withMatcher("email", ExampleMatcher.GenericPropertyMatchers.ignoreCase())
            .withMatcher("password", ExampleMatcher.GenericPropertyMatchers.caseSensitive())
            .withIgnoreCase();

    private static final ExampleMatcher LOGIN_SHELTER_INFORMATION_MATCHER = ExampleMatcher.matching()
            .withIgnorePaths("id", "name", "phone_number", "city", "street", "post_code", "building_number", "additional_address_line")
            .withMatcher("email", ExampleMatcher.GenericPropertyMatchers.ignoreCase())
            .withMatcher("password", ExampleMatcher.GenericPropertyMatchers.caseSensitive())
            .withIgnoreCase();

    private static final ExampleMatcher LOGIN_REGULAR_INFORMATION_MATCHER = ExampleMatcher.matching()
            .withIgnorePaths("id", "email", "phone_number")
            .withMatcher("name", ExampleMatcher.GenericPropertyMatchers.caseSensitive())
            .withMatcher("password", ExampleMatcher.GenericPropertyMatchers.caseSensitive());

    @Autowired
    public LoginMainService (UserAccountRepository userAccountRepository,
                             DogShelterRepository dogShelterRepository,
                             AdminAccountRepository adminAccountRepository,
                             @Value("${testToken.regularId:0}") String userTestTokenId,
                             @Value("${testToken.shelterId:0}") String shelterTestTokenId,
                             @Value("${testToken.adminId:0}") String adminTestTokenId,
                             @Value("${testToken.regular:regularUserTestToken}") String userTestToken,
                             @Value("${testToken.shelter:shelterSecretTestToken}") String shelterTestToken,
                             @Value("${testToken.admin:testTokenForAdmins}") String adminTestToken) {

        //Initiates sessions, if test token for given type is present, it is added to the sessions
        sessions = new HashMap<>();

        if(userTestToken != null && !userTestToken.isBlank() && !userTestToken.isEmpty())
            sessions.put(userTestToken, new Pair<>(UserType.Regular, GetLongFromString(userTestTokenId)));
        if(shelterTestToken != null && !shelterTestToken.isBlank() && !shelterTestToken.isEmpty())
            sessions.put(shelterTestToken, new Pair<>(UserType.Shelter,  GetLongFromString(shelterTestTokenId)));
        if(adminTestToken != null && !adminTestToken.isBlank() && !adminTestToken.isEmpty())
            sessions.put(adminTestToken, new Pair<>(UserType.Admin,  GetLongFromString(adminTestTokenId)));

        this.userAccountRepository = userAccountRepository;
        this.dogShelterRepository = dogShelterRepository;
        this.adminAccountRepository = adminAccountRepository;
    }

    @Override
    public AuthenticationResults Authenticate(String username, String password) {
        //Normal account
        UserAccount userProbe = new UserAccount();
        userProbe.setPassword(getSHA256Hash(password));
        userProbe.setName(username);
        Example<UserAccount> userExample = Example.of(userProbe, LOGIN_REGULAR_INFORMATION_MATCHER);
        var normalUser = userAccountRepository.findOne(userExample);

        if(normalUser.isPresent()){
            var result = new AuthenticationResults(UserType.Regular);
            result.setId(normalUser.get().getId());
            sessions.put(result.getToken(), new Pair<>(result.getUserType(), normalUser.get().getId()));
            return result;
        }

        //Dog shelter account
        Shelter dogShelterProbe = new Shelter();
        dogShelterProbe.setPassword(getSHA256Hash(password));
        dogShelterProbe.setAssociatedEmail(username);
        dogShelterProbe.setActive(true);
        Example<Shelter> shelterExample = Example.of(dogShelterProbe, LOGIN_SHELTER_INFORMATION_MATCHER);
        System.out.println(shelterExample.toString());
        var shelterUser = dogShelterRepository.findOne(shelterExample);
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
        Example<AdminAccount> adminExample = Example.of(adminProbe, LOGIN_ADMIN_INFORMATION_MATCHER);
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
    public boolean Logout(String token) {
        if(sessions.containsKey(token)){
            sessions.remove(token);
            return true;
        }
        return false;
    }

    @Override
    public Pair<UserAccount, String> CreateAccount(UserAccount user) {
        user.setId(0);

        if(!StringUtils.IsValidString(user.getPhoneNumber()) ||
                !StringUtils.IsValidString(user.getName()) ||
                !StringUtils.IsValidString(user.getAssociatedEmail()) ||
                !StringUtils.IsValidString(user.getPassword()))
            return new Pair<>(null, "Incomplete data");

        if(!StringUtils.IsStringAnEmail(user.getAssociatedEmail()))
            return new Pair<>(null, "Email is invalid");

        user.setAssociatedEmail(user.getAssociatedEmail().toLowerCase());

        if(userAccountRepository.existsByAssociatedEmail(user.getAssociatedEmail()))
            return new Pair<>(null, "Email is already used");

        if(userAccountRepository.existsByName(user.getName()))
            return new Pair<>(null, "Name is already used");

        if(!StringUtils.IsStringAPhoneNumber(user.getPhoneNumber()))
            return new Pair<>(null, "Phone number is invalid");

        if(user.getName().length() < 3)
            return new Pair<>(null, "User name is too short");

        if(user.getName().length() > 32)
            return new Pair<>(null, "User name is too long");

        if(user.getPassword().length() < 6)
            return new Pair<>(null, "Password is too short");

        if(user.getPassword().length() > 32)
            return new Pair<>(null, "Password is too long");

        user.setPassword(getSHA256Hash(user.getPassword()));

        var result = userAccountRepository.save(user);

        return new Pair<>(result, "");
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
        if(!httpHeaders.containsKey(authorizationHeader))
            return new Pair<>(false, 0L);

        var token = Objects.requireNonNull(httpHeaders.get(authorizationHeader)).get(0);

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
