package se.backend.wrapper.dogs;

import lombok.Data;
import lombok.EqualsAndHashCode;
import se.backend.model.Picture;

@EqualsAndHashCode(callSuper = true)
@Data
public class ShelterDogWithBehaviorsAndWithPicture extends ShelterDogWithBehaviors {
    private Picture picture;

    public ShelterDogWithBehaviorsAndWithPicture(ShelterDogWithBehaviors shelterDogWithBehaviors) {
        super(shelterDogWithBehaviors);
    }
}
