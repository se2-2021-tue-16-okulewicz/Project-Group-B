package service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.test.annotation.DirtiesContext;
import se.backend.SEBackend;
import se.backend.service.login.LoginService;
import se.backend.wrapper.account.UserType;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = SEBackend.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
public class LoginServiceTest {
    @Autowired
    private LoginService service;

    @Test
    public void authenticateTest() {
        var authenticationResult1 = service.Authenticate("e.musk@mail.com", "xea-12Musk");
        assertEquals(UserType.Regular, authenticationResult1.getUserType());

        var authenticationResult2 = service.Authenticate("b.gates@mail.com", "MicrosoftTheBest");
        assertEquals(UserType.Regular, authenticationResult2.getUserType());

        var authenticationResult3 = service.Authenticate("hopeShelter", "12345678");
        assertEquals(UserType.Shelter, authenticationResult3.getUserType());

        var authenticationResult4 = service.Authenticate("admin007", "admin007123");
        assertEquals(UserType.Admin, authenticationResult4.getUserType());

        var failedResults = service.Authenticate("not-existing-acc", "not-existing-pwd");
        assertNull(failedResults);
    }

    @Test
    public void logoutTest() {
        var properLogoutResult = service.Logout("regularUserTestToken");
        assertTrue(properLogoutResult);

        //User should be logged out by now
        var invalidLogoutResult = service.Logout("regularUserTestToken");
        assertFalse(invalidLogoutResult);
    }

    @Test
    public void isAuthorizedTest() {
        HttpHeaders regularTokenHeaders = new HttpHeaders();
        regularTokenHeaders.add("token", "regularUserTestToken");

        HttpHeaders adminTokenHeaders = new HttpHeaders();
        adminTokenHeaders.add("token", "testTokenForAdmins");

        HttpHeaders shelterTokenHeaders = new HttpHeaders();
        shelterTokenHeaders.add("token", "shelterSecretTestToken");

        HttpHeaders invalidTokenHeaders = new HttpHeaders();
        invalidTokenHeaders.add("token", "i am invalid token");

        HttpHeaders noTokenHeaders = new HttpHeaders();

        var res1 = service.IsAuthorized(regularTokenHeaders, Collections.singletonList(UserType.Regular));
        assertEquals(true, res1.getValue0());
        assertEquals(10001, res1.getValue1());

        var res2 = service.IsAuthorized(regularTokenHeaders, List.of(UserType.Admin, UserType.Regular, UserType.Shelter));
        assertEquals(true, res2.getValue0());
        assertEquals(10001, res2.getValue1());

        var res3 = service.IsAuthorized(regularTokenHeaders, Collections.singletonList(UserType.Admin));
        assertEquals(false, res3.getValue0());

        var res4 = service.IsAuthorized(adminTokenHeaders, Collections.singletonList(UserType.Admin));
        assertEquals(true, res4.getValue0());
        assertEquals(10001, res4.getValue1());

        var res5 = service.IsAuthorized(shelterTokenHeaders, Collections.singletonList(UserType.Shelter));
        assertEquals(true, res5.getValue0());
        assertEquals(10001, res5.getValue1());

        var res6 = service.IsAuthorized(invalidTokenHeaders, List.of(UserType.Admin, UserType.Regular, UserType.Shelter));
        assertEquals(false, res6.getValue0());

        var res7 = service.IsAuthorized(noTokenHeaders, List.of(UserType.Admin, UserType.Regular, UserType.Shelter));
        assertEquals(false, res7.getValue0());
    }
}
