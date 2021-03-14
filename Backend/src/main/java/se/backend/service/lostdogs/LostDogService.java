package se.backend.service.lostdogs;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import se.backend.model.LostDog;

import java.util.List;

//TODO: Uncomment and implement the rest of the functions
public interface LostDogService {
    List<LostDog> GetLostDogs(Specification<LostDog> filters, Pageable page);
    //LostDog GetDogDetails(long dogId);
    LostDog AddLostDog(LostDog dog);
    //LostDog UpdateDog(LostDog updatedVersion);
    //boolean DeleteDog(long dogId);

    //List<LostDog> GetUserDogs(long userId);


    //List<LostDogComments> GetComments(long lostDogId);
    //boolean AddCommentToDog(long lostDogId, LostDogComment comment);
    //boolean EditDogComment(long commentId, LostDogComment updatedVersion);
}
