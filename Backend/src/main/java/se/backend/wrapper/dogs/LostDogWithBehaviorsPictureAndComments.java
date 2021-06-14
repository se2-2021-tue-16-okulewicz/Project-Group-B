package se.backend.wrapper.dogs;

import lombok.Data;
import lombok.EqualsAndHashCode;
import se.backend.wrapper.comments.CommentWithAuthorAndPicture;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class LostDogWithBehaviorsPictureAndComments extends LostDogWithBehaviorsAndWithPicture {
    List<CommentWithAuthorAndPicture> comments;

    public LostDogWithBehaviorsPictureAndComments(LostDogWithBehaviorsAndWithPicture lostDogWithBehaviorsAndWithPicture) {
        super(lostDogWithBehaviorsAndWithPicture);
    }
}
