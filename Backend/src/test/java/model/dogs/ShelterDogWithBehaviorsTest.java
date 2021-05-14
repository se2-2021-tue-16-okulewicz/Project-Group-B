package model.dogs;

import org.junit.jupiter.api.Test;
import se.backend.model.Location;
import se.backend.wrapper.dogs.LostDogWithBehaviors;
import se.backend.wrapper.dogs.ShelterDogWithBehaviors;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ShelterDogWithBehaviorsTest {

    @Test
    public void FullDog() {
        var dog = new ShelterDogWithBehaviors();
        dog.setBreed("0");
        dog.setSize("a");
        dog.setColor("b");
        dog.setSpecialMark("c");
        dog.setName("d");
        dog.setHairLength("e");
        dog.setEarsType("f");
        dog.setTailLength("g");
        dog.setEarsType("h");
        dog.setTailLength("i");
        dog.setBehaviors(List.of("l", "m"));

        assertTrue(dog.IsValid());
    }

    @Test
    public void EmptyBehaviors() {
        var dog = new ShelterDogWithBehaviors();
        dog.setBreed("0");
        dog.setSize("a");
        dog.setColor("b");
        dog.setSpecialMark("c");
        dog.setName("d");
        dog.setHairLength("e");
        dog.setEarsType("f");
        dog.setTailLength("g");
        dog.setEarsType("h");
        dog.setTailLength("i");
        dog.setBehaviors(new ArrayList<>());

        assertFalse(dog.IsValid());
    }

    @Test
    public void MissingElement() {
        var dog = new ShelterDogWithBehaviors();
        dog.setBreed("0");
        dog.setSize("a");
        dog.setColor("b");
        dog.setSpecialMark("c");
        //dog.setName("d");
        dog.setHairLength("e");
        dog.setEarsType("f");
        dog.setTailLength("g");
        dog.setEarsType("h");
        dog.setTailLength("i");
        dog.setBehaviors(List.of("l", "m"));

        assertFalse(dog.IsValid());
    }
}