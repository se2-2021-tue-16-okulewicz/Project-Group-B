package service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import se.backend.SEBackend;
import se.backend.service.user.UserService;
import se.backend.wrapper.user.UserInfo;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = SEBackend.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
public class UserServiceTest {
    @Autowired
    private UserService userService;

    @Test
    public void GetUser() {
        var validUser = userService.GetUser(10002);
        assertEquals("b.gates@mail.com", validUser.getEmail());
        assertEquals("Bill Gates", validUser.getName());

        var invalidUser = userService.GetUser(20002);
        assertNull(invalidUser);
    }

    @Test
    public void EditUser() {
        var userInfo = new UserInfo();
        userInfo.setName("Name");

        var result = userService.EditUser(10001, userInfo);
        assertEquals("Incomplete data", result.getValue1());
        assertNull(result.getValue0());

        userInfo.setPhoneNumber("+48 788 64 00 00");
        userInfo.setEmail("notValidEmail");
        result = userService.EditUser(10001, userInfo);
        assertEquals("Email is invalid", result.getValue1());
        assertNull(result.getValue0());

        userInfo.setEmail("b.gates@mail.com");
        result = userService.EditUser(10001, userInfo);
        assertEquals("Email is already used", result.getValue1());
        assertNull(result.getValue0());

        userInfo.setEmail("new@mail.com");
        userInfo.setName("Bill Gates");
        result = userService.EditUser(10001, userInfo);
        assertEquals("Name is already used", result.getValue1());
        assertNull(result.getValue0());

        userInfo.setName("Name");
        userInfo.setPhoneNumber("Not valid phone number");
        result = userService.EditUser(10001, userInfo);
        assertEquals("Phone number is invalid", result.getValue1());
        assertNull(result.getValue0());

        userInfo.setPhoneNumber("+48 788 64 00 00");
        userInfo.setName("Aa");
        result = userService.EditUser(10001, userInfo);
        assertEquals("User name is too short", result.getValue1());
        assertNull(result.getValue0());

        userInfo.setName("Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        result = userService.EditUser(10001, userInfo);
        assertEquals("User name is too long", result.getValue1());
        assertNull(result.getValue0());

        userInfo.setName("New Name");
        result = userService.EditUser(20001, userInfo);
        assertEquals("User does not exist", result.getValue1());
        assertNull(result.getValue0());

        //Proper update
        result = userService.EditUser(10001, userInfo);
        assertEquals("", result.getValue1());
        assertNotNull(result.getValue0());
        assertEquals("+48 788 64 00 00", result.getValue0().getPhoneNumber());

        //Update ONLY name
        userInfo.setName("New Name 2");
        result = userService.EditUser(10001, userInfo);
        assertEquals("", result.getValue1());
        assertNotNull(result.getValue0());
        assertEquals("New Name 2", result.getValue0().getName());

        //Update ONLY email
        userInfo.setEmail("even.newer@email.com");
        result = userService.EditUser(10001, userInfo);
        assertEquals("", result.getValue1());
        assertNotNull(result.getValue0());
        assertEquals("even.newer@email.com", result.getValue0().getEmail());

        //Update ONLY phone number
        userInfo.setPhoneNumber("784092997");
        result = userService.EditUser(10001, userInfo);
        assertEquals("", result.getValue1());
        assertNotNull(result.getValue0());
        assertEquals("784092997", result.getValue0().getPhoneNumber());
    }
}
