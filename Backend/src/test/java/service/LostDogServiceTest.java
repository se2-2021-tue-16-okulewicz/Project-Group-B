package service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.annotation.DirtiesContext;
import se.backend.SEBackend;
import se.backend.model.dogs.LostDog;
import se.backend.service.lostdogs.LostDogService;

import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest(classes = SEBackend.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
public class LostDogServiceTest {

   @Autowired
   private LostDogService service;

   private static Specification<LostDog> isFromLublin() {
       return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("lostLocation"), "Lublin");
   }

    private static Specification<LostDog> isFromWarsaw() {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("lostLocation"), "Warsaw");
    }

    @Test
    public void AddLostDogTest() {

        //Checking initial size
        var allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.size(), 4);

        //Adding dogs
        LostDog newDog1 = new LostDog();
        newDog1.setLostLocation("Lublin");

        LostDog newDog2 = new LostDog();
        newDog2.setLostLocation("Lublin");

        LostDog newDog3 = new LostDog();
        newDog3.setLostLocation("Warsaw");

        var result1 = service.AddLostDog(newDog1);
        var result2 = service.AddLostDog(newDog2);
        var result3 = service.AddLostDog(newDog3);

        //Checking results of adding
        assertEquals("Lublin", result1.getLostLocation());
        assertEquals("Lublin", result2.getLostLocation());
        assertEquals("Warsaw", result3.getLostLocation());

        //Getting all dogs again
        allDogs = service.GetLostDogs(Specification.where(null), PageRequest.of(0, 15));
        assertEquals(allDogs.size(), 7);
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
