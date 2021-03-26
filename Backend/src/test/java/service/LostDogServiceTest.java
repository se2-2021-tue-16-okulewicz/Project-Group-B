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
import se.backend.model.dogs.LostDog;
import se.backend.service.lostdogs.LostDogService;
import se.backend.wrapper.dogs.LostDogWithBehaviors;

import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest(classes = SEBackend.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
public class LostDogServiceTest {

   @Autowired
   private LostDogService service;

   private static Specification<LostDog> isFromLublin() {
       return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("location").get("city"), "Lublin");
   }

    private static Specification<LostDog> isFromWarsaw() {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("location").get("city"), "Warsaw");
    }

    @Test
    public void AddLostDogTest() {

        //Checking initial size
        var allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.size(), 4);

        //Adding dogs
        LostDog newDog1 = new LostDog();
        newDog1.setName("Name1");
        LostDogWithBehaviors newDogBeh1 = new LostDogWithBehaviors(newDog1);
        Picture pic1 = new Picture();
        pic1.setFileName("exampleFile1");

        LostDog newDog2 = new LostDog();
        newDog2.setName("Name2");
        LostDogWithBehaviors newDogBeh2 = new LostDogWithBehaviors(newDog2);
        newDogBeh2.getBehaviors().add("Barks");
        Picture pic2 = new Picture();
        pic2.setFileName("exampleFile2");

        LostDog newDog3 = new LostDog();
        newDog3.setName("Name3");
        LostDogWithBehaviors newDogBeh3 = new LostDogWithBehaviors(newDog3);
        newDogBeh3.getBehaviors().add("Wags tail");
        newDogBeh3.getBehaviors().add("Drinks milk");
        Picture pic3 = new Picture();
        pic3.setFileName("exampleFile3");

        var result1 = service.AddLostDog(newDogBeh1, pic1);
        var result2 = service.AddLostDog(newDogBeh2, pic2);
        var result3 = service.AddLostDog(newDogBeh3, pic3);

        //Checking results of adding
        assertEquals("Name1", result1.getName());
        assertEquals(0, result1.getBehaviors().size());
        assertEquals("exampleFile1", result1.getPicture().getFileName());

        assertEquals("Name2", result2.getName());
        assertEquals(1, result2.getBehaviors().size());
        assertEquals("exampleFile2", result2.getPicture().getFileName());

        assertEquals("Name3", result3.getName());
        assertEquals(2, result3.getBehaviors().size());
        assertEquals("exampleFile3", result3.getPicture().getFileName());

        //Getting all dogs again
        allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.size(), 7);
    }

    @Test
    public void DeleteDogTest() {
        // Checking initial size
        var allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.size(), 4);

        var res = service.DeleteDog(10001);
        assertEquals(res,true);

        var res2 = service.DeleteDog(-1);
        assertEquals(res2,false);

        // Getting all dogs one final time
        allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.size(), 3);
    }

    @Test
    public void UpdateDogTest() {
        // Checking initial size
        var allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.size(), 4);

        // Adding dogs
        LostDog newDog1 = new LostDog();
        Picture pic1 = new Picture();
        newDog1.setName("Name1");
        pic1.setFileName("exampleFile1");
        LostDogWithBehaviors newDogBeh1 = new LostDogWithBehaviors(newDog1);

        var result1 = service.AddLostDog(newDogBeh1, pic1);

        // Make changes
        Picture pic2 = new Picture();
        result1.setName("Name2");
        pic2.setFileName("exampleFile2");
        LostDogWithBehaviors newDogBeh2 = new LostDogWithBehaviors(result1);

        assertEquals(result1.getId(),newDogBeh2.getId());

        var result2 = service.UpdateDog(result1.getId(), newDogBeh2, pic2);


        assertEquals("Name2", result2.getName());
        assertEquals(0, result2.getBehaviors().size());
        assertEquals("exampleFile2", result2.getPicture().getFileName());

        // This dog is not in the database.
        LostDog newDog3 = new LostDog();
        newDog3.setId(9999);
        newDog3.setName("Name3");
        LostDogWithBehaviors newDogBeh3 = new LostDogWithBehaviors(newDog3);
        Picture pic3 = new Picture();
        pic3.setFileName("exampleFile3");

        var result3 = service.UpdateDog(newDog3.getId(), newDogBeh3, pic3);

        assertEquals(null, result3);

        //Getting all dogs again
        allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(5, allDogs.size());
    }

    @Test
    public void GetDogDetailsTest()
    {
        // Checking initial size
        var allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.size(), 4);

        var result1 = service.GetDogDetails(10001);
        var result2 = service.GetDogDetails(-1);

        // Checks
        assertEquals("Pinky", result1.getName());
        assertEquals(10001, result1.getPictureId());
        assertEquals(null, result2);

        //Getting all dogs again
        allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.size(), 4);
    }

    @Test
    public void FilteredDogsTests() {
        var lublinDogs = service.GetLostDogs(Specification.where(isFromLublin()), PageRequest.of(0, 15));
        var warsawDogs = service.GetLostDogs(Specification.where(isFromWarsaw()), PageRequest.of(0, 15));
        var allDogsWithOr = service.GetLostDogs(Specification.where(isFromLublin()).or(isFromWarsaw()), PageRequest.of(0, 15));

        assertEquals(3, lublinDogs.size());
        assertEquals(1, warsawDogs.size());
        assertEquals(4, allDogsWithOr.size());
    }
}
