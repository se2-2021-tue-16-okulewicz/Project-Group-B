package se.backend.wrapper.dogs;

import lombok.Data;
import lombok.EqualsAndHashCode;
import se.backend.model.Picture;
import se.backend.model.dogs.LostDog;


@EqualsAndHashCode(callSuper = true)
@Data
public class LostDogWithPicture extends LostDog {
    private Picture picture;
}
