package se.backend.wrapper.dogs;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import se.backend.model.dogs.LostDog;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
public class LostDogWithBehaviors extends LostDog {
    private List<String> behaviors;

    public LostDogWithBehaviors(LostDogWithBehaviors another) {
        super(another);
        behaviors = another.behaviors;
    }

    public LostDogWithBehaviors(LostDog parent) {
        super(parent);
        behaviors = new ArrayList<String>();
    }

    public LostDog LostDogWithoutBehaviors(){
        var lostDog = new LostDog();
        lostDog.setDateLost(this.getDateLost());
        lostDog.setIsFound(this.isIsFound());
        lostDog.setOwnerId(this.getOwnerId());
        lostDog.setBreed(this.getBreed());
        lostDog.setAge(this.getAge());
        lostDog.setPictureId(this.getPictureId());
        lostDog.setSize(this.getSize());
        lostDog.setColor(this.getColor());
        lostDog.setSpecialMarks(this.getSpecialMarks());
        lostDog.setName(this.getName());
        lostDog.setHairLength(this.getHairLength());
        lostDog.setEarsType(this.getEarsType());
        lostDog.setTailLength(this.getTailLength());
        lostDog.setLocation(this.getLocation());
        lostDog.setId(this.getId());
        return lostDog;
    }
}