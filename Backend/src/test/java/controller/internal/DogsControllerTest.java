package controller.internal;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import se.backend.SEBackend;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = SEBackend.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@AutoConfigureMockMvc
public class DogsControllerTest {
    @Autowired
    private MockMvc mockMvc;

    private static final byte[] validImageData = new byte[]{(byte)137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 2, 0, 0, 0, 2, 8, 2, 0, 0, 0, (byte)253, (byte)212, (byte)154, 115, 0, 0, 0, 1, 115, 82, 71, 66, 0, (byte)174, (byte)206, 28, (byte)233, 0, 0, 0, 4, 103, 65, 77, 65, 0, 0, (byte)177, (byte)143, 11, (byte)252, 97, 5, 0, 0, 0, 9, 112, 72, 89, 115, 0, 0, 14, (byte)195, 0, 0, 14, (byte)195, 1, (byte)199, 111, (byte)168, 100, 0, 0, 0, 22, 73, 68, 65, 84, 24, 87, 99, (byte)248, (byte)255, (byte)137, (byte)225, 127, (byte)189, 58, (byte)195, (byte)254, (byte)157, (byte)174, (byte)245, (byte)245, (byte)245, 0, 52, 35, 6, (byte)209, 36, (byte)215, 38, (byte)234, 0, 0, 0, 0, 73, 69, 78, 68, (byte)174, 66, 96, (byte)130};

    @Test
    public void GetAllDogsTest() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/lostdogs")
                        .header("token", "regularUserTestToken")
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
        MockMultipartFile picture = new MockMultipartFile("picture", "image_name.png", "image/png", validImageData);

        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/lostdogs")
                        .file(dog)
                        .file(picture)
                        .header("token", "regularUserTestToken")
        ).andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("data.name", is("Pinky")))
                .andExpect(jsonPath("data.location.city", is("Lublin")))
                .andExpect(jsonPath("data.behaviors", hasSize(2)))
                .andExpect(jsonPath("data.picture.fileName", is("image_name.png")))
                .andExpect(jsonPath("data.ownerId", is(10001)));
    }

    @Test
    public void DeleteDogTest() throws Exception {

        mockMvc.perform(
                MockMvcRequestBuilders.delete("/lostdogs/10001")
                        .header("token", "regularUserTestToken")
        ).andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("data", is(true)));

        mockMvc.perform(
                MockMvcRequestBuilders.delete("/lostdogs/-1")
                        .header("token", "regularUserTestToken")
        ).andExpect(status().isBadRequest())
                .andExpect(jsonPath("successful", is(false)));
    }

    @Test
    public void GetDogDetailsTest() throws Exception {

        mockMvc.perform(
                MockMvcRequestBuilders.get("/lostdogs/10001")
                        .header("token", "regularUserTestToken")
        ).andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("data.name", is("Pinky")))
                .andExpect(jsonPath("data.age", is(12)))
                .andExpect(jsonPath("data.picture.fileName", is("example1")));

        mockMvc.perform(
                MockMvcRequestBuilders.get("/lostdogs/20001")
                        .header("token", "regularUserTestToken")
        ).andExpect(status().isBadRequest())
                .andExpect(jsonPath("successful", is(false)));
    }

    @Test
    public void UpdateDogTest() throws Exception {

        MockMultipartFile dog = new MockMultipartFile("dog", "", "application/json", "{\"age\":9,\"breed\":\"random\",\"color\":\"pink\",\"earsType\":\"nie ma\",\"hairLength\":\"long\",\"name\":\"John\",\"size\":\"big\",\"specialMarks\":\"none\",\"tailLength\":\"long\",\"dateLost\":\"2021-03-15\",\"location\":{\"city\":\"Lublin\",\"district\":\"LSM\"},\"behaviors\":[\"Barks loudly\",\"Wags its tail\"]}".getBytes());
        MockMultipartFile picture = new MockMultipartFile("picture", "image_name.png", "image/png", validImageData);

        MockMultipartHttpServletRequestBuilder builder = MockMvcRequestBuilders.multipart("/lostdogs/10001");
        builder.with(request -> {
            request.setMethod("PUT");
            return request;
        });
        mockMvc.perform(builder
                .file(dog)
                .file(picture)
                .header("token", "regularUserTestToken")
        ).andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("data.name", is("John")))
                .andExpect(jsonPath("data.age", is(9)))
                .andExpect(jsonPath("data.ownerId", is(10001)))
                .andExpect(jsonPath("data.picture.fileName", is("image_name.png")));



        builder = MockMvcRequestBuilders.multipart("/lostdogs/20001");
        builder.with(request -> {
            request.setMethod("PUT");
            return request;
        });

        mockMvc.perform(builder
                .file(dog)
                .file(picture)
                .header("token", "regularUserTestToken")
        ).andExpect(status().isBadRequest())
                .andExpect(jsonPath("successful", is(false)));
    }
}
