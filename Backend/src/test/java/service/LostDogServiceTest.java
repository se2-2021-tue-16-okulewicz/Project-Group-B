package service;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.context.junit4.SpringRunner;
import se.backend.dao.LostDogRepository;
import se.backend.model.LostDog;
import se.backend.service.lostdogs.LostDogMainService;
import se.backend.service.lostdogs.LostDogService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LostDogServiceTest {

    private static LostDogRepository repository;
    private static LostDogService service;
    private static List<LostDog> allDogs;

    @BeforeAll
    public static void setupMock() {
        repository = Mockito.mock(LostDogRepository.class);
        service = new LostDogMainService(repository);

        LostDog dog1 = new LostDog();
        dog1.setDateLost(LocalDateTime.of(1999, 12, 12, 8, 57, 12, 0));
        dog1.setLostLocation("Lublin");
        dog1.setAge(12);
        dog1.setBreed("Idk");
        dog1.setColor("Blue");
        dog1.setEarsType("Long");
        dog1.setHairLength("Short");
        dog1.setId(1);
        dog1.setName("Unknown");
        dog1.setSize("Big");
        dog1.setSpecialMarks("Not a one");
        dog1.setTailLength("Short");

        LostDog dog2 = new LostDog();
        dog2.setDateLost(LocalDateTime.of(2002, 12, 12, 8, 57, 12, 0));
        dog2.setLostLocation("Warsaw");
        dog2.setAge(9);
        dog2.setBreed("Idk");
        dog2.setColor("Red");
        dog2.setEarsType("Short");
        dog2.setHairLength("Short");
        dog2.setId(2);
        dog2.setName("Simon");
        dog2.setSize("Small");
        dog2.setSpecialMarks("Gray ears");
        dog2.setTailLength("Short");

        LostDog dog3 = new LostDog();
        dog3.setDateLost(LocalDateTime.of(2021, 8, 8, 8, 8, 8, 0));
        dog3.setLostLocation("Warsaw");
        dog3.setAge(41);
        dog3.setBreed("German");
        dog3.setColor("Pink");
        dog3.setEarsType("Long");
        dog3.setHairLength("Long");
        dog3.setId(3);
        dog3.setName("Pinky");
        dog3.setSize("Big");
        dog3.setSpecialMarks("Nope");
        dog3.setTailLength("Long");

        allDogs = new ArrayList<LostDog>();
        allDogs.add(dog1);
        allDogs.add(dog2);
        allDogs.add(dog3);
    }

    @BeforeEach
    public void setupRepositoryBehaviour() {
        Mockito.when(repository.findAll(Mockito.any(Specification.class))).thenReturn(allDogs);
        Mockito.when(repository.save(Mockito.any(LostDog.class))).then(i -> {
            return i.getArgument(0);
        });
    }

    @Test
    public void GetAllDogsWithoutFiltersTest() {
        Specification<LostDog> filters = Specification.where(null);

        var dogs = service.GetLostDogs(filters);

        assertEquals(dogs.size(), 3);
    }

    @Test
    public void AddDogTest() {
        LostDog newDog = new LostDog();
        newDog.setId(4);

        var result = service.AddLostDog(newDog);

        assertEquals(result.getId(), 4);
    }
}
