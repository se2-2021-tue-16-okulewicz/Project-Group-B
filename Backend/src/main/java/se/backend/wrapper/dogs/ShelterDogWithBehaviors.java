package se.backend.wrapper.dogs;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import se.backend.model.dogs.Dog;
import se.backend.model.dogs.Shelter.ShelterDog;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
public class ShelterDogWithBehaviors extends ShelterDog {
    private List<String> behaviors;

    public ShelterDogWithBehaviors(ShelterDogWithBehaviors another) {
        super(another);
        behaviors = another.behaviors;
    }

    public ShelterDogWithBehaviors(ShelterDog parent) {
        super(parent);
        behaviors = new ArrayList<String>();
    }

    public ShelterDog ShelterDogWithoutBehaviors() {
        var dog = new ShelterDog();
        dog.setBreed(this.getBreed());
        dog.setAge(this.getAge());
        dog.setSize(this.getSize());
        dog.setColor(this.getColor());
        dog.setSpecialMark(this.getSpecialMark());
        dog.setName(this.getName());
        dog.setHairLength(this.getHairLength());
        dog.setEarsType(this.getEarsType());
        dog.setTailLength(this.getTailLength());
        return dog;
    }

    public boolean IsValid() {
        if(behaviors == null || behaviors.size() == 0)
            return false;
        return super.IsValid();
    }
}
