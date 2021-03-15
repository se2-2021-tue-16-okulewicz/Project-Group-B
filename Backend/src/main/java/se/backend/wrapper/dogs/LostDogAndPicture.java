package se.backend.wrapper.dogs;

import lombok.Data;
import se.backend.model.Picture;
import se.backend.model.dogs.LostDog;

@Data
public class LostDogAndPicture {
    private LostDog lostDog;
    private Picture picture;
}
