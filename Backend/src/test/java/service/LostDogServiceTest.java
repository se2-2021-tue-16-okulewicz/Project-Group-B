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

import static org.junit.jupiter.api.Assertions.*;


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
        assertEquals(allDogs.getValue0().size(), 4);

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

        var result1 = service.AddLostDog(newDogBeh1, pic1, 10001);
        var result2 = service.AddLostDog(newDogBeh2, pic2, 10002);
        var result3 = service.AddLostDog(newDogBeh3, pic3, 10003);

        //Checking results of adding
        assertEquals("Name1", result1.getName());
        assertEquals(0, result1.getBehaviors().size());
        assertEquals("exampleFile1", result1.getPicture().getFileName());
        assertEquals(10001, result1.getOwnerId());

        assertEquals("Name2", result2.getName());
        assertEquals(1, result2.getBehaviors().size());
        assertEquals("exampleFile2", result2.getPicture().getFileName());
        assertEquals(10002, result2.getOwnerId());

        assertEquals("Name3", result3.getName());
        assertEquals(2, result3.getBehaviors().size());
        assertEquals("exampleFile3", result3.getPicture().getFileName());
        assertEquals(10003, result3.getOwnerId());

        //Getting all dogs again
        allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.getValue0().size(), 7);
    }

    @Test
    public void DeleteDogTest() {
        // Checking initial size
        var allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.getValue0().size(), 4);

        var res = service.DeleteDog(10001, 10001);
        assertTrue(res);

        var res2 = service.DeleteDog(-1, 0);
        assertFalse(res2);

        // Getting all dogs one final time
        allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.getValue0().size(), 3);
    }

    @Test
    public void UpdateDogTest() {
        // Checking initial size
        var allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.getValue0().size(), 4);
        assertEquals(allDogs.getValue1(), 1);

        // Adding dogs
        LostDog newDog1 = new LostDog();
        Picture pic1 = new Picture();
        newDog1.setName("Name1");
        pic1.setFileName("exampleFile1");
        LostDogWithBehaviors newDogBeh1 = new LostDogWithBehaviors(newDog1);

        var result1 = service.AddLostDog(newDogBeh1, pic1, 10001);

        // Make changes
        Picture pic2 = new Picture();
        result1.setName("Name2");
        pic2.setFileName("exampleFile2");
        LostDogWithBehaviors newDogBeh2 = new LostDogWithBehaviors(result1);

        assertEquals(result1.getId(),newDogBeh2.getId());

        var result2 = service.UpdateDog(result1.getId(), newDogBeh2, pic2, 10001);


        assertEquals("Name2", result2.getName());
        assertEquals(0, result2.getBehaviors().size());
        assertEquals("exampleFile2", result2.getPicture().getFileName());
        assertEquals(10001, result2.getOwnerId());

        // This dog is not in the database.
        LostDog newDog3 = new LostDog();
        newDog3.setId(9999);
        newDog3.setName("Name3");
        LostDogWithBehaviors newDogBeh3 = new LostDogWithBehaviors(newDog3);
        Picture pic3 = new Picture();
        pic3.setFileName("exampleFile3");

        var result3 = service.UpdateDog(newDog3.getId(), newDogBeh3, pic3, 10001);

        assertNull(result3);

        //Getting all dogs again
        allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(5, allDogs.getValue0().size());
    }

    @Test
    public void GetDogDetailsTest()
    {
        // Checking initial size
        var allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.getValue0().size(), 4);

        var result1 = service.GetDogDetails(10001);
        var result2 = service.GetDogDetails(-1);

        // Checks
        assertEquals("Pinky", result1.getName());
        assertEquals(10001, result1.getPictureId());
        assertNull(result2);

        //Getting all dogs again
        allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.getValue0().size(), 4);
    }

    @Test
    public void FilteredDogsTests() {
        var lublinDogs = service.GetLostDogs(Specification.where(isFromLublin()), PageRequest.of(0, 15));
        var warsawDogs = service.GetLostDogs(Specification.where(isFromWarsaw()), PageRequest.of(0, 15));
        var allDogsWithOr = service.GetLostDogs(Specification.where(isFromLublin()).or(isFromWarsaw()), PageRequest.of(0, 15));

        assertEquals(3, lublinDogs.getValue0().size());
        assertEquals(1, warsawDogs.getValue0().size());
        assertEquals(4, allDogsWithOr.getValue0().size());
    }

    @Test
    public void MarkLostDogAsFoundTest() {
       //Check if dog is found - should be false
       var result1 = service.GetDogDetails(10001);
       assertFalse(result1.isIsFound());

       //Mark as found
       var markResult1 = service.MarkLostDogAsFound(10001, 10001);
       assertTrue(markResult1);

        //Check if dog is found - should be true now
        var result2 = service.GetDogDetails(10001);
        assertTrue(result2.isIsFound());

        //Mark as found again - should return true but not change anything
        var markResult2 = service.MarkLostDogAsFound(10001, 10001);
        assertTrue(markResult2);

        //Check if dog is found - should be still true
        var result3 = service.GetDogDetails(10001);
        assertTrue(result3.isIsFound());

        //Check if another dog is found - should be false
        var result4 = service.GetDogDetails(10003);
        assertFalse(result4.isIsFound());

        //Try to mark non-existing dog as found
        var markResult3 = service.MarkLostDogAsFound(20001, 0);
        assertFalse(markResult3);
    }
}
