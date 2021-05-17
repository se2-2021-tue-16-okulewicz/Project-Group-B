package se.backend.service.shelters;

import org.javatuples.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import se.backend.dao.LostDogBehaviorRepository;
import se.backend.dao.PictureRepository;
import se.backend.dao.ShelterDogBehaviorRepository;
import se.backend.dao.ShelterDogRepository;
import se.backend.model.Picture;
import se.backend.model.dogs.DogBehavior;
import se.backend.model.dogs.Lost.LostDog;
import se.backend.model.dogs.Lost.LostDogBehavior;
import se.backend.model.dogs.Shelter.ShelterDog;
import se.backend.model.dogs.Shelter.ShelterDogBehavior;
import se.backend.service.lostdogs.LostDogMainService;
import se.backend.wrapper.dogs.LostDogWithBehaviors;
import se.backend.wrapper.dogs.LostDogWithBehaviorsAndWithPicture;
import se.backend.wrapper.dogs.ShelterDogWithBehaviors;
import se.backend.wrapper.dogs.ShelterDogWithBehaviorsAndWithPicture;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SheltersMainService implements SheltersService{
    private final Logger logger = LoggerFactory.getLogger(SheltersMainService.class);

    private final ShelterDogRepository shelterDogRepository;
    private final PictureRepository pictureRepository;
    private final ShelterDogBehaviorRepository dogBehaviorRepository;

    @Autowired
    public SheltersMainService(ShelterDogRepository shelterDogRepository, PictureRepository pictureRepository, ShelterDogBehaviorRepository dogBehaviorRepository) {
        this.shelterDogRepository = shelterDogRepository;
        this.pictureRepository = pictureRepository;
        this.dogBehaviorRepository = dogBehaviorRepository;
    }

    @Override
    public Pair<List<ShelterDogWithBehaviorsAndWithPicture>, Integer> GetShelterDogs(Specification<ShelterDog> filters, Pageable page) {
        var dogPage = shelterDogRepository.findAll(filters, page);
        var dogs = dogPage.getContent();
        var dogsWithBehaviorsAndPictures = new ArrayList<ShelterDogWithBehaviorsAndWithPicture>();

        for(var dog : dogs){
            var dogWithBehavior = new ShelterDogWithBehaviors(dog);

            var behaviors = dogBehaviorRepository.findAllByDogId(dog.getId());
            for(var behavior : behaviors) {
                dogWithBehavior.getBehaviors().add(behavior.getBehavior());
            }

            var dogWithBehaviorAndWithPicture = new ShelterDogWithBehaviorsAndWithPicture(dogWithBehavior);
            var picture = pictureRepository.findById(dog.getPictureId());
            dogWithBehaviorAndWithPicture.setPicture(picture.orElse(new Picture(-1, "", "", new byte[0])));
            dogsWithBehaviorsAndPictures.add(dogWithBehaviorAndWithPicture);
        }
        return new Pair<>(dogsWithBehaviorsAndPictures, dogPage.getTotalPages());
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public ShelterDogWithBehaviorsAndWithPicture AddShelterDog(ShelterDogWithBehaviors newDog, Picture picture, long shelterId) {
        ShelterDog dog = newDog.ShelterDogWithoutBehaviors();
        dog.setShelterId(shelterId);

        var savedPicture = pictureRepository.save(picture);
        dog.setPictureId(savedPicture.getId());

        var savedDog = shelterDogRepository.save(dog);

        var behaviors = new ArrayList<DogBehavior>();
        for (var behaviorName : newDog.getBehaviors() ) {
            var behavior = new ShelterDogBehavior();
            behavior.setDogId(savedDog.getId());
            behavior.setBehavior(behaviorName);
            behaviors.add(dogBehaviorRepository.save(behavior));
        }

        ShelterDogWithBehaviors savedDogWithBehaviors = new ShelterDogWithBehaviors(savedDog);
        savedDogWithBehaviors.setBehaviors(behaviors.stream().map(DogBehavior::getBehavior).collect(Collectors.toList()));
        var returnedDog = new ShelterDogWithBehaviorsAndWithPicture(savedDogWithBehaviors);
        returnedDog.setPicture(savedPicture);

        return returnedDog;
    }

    @Override
    public ShelterDogWithBehaviorsAndWithPicture GetDogDetails(long dogId)
    {
        if(IsInvalidDogId(dogId))
            return null;

        var dog = shelterDogRepository.findById(dogId);
        if(dog.isEmpty())
            return null;

        var picture = pictureRepository.findById(dog.get().getPictureId());
        var behaviors = dogBehaviorRepository.findAllByDogId(dogId);

        var behaviorStrings = new ArrayList<String>();
        for(var b : behaviors) {
            behaviorStrings.add(b.getBehavior());
        }

        ShelterDogWithBehaviors savedDogWithBehaviors = new ShelterDogWithBehaviors(dog.get());
        savedDogWithBehaviors.setBehaviors(behaviorStrings);

        var returnedDog = new ShelterDogWithBehaviorsAndWithPicture(savedDogWithBehaviors);

        returnedDog.setPicture(picture.orElse(new Picture(-1, "", "", new byte[0])));

        return returnedDog;
    }

    private boolean IsInvalidDogId(long dogId)
    {
        if(dogId < 0) return true;
        return !shelterDogRepository.existsById(dogId);
    }
}
