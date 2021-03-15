package se.backend.wrapper.dogs;

import lombok.Data;
import se.backend.model.Picture;

@Data
public class LostDogWithBehaviorsAndPicture {
    private LostDogWithBehaviors dog;
    private Picture picture;
}
