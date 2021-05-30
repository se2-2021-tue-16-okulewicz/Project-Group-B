package se.backend.wrapper.dogs;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import se.backend.model.Picture;


@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class LostDogWithBehaviorsAndWithPicture extends LostDogWithBehaviors {
    private Picture picture;

    public LostDogWithBehaviorsAndWithPicture(LostDogWithBehaviors lostDogWithBehaviors) {
        super(lostDogWithBehaviors);
    }

    public LostDogWithBehaviorsAndWithPicture(LostDogWithBehaviorsAndWithPicture lostDogWithBehaviorsAndWithPicture) {
        super(lostDogWithBehaviorsAndWithPicture);
        picture = lostDogWithBehaviorsAndWithPicture.picture;
    }

}
