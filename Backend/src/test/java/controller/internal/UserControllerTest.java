package controller.internal;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.core.IsNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.multipart.MultipartFile;
import se.backend.SEBackend;
import se.backend.service.login.LoginService;
import se.backend.wrapper.account.LoginInfo;
import se.backend.wrapper.account.UserType;

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = SEBackend.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void AuthenticateTest() throws Exception {
        //Regular user login
        MockMultipartFile loginRegular = new MockMultipartFile("username", "", "text/plain", "Elon Musk".getBytes());
        MockMultipartFile passwordRegular = new MockMultipartFile("password", "", "text/plain", "xea-12Musk".getBytes());
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/login")
                        .file(loginRegular)
                        .file(passwordRegular)
                        .characterEncoding("utf-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("data.userType", is(UserType.Regular.toString())))
                .andExpect(jsonPath("data.id", is(10001)));

        //Admin login
        MockMultipartFile loginAdmin = new MockMultipartFile("username", "", "text/plain", "admin007@mail.com".getBytes());
        MockMultipartFile passwordAdmin = new MockMultipartFile("password", "", "text/plain", "admin007123".getBytes());
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/login")
                        .file(loginAdmin)
                        .file(passwordAdmin)
                        .characterEncoding("utf-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("data.userType", is(UserType.Admin.toString())))
                .andExpect(jsonPath("data.id", is(10001)));

        //Shelter login
        MockMultipartFile loginShelter = new MockMultipartFile("username", "", "text/plain", "hopeShelter@mail.com".getBytes());
        MockMultipartFile passwordShelter = new MockMultipartFile("password", "", "text/plain", "12345678".getBytes());
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/login")
                        .file(loginShelter)
                        .file(passwordShelter)
                        .characterEncoding("utf-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("data.userType", is(UserType.Shelter.toString())))
                .andExpect(jsonPath("data.id", is(10001)));

        //Invalid login and password
        MockMultipartFile loginInvalid = new MockMultipartFile("username", "", "text/plain", "not-existing-acc".getBytes());
        MockMultipartFile passwordInvalid = new MockMultipartFile("password", "", "text/plain", "not-existing-pwd".getBytes());
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/login")
                        .file(loginInvalid)
                        .file(passwordInvalid)
                        .characterEncoding("utf-8"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));
    }

    @Test
    public void LogoutTest() throws Exception {
        //Get dogs
        mockMvc.perform(
                MockMvcRequestBuilders.get("/lostdogs")
                        .header("token", "regularUserTestToken"))
                .andExpect(status().isOk());

        //Logout
        mockMvc.perform(
                MockMvcRequestBuilders.post("/logout")
                        .header("token", "regularUserTestToken"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)));

        //Get dogs again (forbidden)
        mockMvc.perform(
                MockMvcRequestBuilders.get("/lostdogs")
                        .header("token", "regularUserTestToken"))
                .andExpect(status().isForbidden());

        //Logout (again - forbidden)
        mockMvc.perform(
                MockMvcRequestBuilders.post("/logout")
                        .header("token", "regularUserTestToken"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("successful", is(false)));

    }

    @Test
    public void RegisterTest() throws Exception {
        MockMultipartFile loginValid = new MockMultipartFile("username", "", "text/plain", "Name".getBytes());
        MockMultipartFile loginShort = new MockMultipartFile("username", "", "text/plain", "Na".getBytes());
        MockMultipartFile loginLong = new MockMultipartFile("username", "", "text/plain", "Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa".getBytes());
        MockMultipartFile loginRepeat = new MockMultipartFile("username", "", "text/plain", "Elon Musk".getBytes());
        MockMultipartFile loginEmpty = new MockMultipartFile("username", "", "text/plain", " ".getBytes());

        MockMultipartFile passwordValid = new MockMultipartFile("password", "", "text/plain", "Password".getBytes());
        MockMultipartFile passwordShort = new MockMultipartFile("password", "", "text/plain", "Passw".getBytes());
        MockMultipartFile passwordLong = new MockMultipartFile("password", "", "text/plain", "Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa".getBytes());

        MockMultipartFile emailValid = new MockMultipartFile("email", "", "text/plain", "mail@mail.com".getBytes());
        MockMultipartFile emailInvalid = new MockMultipartFile("email", "", "text/plain", "@.".getBytes());
        MockMultipartFile emailRepeat = new MockMultipartFile("email", "", "text/plain", "e.musk@mail.com".getBytes());

        MockMultipartFile phoneValid = new MockMultipartFile("phone_number", "", "text/plain", "+48788640000".getBytes());
        MockMultipartFile phoneInvalid = new MockMultipartFile("phone_number", "", "text/plain", "Not a phone number".getBytes());

        //Missing request part
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/register")
                        .file(loginValid)
                        .file(passwordValid)
                        .characterEncoding("utf-8"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message", is("Missing part of a request")))
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Empty part
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/register")
                        .file(loginEmpty)
                        .file(passwordValid)
                        .file(emailValid)
                        .file(phoneValid)
                        .characterEncoding("utf-8"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message", is("Incomplete data")))
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Invalid mail
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/register")
                        .file(loginValid)
                        .file(passwordValid)
                        .file(emailInvalid)
                        .file(phoneValid)
                        .characterEncoding("utf-8"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message", is("Email is invalid")))
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Used mail
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/register")
                        .file(loginValid)
                        .file(passwordValid)
                        .file(emailRepeat)
                        .file(phoneValid)
                        .characterEncoding("utf-8"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message", is("Email is already used")))
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Used name
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/register")
                        .file(loginRepeat)
                        .file(passwordValid)
                        .file(emailValid)
                        .file(phoneValid)
                        .characterEncoding("utf-8"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message", is("Name is already used")))
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Invalid phone
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/register")
                        .file(loginValid)
                        .file(passwordValid)
                        .file(emailValid)
                        .file(phoneInvalid)
                        .characterEncoding("utf-8"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message", is("Phone number is invalid")))
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Name too short
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/register")
                        .file(loginShort)
                        .file(passwordValid)
                        .file(emailValid)
                        .file(phoneValid)
                        .characterEncoding("utf-8"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message", is("User name is too short")))
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Name too long
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/register")
                        .file(loginLong)
                        .file(passwordValid)
                        .file(emailValid)
                        .file(phoneValid)
                        .characterEncoding("utf-8"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message", is("User name is too long")))
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Password too short
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/register")
                        .file(loginValid)
                        .file(passwordShort)
                        .file(emailValid)
                        .file(phoneValid)
                        .characterEncoding("utf-8"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message", is("Password is too short")))
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Password too long
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/register")
                        .file(loginValid)
                        .file(passwordLong)
                        .file(emailValid)
                        .file(phoneValid)
                        .characterEncoding("utf-8"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("message", is("Password is too long")))
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Success
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/register")
                        .file(loginValid)
                        .file(passwordValid)
                        .file(emailValid)
                        .file(phoneValid)
                        .characterEncoding("utf-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("message", is("Registration successful")))
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Try to login on new account
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/login")
                        .file(loginValid)
                        .file(passwordValid)
                        .characterEncoding("utf-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("data.userType", is(UserType.Regular.toString())));
    }
}
