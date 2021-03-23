package service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import se.backend.SEBackend;
import se.backend.service.login.LoginService;
import se.backend.wrapper.account.UserType;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@SpringBootTest(classes = SEBackend.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
public class LoginServiceTest {
    @Autowired
    private LoginService service;

    @Test
    public void authenticateTest() {
        var authenticationResult1 = service.Authenticate("e.musk@mail.com", "xea-12Musk");
        assertEquals(authenticationResult1.getUserType(), UserType.Regular);

        var authenticationResult2 = service.Authenticate("b.gates@mail.com", "MicrosoftTheBest");
        assertEquals(authenticationResult2.getUserType(),UserType.Regular);

        var authenticationResult3 = service.Authenticate("hopeShelter", "12345678");
        assertEquals(authenticationResult3.getUserType(),UserType.Shelter);

        var authenticationResult4 = service.Authenticate("admin007", "admin007123");
        assertEquals(authenticationResult4.getUserType(),UserType.Admin);

        var failedResults = service.Authenticate("not-existing-acc", "not-existing-pwd");
        assertNull(failedResults);
    }
}
