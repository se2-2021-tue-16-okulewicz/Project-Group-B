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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import se.backend.SEBackend;
import se.backend.service.login.LoginService;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = SEBackend.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@AutoConfigureMockMvc
public class SheltersControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private static final byte[] validImageData = new byte[]{(byte)137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 2, 0, 0, 0, 2, 8, 2, 0, 0, 0, (byte)253, (byte)212, (byte)154, 115, 0, 0, 0, 1, 115, 82, 71, 66, 0, (byte)174, (byte)206, 28, (byte)233, 0, 0, 0, 4, 103, 65, 77, 65, 0, 0, (byte)177, (byte)143, 11, (byte)252, 97, 5, 0, 0, 0, 9, 112, 72, 89, 115, 0, 0, 14, (byte)195, 0, 0, 14, (byte)195, 1, (byte)199, 111, (byte)168, 100, 0, 0, 0, 22, 73, 68, 65, 84, 24, 87, 99, (byte)248, (byte)255, (byte)137, (byte)225, 127, (byte)189, 58, (byte)195, (byte)254, (byte)157, (byte)174, (byte)245, (byte)245, (byte)245, 0, 52, 35, 6, (byte)209, 36, (byte)215, 38, (byte)234, 0, 0, 0, 0, 73, 69, 78, 68, (byte)174, 66, 96, (byte)130};

    @Test
    public void GetShelterDogsTest() throws Exception {
        //Get all dogs
        mockMvc.perform(
                MockMvcRequestBuilders.get("/shelters/10001/dogs")
                        .header(LoginService.authorizationHeader, "regularUserTestToken")
        ).andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("message", is("2 dog(s) found")))
                .andExpect(jsonPath("data", hasSize(2)))
                .andExpect(jsonPath("data[0].behaviors", hasSize(1)))
                .andExpect(jsonPath("data[1].picture.fileName", is("example1")));

        //Unauthorized
        mockMvc.perform(
                MockMvcRequestBuilders.get("/shelters/10001/dogs")
                        .header(LoginService.authorizationHeader, "tokenIsInvalid")
        ).andExpect(status().isUnauthorized())
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Sorting
        mockMvc.perform(
                MockMvcRequestBuilders.get("/shelters/10002/dogs?sort=color,ASC")
                        .header(LoginService.authorizationHeader, "regularUserTestToken")
        ).andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("message", is("2 dog(s) found")))
                .andExpect(jsonPath("data", hasSize(2)))
                .andExpect(jsonPath("data[0].color", is("blonde")))
                .andExpect(jsonPath("data[1].color", is("pink")));
    }

    @Test
    public void AddTest() throws Exception {

        MockMultipartFile fullDog = new MockMultipartFile("dog", "", "application/json", "{\"age\":9,\"breed\":\"random\",\"color\":\"pink\",\"earsType\":\"nie ma\",\"hairLength\":\"long\",\"name\":\"Pinky\",\"size\":\"big\",\"specialMark\":\"none\",\"tailLength\":\"long\",\"behaviors\":[\"Barks loudly\",\"Wags its tail\"]}".getBytes());
        MockMultipartFile dogWithMissingElements = new MockMultipartFile("dog", "", "application/json", "{\"age\":9,\"color\":\"pink\",\"earsType\":\"\",\"hairLength\":\"long\",\"name\":\"\",\"size\":\"big\",\"specialMark\":\"none\",\"tailLength\":\"long\",\"behaviors\":[\"Barks loudly\",\"Wags its tail\"]}".getBytes());
        MockMultipartFile badlyFormattedDog = new MockMultipartFile("dog", "", "application/json", "{\"age\":9,\"breed\":\"random\",\"color\":\"pink\",\"earsType\":\"nie ma\",\"hairLength\":\"long\",\"name\":\"Pinky\",\"size\":\"big\",\"specialMark\":\"none\",\"tailLength\":\"long\",\"behaviors\":[\"Barks loudly\",\"Wags its tail\"]}".getBytes());


        MockMultipartFile validPicture = new MockMultipartFile("picture", "image_name.png", "image/png", validImageData);
        MockMultipartFile invalidPicture = new MockMultipartFile("picture", "image_name.png", "image/png", "I am not a real picture!!!".getBytes());

        //Valid dog
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/shelters/10001/dogs")
                        .file(fullDog)
                        .file(validPicture)
                        .header(LoginService.authorizationHeader, "shelterSecretTestToken")
        ).andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("data.name", is("Pinky")))
                .andExpect(jsonPath("data.behaviors", hasSize(2)))
                .andExpect(jsonPath("data.picture.fileName", is("image_name.png")))
                .andExpect(jsonPath("data.shelterId", is(10001)));

        //Unauthorized (adding as normal user not shelter owner)
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/shelters/10001/dogs")
                        .file(fullDog)
                        .file(validPicture)
                        .header(LoginService.authorizationHeader, "regularUserTestToken")
        ).andExpect(status().isUnauthorized())
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Invalid dog
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/shelters/10001/dogs")
                        .file(dogWithMissingElements)
                        .file(validPicture)
                        .header(LoginService.authorizationHeader, "shelterSecretTestToken")
        ).andExpect(status().isBadRequest())
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("message", is("Dog does not have complete data")))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Invalid picture
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/shelters/10001/dogs")
                        .file(fullDog)
                        .file(invalidPicture)
                        .header(LoginService.authorizationHeader, "shelterSecretTestToken")
        ).andExpect(status().isBadRequest())
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("message", is("Picture is not valid")))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));

        //Without picture
        mockMvc.perform(
                MockMvcRequestBuilders.multipart("/shelters/10001/dogs")
                        .file(fullDog)
                        .header(LoginService.authorizationHeader, "shelterSecretTestToken")
        ).andExpect(status().isBadRequest())
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("message", is("Missing part of a request")))
                .andExpect(jsonPath("data").value(IsNull.nullValue()));
    }

    @Test
    public void GetDogDetailsTest() throws Exception {

        //Getting existing dog
        mockMvc.perform(
                MockMvcRequestBuilders.get("/shelters/10001/dogs/10001")
                        .header(LoginService.authorizationHeader, "regularUserTestToken")
        ).andExpect(status().isOk())
                .andExpect(jsonPath("successful", is(true)))
                .andExpect(jsonPath("data.name", is("Pinky")))
                .andExpect(jsonPath("data.age", is(12)))
                .andExpect(jsonPath("data.picture.fileName", is("example1")));

        //Getting non-existing dog
        mockMvc.perform(
                MockMvcRequestBuilders.get("/shelters/10001/dogs/20001")
                        .header(LoginService.authorizationHeader, "regularUserTestToken")
        ).andExpect(status().isBadRequest())
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("message", is("Failed to fetch dog with id: 20001")));

        //Getting existing dog that is in another shelter
        mockMvc.perform(
                MockMvcRequestBuilders.get("/shelters/10002/dogs/10001")
                        .header(LoginService.authorizationHeader, "regularUserTestToken")
        ).andExpect(status().isBadRequest())
                .andExpect(jsonPath("successful", is(false)))
                .andExpect(jsonPath("message", is("This dog is not a part of the shelter")));
    }
}