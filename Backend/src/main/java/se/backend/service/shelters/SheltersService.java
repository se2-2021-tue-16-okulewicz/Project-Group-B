package se.backend.service.shelters;

import org.javatuples.Pair;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import se.backend.model.Picture;
import se.backend.model.account.Shelter;
import se.backend.model.dogs.Shelter.ShelterDog;
import se.backend.wrapper.dogs.LostDogWithBehaviors;
import se.backend.wrapper.dogs.LostDogWithBehaviorsAndWithPicture;
import se.backend.wrapper.dogs.ShelterDogWithBehaviors;
import se.backend.wrapper.dogs.ShelterDogWithBehaviorsAndWithPicture;
import se.backend.wrapper.shelters.ShelterInformation;

import java.util.List;

public interface SheltersService {

    /**
     * First value is list of dogs, second value is total amount of pages
     */
    Pair<List<ShelterInformation>, Integer> GetShelters(Specification<Shelter> filters, Pageable page);

    /**
     * First value is list of dogs, second value is total amount of pages
     */
    Pair<List<ShelterDogWithBehaviorsAndWithPicture>, Integer> GetShelterDogs(Specification<ShelterDog> filters, Pageable page);

    ShelterDogWithBehaviorsAndWithPicture AddShelterDog(ShelterDogWithBehaviors newDog, Picture picture, long shelterId);

    ShelterDogWithBehaviorsAndWithPicture UpdateDog(long dogId, ShelterDogWithBehaviors updatedDog, Picture picture, long shelterId);

    ShelterDogWithBehaviorsAndWithPicture GetDogDetails(long dogId);

    boolean DeleteDog(long dogId, long shelterId);

    ShelterInformation GetOneShelter(long shelterId);
}
