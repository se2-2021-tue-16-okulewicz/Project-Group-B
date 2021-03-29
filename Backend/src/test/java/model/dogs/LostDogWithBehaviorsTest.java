package model.dogs;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import se.backend.model.Location;
import se.backend.wrapper.dogs.LostDogWithBehaviors;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class LostDogWithBehaviorsTest {

    @Test
    public void FullDog() {
        var dog = new LostDogWithBehaviors();
        dog.setBreed("0");
        dog.setSize("a");
        dog.setColor("b");
        dog.setSpecialMarks("c");
        dog.setName("d");
        dog.setHairLength("e");
        dog.setEarsType("f");
        dog.setTailLength("g");
        dog.setEarsType("h");
        dog.setTailLength("i");
        dog.setLocation(new Location());
        dog.getLocation().setCity("j");
        dog.getLocation().setDistrict("k");
        dog.setDateLost(LocalDate.now());
        dog.setBehaviors(List.of("l", "m"));

        assertTrue(dog.IsValid());
    }

    @Test
    public void EmptyBehaviors() {
        var dog = new LostDogWithBehaviors();
        dog.setBreed("0");
        dog.setSize("a");
        dog.setColor("b");
        dog.setSpecialMarks("c");
        dog.setName("d");
        dog.setHairLength("e");
        dog.setEarsType("f");
        dog.setTailLength("g");
        dog.setEarsType("h");
        dog.setTailLength("i");
        dog.setLocation(new Location());
        dog.getLocation().setCity("j");
        dog.getLocation().setDistrict("k");
        dog.setDateLost(LocalDate.now());
        dog.setBehaviors(new ArrayList<>());

        assertFalse(dog.IsValid());
    }

    @Test
    public void NoLocation() {
        var dog = new LostDogWithBehaviors();
        dog.setBreed("0");
        dog.setSize("a");
        dog.setColor("b");
        dog.setSpecialMarks("c");
        dog.setName("d");
        dog.setHairLength("e");
        dog.setEarsType("f");
        dog.setTailLength("g");
        dog.setEarsType("h");
        dog.setTailLength("i");
        //dog.setLocation(new Location());
        //dog.getLocation().setCity("j");
        //dog.getLocation().setDistrict("k");
        dog.setDateLost(LocalDate.now());
        dog.setBehaviors(List.of("l", "m"));

        assertFalse(dog.IsValid());
    }

    @Test
    public void NoLostDate() {
        var dog = new LostDogWithBehaviors();
        dog.setBreed("0");
        dog.setSize("a");
        dog.setColor("b");
        dog.setSpecialMarks("c");
        dog.setName("d");
        dog.setHairLength("e");
        dog.setEarsType("f");
        dog.setTailLength("g");
        dog.setEarsType("h");
        dog.setTailLength("i");
        dog.setLocation(new Location());
        dog.getLocation().setCity("j");
        dog.getLocation().setDistrict("k");
        //dog.setDateLost(LocalDate.now());
        dog.setBehaviors(List.of("l", "m"));

        assertFalse(dog.IsValid());
    }

    @Test
    public void MissingElement() {
        var dog = new LostDogWithBehaviors();
        dog.setBreed("0");
        dog.setSize("a");
        dog.setColor("b");
        dog.setSpecialMarks("c");
        //dog.setName("d");
        dog.setHairLength("e");
        dog.setEarsType("f");
        dog.setTailLength("g");
        dog.setEarsType("h");
        dog.setTailLength("i");
        dog.setLocation(new Location());
        dog.getLocation().setCity("j");
        dog.getLocation().setDistrict("k");
        dog.setDateLost(LocalDate.now());
        dog.setBehaviors(List.of("l", "m"));

        assertFalse(dog.IsValid());
    }
}
