package service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.annotation.DirtiesContext;
import se.backend.SEBackend;
import se.backend.model.Picture;
import se.backend.model.dogs.Lost.LostDog;
import se.backend.model.dogs.Shelter.ShelterDog;
import se.backend.service.lostdogs.LostDogService;
import se.backend.service.shelters.SheltersService;
import se.backend.wrapper.dogs.LostDogWithBehaviors;
import se.backend.wrapper.dogs.ShelterDogWithBehaviors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@SpringBootTest(classes = SEBackend.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
public class SheltersServiceTest {

    @Autowired
    private SheltersService service;

    private static Specification<LostDog> isFromLublin() {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("location").get("city"), "Lublin");
    }

    private static Specification<LostDog> isFromWarsaw() {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("location").get("city"), "Warsaw");
    }

    @Test
    public void AddShelterDogTest() {

        //Checking initial size
        var allDogs = service.GetShelterDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(4, allDogs.getValue0().size());

        //Adding dogs
        ShelterDog newDog1 = new ShelterDog();
        newDog1.setName("Name1");
        ShelterDogWithBehaviors newDogBeh1 = new ShelterDogWithBehaviors(newDog1);
        Picture pic1 = new Picture();
        pic1.setFileName("exampleFile1");

        ShelterDog newDog2 = new ShelterDog();
        newDog2.setName("Name2");
        ShelterDogWithBehaviors newDogBeh2 = new ShelterDogWithBehaviors(newDog2);
        newDogBeh2.getBehaviors().add("Barks");
        Picture pic2 = new Picture();
        pic2.setFileName("exampleFile2");

        ShelterDog newDog3 = new ShelterDog();
        newDog3.setName("Name3");
        ShelterDogWithBehaviors newDogBeh3 = new ShelterDogWithBehaviors(newDog3);
        newDogBeh3.getBehaviors().add("Wags tail");
        newDogBeh3.getBehaviors().add("Drinks milk");
        Picture pic3 = new Picture();
        pic3.setFileName("exampleFile3");

        var result1 = service.AddShelterDog(newDogBeh1, pic1, 10001);
        var result2 = service.AddShelterDog(newDogBeh2, pic2, 10002);
        var result3 = service.AddShelterDog(newDogBeh3, pic3, 10003);

        //Checking results of adding
        assertEquals("Name1", result1.getName());
        assertEquals(0, result1.getBehaviors().size());
        assertEquals("exampleFile1", result1.getPicture().getFileName());
        assertEquals(10001, result1.getShelterId());

        assertEquals("Name2", result2.getName());
        assertEquals(1, result2.getBehaviors().size());
        assertEquals("exampleFile2", result2.getPicture().getFileName());
        assertEquals(10002, result2.getShelterId());

        assertEquals("Name3", result3.getName());
        assertEquals(2, result3.getBehaviors().size());
        assertEquals("exampleFile3", result3.getPicture().getFileName());
        assertEquals(10003, result3.getShelterId());

        //Getting all dogs again
        allDogs = service.GetShelterDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(7, allDogs.getValue0().size());
    }

    @Test
    public void GetDogDetailsTest()
    {
        // Checking initial size
        var allDogs = service.GetShelterDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.getValue0().size(), 4);

        var result1 = service.GetDogDetails(10001);
        var result2 = service.GetDogDetails(-1);

        // Checks
        assertEquals("Pinky", result1.getName());
        assertEquals(10005, result1.getPictureId());
        assertNull(result2);

        //Getting all dogs again
        allDogs = service.GetShelterDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.getValue0().size(), 4);
    }
}
