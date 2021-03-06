package se.backend.service.lostdogs;

import org.javatuples.Pair;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import se.backend.model.Picture;
import se.backend.model.dogs.Lost.LostDog;
import se.backend.model.dogs.Lost.LostDogComment;
import se.backend.wrapper.comments.CommentWithAuthorAndPicture;
import se.backend.wrapper.dogs.LostDogWithBehaviors;
import se.backend.wrapper.dogs.LostDogWithBehaviorsAndWithPicture;
import se.backend.wrapper.dogs.LostDogWithBehaviorsPictureAndComments;

import java.util.List;

//TODO: Add comments to the dogs
public interface LostDogService {
    /**
     * First value is list of dogs, second value is total amount of pages
     */
    Pair<List<LostDogWithBehaviorsAndWithPicture>, Integer> GetLostDogs(Specification<LostDog> filters, Pageable page);
    LostDogWithBehaviorsAndWithPicture AddLostDog(LostDogWithBehaviors newDog, Picture picture, long ownerId);

    LostDogWithBehaviorsPictureAndComments GetDogDetails(long dogId);
    LostDogWithBehaviorsAndWithPicture UpdateDog(long dogId, LostDogWithBehaviors updatedDog, Picture picture, long ownerId);
    boolean DeleteDog(long dogId, long ownerId);

    boolean MarkLostDogAsFound(long dogId, long ownerId);

    //List<LostDog> GetUserDogs(long userId);


    //List<LostDogComments> GetComments(long lostDogId);
    CommentWithAuthorAndPicture AddCommentToDog(long lostDogId, LostDogComment comment, Picture picture, long authorId);
    CommentWithAuthorAndPicture EditDogComment(long commentId, LostDogComment updatedVersion, Picture picture, long authorId);
    boolean DeleteDogComment(long commentId, long authorId, boolean dogRemoved);
}
