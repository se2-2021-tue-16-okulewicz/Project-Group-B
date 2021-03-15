package se.backend.wrapper.dogs;

import lombok.Data;
import lombok.EqualsAndHashCode;
import se.backend.model.Picture;


@EqualsAndHashCode(callSuper = true)
@Data
public class LostDogWithBehaviorsAndWithPicture extends LostDogWithBehaviors {
    private Picture picture;
}
