package controller.internal;

import org.hamcrest.core.IsNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import se.backend.SEBackend;
import se.backend.service.login.LoginService;

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
    public void GetUserTest() throws Exception {
        //Get existing user
        mockMvc.perform(
                MockMvcRequestBuilders.get("/user/10001")
                        .header(LoginService.authorizationHeader, "regularUserTestToken"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("data.name", is("Elon Musk")));

        //Get non-existing user
        mockMvc.perform(
                MockMvcRequestBuilders.get("/user/20001")
                        .header(LoginService.authorizationHeader, "regularUserTestToken"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Unauthorized
        mockMvc.perform(
                MockMvcRequestBuilders.get("/user/20001")
                        .header(LoginService.authorizationHeader, "nonExistingToken"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));
    }

    @Test
    public void EditUserTest() throws Exception {
        MockMultipartFile validData = new MockMultipartFile("userdata", "", "application/json", "{\"name\":\"NewName\",\"phoneNumber\":\"788 640 000\", \"email\":\"new@mail.com\"}".getBytes());
        MockMultipartFile usedData = new MockMultipartFile("userdata", "", "application/json", "{\"name\":\"Bill Gates\",\"phoneNumber\":\"788 640 000\", \"email\":\"new@mail.com\"}".getBytes());

        MockMultipartHttpServletRequestBuilder updateBuilder;

        //Unauthorized
        updateBuilder = MockMvcRequestBuilders.multipart("/user/10001");
        updateBuilder.with(request -> {
            request.setMethod("PUT");
            return request;
        });
        mockMvc.perform(
                updateBuilder
                        .file(validData)
                        .header(LoginService.authorizationHeader, "nonExistingToken"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Update other account
        updateBuilder = MockMvcRequestBuilders.multipart("/user/10002");
        updateBuilder.with(request -> {
            request.setMethod("PUT");
            return request;
        });
        mockMvc.perform(
                updateBuilder
                        .file(validData)
                        .header(LoginService.authorizationHeader, "regularUserTestToken"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Use already used name
        updateBuilder = MockMvcRequestBuilders.multipart("/user/10001");
        updateBuilder.with(request -> {
            request.setMethod("PUT");
            return request;
        });
        mockMvc.perform(
                updateBuilder
                        .file(usedData)
                        .header(LoginService.authorizationHeader, "regularUserTestToken"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("message", is("Name is already used")))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Successful edit
        updateBuilder = MockMvcRequestBuilders.multipart("/user/10001");
        updateBuilder.with(request -> {
            request.setMethod("PUT");
            return request;
        });
        mockMvc.perform(
                updateBuilder
                        .file(validData)
                        .header(LoginService.authorizationHeader, "regularUserTestToken"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("data.name", is("NewName")));
    }
}