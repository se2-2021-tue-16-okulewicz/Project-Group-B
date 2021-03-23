package controller.internal;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import se.backend.SEBackend;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = SEBackend.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@AutoConfigureMockMvc
public class DogsControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void GetAllDogsTest() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/lostdogs")
                        .header("token", "authorization_token")
        ).andExpect(status().isOk())
            .andExpect(jsonPath("successful", is(true)))
            .andExpect(jsonPath("message", is("4 dog(s) found")))
            .andExpect(jsonPath("data", hasSize(4)))
            .andExpect(jsonPath("data[0].behaviors", hasSize(3)))
            .andExpect(jsonPath("data[1].picture.fileName", is("example3")))
            .andExpect(jsonPath("data[2].location.city", is("Lublin")));
    }

    @Test
    public void AddTest() throws Exception {

        MockMultipartFile dog = new MockMultipartFile("dog", "", "application/json", "{\"age\":9,\"breed\":\"random\",\"color\":\"pink\",\"earsType\":\"nie ma\",\"hairLength\":\"long\",\"name\":\"Pinky\",\"size\":\"big\",\"specialMarks\":\"none\",\"tailLength\":\"long\",\"dateLost\":\"2021-03-15\",\"location\":{\"city\":\"Lublin\",\"district\":\"LSM\"},\"behaviors\":[\"Barks loudly\",\"Wags its tail\"]}".getBytes());
        MockMultipartFile picture = new MockMultipartFile("picture", "image_name.txt", "text/plain", "This should be a picture but we don't have to check for it so it should succeed".getBytes());

        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/lostdogs")
                        .file(dog)
                        .file(picture)
                        .header("token", "authorization_token")
        ).andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("data.name", is("Pinky")))
                .andExpect(jsonPath("data.location.city", is("Lublin")))
                .andExpect(jsonPath("data.behaviors", hasSize(2)))
                .andExpect(jsonPath("data.picture.fileName", is("image_name.txt")));
    }

    @Test
    public void DeleteDogTest() throws Exception {

        mockMvc.perform(
                MockMvcRequestBuilders.delete("/lostdogs/10001")
                        .header("token", "authorization_token")
        ).andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)));

        mockMvc.perform(
                MockMvcRequestBuilders.delete("/lostdogs/-1")
                        .header("token", "authorization_token")
        ).andExpect(status().isBadRequest())
                .andExpect(jsonPath("successful", is(false)));
    }

    @Test
    public void GetDogDetailsTest() throws Exception {

        mockMvc.perform(
                MockMvcRequestBuilders.get("/lostdogs/10001")
                        .header("token", "authorization_token")
        ).andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)));

        mockMvc.perform(
                MockMvcRequestBuilders.get("/lostdogs/-1")
                        .header("token", "authorization_token")
        ).andExpect(status().isBadRequest())
                .andExpect(jsonPath("successful", is(false)));
    }
}
