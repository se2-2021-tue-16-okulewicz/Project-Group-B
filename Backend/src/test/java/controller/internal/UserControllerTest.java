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
        MockMultipartFile loginRegular = new MockMultipartFile("username", "", "text/plain", "e.musk@mail.com".getBytes());
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
        MockMultipartFile loginAdmin = new MockMultipartFile("username", "", "text/plain", "admin007".getBytes());
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
        MockMultipartFile loginShelter = new MockMultipartFile("username", "", "text/plain", "hopeShelter".getBytes());
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

}
