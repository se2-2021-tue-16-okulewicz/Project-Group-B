package se.backend.service.lostdogs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import se.backend.dao.DogBehaviorRepository;
import se.backend.dao.LostDogRepository;
import se.backend.dao.PictureRepository;
import se.backend.model.Picture;
import se.backend.model.dogs.DogBehavior;
import se.backend.model.dogs.LostDog;
import se.backend.wrapper.dogs.LostDogWithBehaviors;
import se.backend.wrapper.dogs.LostDogWithBehaviorsAndWithPicture;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@Service
public class LostDogMainService implements LostDogService{
    private final Logger logger = LoggerFactory.getLogger(LostDogMainService.class);

    private final LostDogRepository lostDogRepository;
    private final PictureRepository pictureRepository;
    private final DogBehaviorRepository dogBehaviorRepository;

    @Autowired
    public LostDogMainService(LostDogRepository lostDogRepository, PictureRepository pictureRepository, DogBehaviorRepository dogBehaviorRepository) {
        this.lostDogRepository = lostDogRepository;
        this.pictureRepository = pictureRepository;
        this.dogBehaviorRepository = dogBehaviorRepository;
    }

    @Override
    public List<LostDogWithBehaviorsAndWithPicture> GetLostDogs(Specification<LostDog> filters, Pageable page) {
        var dogs = lostDogRepository.findAll(filters, page).getContent();
        var dogsWithBehaviorsAndPictures = new ArrayList<LostDogWithBehaviorsAndWithPicture>();
        for(var dog : dogs){
            var dogWithBehavior = new LostDogWithBehaviors(dog);
            var behaviors = dogBehaviorRepository.findAllByDogId(dog.getId());
            for(var behavior : behaviors) {
                dogWithBehavior.getBehaviors().add(behavior.getBehavior());
            }
            //
            var dogWithBehaviorAndWithPicture = new LostDogWithBehaviorsAndWithPicture(dogWithBehavior);
            var picture = pictureRepository.findById(dog.getPictureId());
            dogWithBehaviorAndWithPicture.setPicture(picture.orElse(new Picture(-1, "", "", new byte[0])));
            dogsWithBehaviorsAndPictures.add(dogWithBehaviorAndWithPicture);
        }
        return dogsWithBehaviorsAndPictures;
    }

    @Override
    public LostDogWithBehaviorsAndWithPicture AddLostDog(LostDogWithBehaviors newDog, Picture picture) {
        LostDog dog = newDog.LostDogWithoutBehaviors();
        var savedPicture = pictureRepository.save(picture);
        dog.setPictureId(savedPicture.getId());
        var savedDog = lostDogRepository.save(dog);
        var behaviors = new ArrayList<DogBehavior>();
        for (var behaviorName : newDog.getBehaviors() ) {
            var behavior = new DogBehavior();
            behavior.setDogId(savedDog.getId());
            behavior.setBehavior(behaviorName);
            behaviors.add(dogBehaviorRepository.save(behavior));
        }

        var returnedDog = new LostDogWithBehaviorsAndWithPicture(newDog);
        returnedDog.setPicture(savedPicture);

        return returnedDog;
    }

    @Transactional
    @Override
    public boolean DeleteDog(long dogId) {
        if(dogId < 0) return false;

        LostDog dog = lostDogRepository.getOne(dogId);
        if(dog == null) return false; // Here we fail to delete because the dog is not in the database.

        // Deletes behaviors
        var behaviors = dogBehaviorRepository.findAllByDogId(dog.getId());
        for(var behavior : behaviors) {
            dogBehaviorRepository.deleteById(behavior.getId());
        }
        // Deletes dog.
        pictureRepository.deleteById(dog.getPictureId());
        lostDogRepository.delete(dog);
        return true;
    }
/*
    @Override
    public LostDog UpdateDog(LostDog updatedVersion)
    {

    }*/
}
