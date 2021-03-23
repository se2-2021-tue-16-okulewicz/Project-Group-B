package se.backend.service.lostdogs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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
import java.util.Optional;


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

        LostDogWithBehaviors savedDogWithBehaviors = new LostDogWithBehaviors(savedDog);
        savedDogWithBehaviors.setBehaviors(newDog.getBehaviors());
        var returnedDog = new LostDogWithBehaviorsAndWithPicture(savedDogWithBehaviors);
        returnedDog.setPicture(savedPicture);

        return returnedDog;
    }

    @Transactional
    @Override
    public boolean DeleteDog(long dogId) {
        if(!IsValidDogId(dogId)) return false;

        LostDog dog = lostDogRepository.getOne(dogId);
        if(dog == null) return false; // Here we fail to delete because the dog is not in the database.

        // Deletes behaviors
        var behaviors = dogBehaviorRepository.findAllByDogId(dog.getId());
        for(var behavior : behaviors) {
            dogBehaviorRepository.deleteById(behavior.getId());
        }
        // Deletes dog and picture.
        pictureRepository.deleteById(dog.getPictureId());
        lostDogRepository.delete(dog);
        return true;
    }

    // method to check if the id exists in the database and if its not less then 0.
    private boolean IsValidDogId(long dogId)
    {
        if(dogId < 0) return false;
        var dogs = lostDogRepository.findAll(Specification.where(null), PageRequest.of(0, 15)).getContent();
        for(var dog : dogs)
        {
            if(dog.getId() == dogId)
            {
                return true;
            }
        }
        return false;
    }

    @Transactional
    @Override
    public LostDogWithBehaviorsAndWithPicture UpdateDog(LostDogWithBehaviors updatedDog, Picture picture)
    {
        // Check if the dog is in the database.
        if(!IsValidDogId(updatedDog.getId())) return null;

        // Get old dog.
        LostDog oldDog = lostDogRepository.getOne(updatedDog.getId());

        // Delete old behaviors.
        for(var oldBehavior : dogBehaviorRepository.findAllByDogId(oldDog.getId())) {
            dogBehaviorRepository.deleteById(oldBehavior.getId());
        }
        // Delete old picture.
        pictureRepository.deleteById(oldDog.getPictureId());

        // Set the new stuff. Here the old Dog is overridden by the new one.
        LostDog dogToBeSaved = updatedDog.LostDogWithoutBehaviors();
        var savedDog = lostDogRepository.save(dogToBeSaved);
        var savedPicture = pictureRepository.save(picture);
        savedDog.setPictureId(savedPicture.getId());

        var behaviors = new ArrayList<DogBehavior>();
        for (var behaviorName : updatedDog.getBehaviors() ) {
            var behavior = new DogBehavior();
            behavior.setDogId(savedDog.getId());
            behavior.setBehavior(behaviorName);
            behaviors.add(dogBehaviorRepository.save(behavior));
        }
        LostDogWithBehaviors savedDogWithBehaviors = new LostDogWithBehaviors(savedDog);
        savedDogWithBehaviors.setBehaviors(updatedDog.getBehaviors());
        var returnedDog = new LostDogWithBehaviorsAndWithPicture(savedDogWithBehaviors);

        returnedDog.setPicture(savedPicture);
        return returnedDog;
    }

    @Override
    public LostDogWithBehaviorsAndWithPicture GetDogDetails(long dogId)
    {
        if(!IsValidDogId(dogId)) return null;

        var dog = lostDogRepository.findById(dogId);
        var picture = pictureRepository.findById(dog.get().getPictureId());
        var behaviors = dogBehaviorRepository.findAllByDogId(dogId);
        var behaviorStrings = new ArrayList<String>();

        for(var b : behaviors)
        {
            behaviorStrings.add(b.getBehavior());
        }

        LostDogWithBehaviors savedDogWithBehaviors = new LostDogWithBehaviors(dog.get());
        savedDogWithBehaviors.setBehaviors(behaviorStrings);
        var returnedDog = new LostDogWithBehaviorsAndWithPicture(savedDogWithBehaviors);
        returnedDog.setPicture(picture.get());
        return returnedDog;
    }
}
