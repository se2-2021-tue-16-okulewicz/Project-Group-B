package se.backend.service.lostdogs;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import se.backend.model.Picture;
import se.backend.model.dogs.LostDog;
import se.backend.wrapper.dogs.LostDogWithBehaviors;
import se.backend.wrapper.dogs.LostDogWithBehaviorsAndWithPicture;

import java.util.List;

//TODO: Uncomment and implement the rest of the functions
//TODO: Update signatures to use proper wrappers
//TODO: Add comments to the dogs
public interface LostDogService {
    List<LostDogWithBehaviorsAndWithPicture> GetLostDogs(Specification<LostDog> filters, Pageable page);
    LostDogWithBehaviorsAndWithPicture AddLostDog(LostDogWithBehaviors newDog, Picture picture, long ownerId);

    LostDogWithBehaviorsAndWithPicture GetDogDetails(long dogId);
    LostDogWithBehaviorsAndWithPicture UpdateDog(long dogId, LostDogWithBehaviors updatedDog, Picture picture, long ownerId);
    boolean DeleteDog(long dogId);

    boolean MarkLostDogAsFound(long dogId);

    //List<LostDog> GetUserDogs(long userId);


    //List<LostDogComments> GetComments(long lostDogId);
    //boolean AddCommentToDog(long lostDogId, LostDogComment comment);
    //boolean EditDogComment(long commentId, LostDogComment updatedVersion);
}
