package se.backend.service.lostdogs;

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
import se.backend.dao.LostDogRepository;
import se.backend.dao.PictureRepository;
import se.backend.exceptions.types.UnauthorizedException;
import se.backend.model.Picture;
import se.backend.model.dogs.DogBehavior;
import se.backend.model.dogs.Lost.LostDog;
import se.backend.model.dogs.Lost.LostDogBehavior;
import se.backend.wrapper.dogs.LostDogWithBehaviors;
import se.backend.wrapper.dogs.LostDogWithBehaviorsAndWithPicture;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class LostDogMainService implements LostDogService{
    private final Logger logger = LoggerFactory.getLogger(LostDogMainService.class);

    private final LostDogRepository lostDogRepository;
    private final PictureRepository pictureRepository;
    private final LostDogBehaviorRepository dogBehaviorRepository;

    @Autowired
    public LostDogMainService(LostDogRepository lostDogRepository, PictureRepository pictureRepository, LostDogBehaviorRepository dogBehaviorRepository) {
        this.lostDogRepository = lostDogRepository;
        this.pictureRepository = pictureRepository;
        this.dogBehaviorRepository = dogBehaviorRepository;
    }

    @Override
    public Pair<List<LostDogWithBehaviorsAndWithPicture>, Integer> GetLostDogs(Specification<LostDog> filters, Pageable page) {
        var dogPage = lostDogRepository.findAll(filters, page);
        var dogs = dogPage.getContent();
        var dogsWithBehaviorsAndPictures = new ArrayList<LostDogWithBehaviorsAndWithPicture>();

        for(var dog : dogs){
            var dogWithBehavior = new LostDogWithBehaviors(dog);

            var behaviors = dogBehaviorRepository.findAllByDogId(dog.getId());
            for(var behavior : behaviors) {
                dogWithBehavior.getBehaviors().add(behavior.getBehavior());
            }

            var dogWithBehaviorAndWithPicture = new LostDogWithBehaviorsAndWithPicture(dogWithBehavior);
            var picture = pictureRepository.findById(dog.getPictureId());
            dogWithBehaviorAndWithPicture.setPicture(picture.orElse(new Picture(-1, "", "", new byte[0])));
            dogsWithBehaviorsAndPictures.add(dogWithBehaviorAndWithPicture);
        }
        return new Pair<>(dogsWithBehaviorsAndPictures, dogPage.getTotalPages());
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public LostDogWithBehaviorsAndWithPicture AddLostDog(LostDogWithBehaviors newDog, Picture picture, long ownerId) {
        LostDog dog = newDog.LostDogWithoutBehaviors();
        dog.setOwnerId(ownerId);
        dog.setIsFound(false);

        var savedPicture = pictureRepository.save(picture);
        dog.setPictureId(savedPicture.getId());

        var savedDog = lostDogRepository.save(dog);

        var behaviors = new ArrayList<DogBehavior>();
        for (var behaviorName : newDog.getBehaviors() ) {
            var behavior = new LostDogBehavior();
            behavior.setDogId(savedDog.getId());
            behavior.setBehavior(behaviorName);
            behaviors.add(dogBehaviorRepository.save(behavior));
        }

        LostDogWithBehaviors savedDogWithBehaviors = new LostDogWithBehaviors(savedDog);
        savedDogWithBehaviors.setBehaviors(behaviors.stream().map(DogBehavior::getBehavior).collect(Collectors.toList()));
        var returnedDog = new LostDogWithBehaviorsAndWithPicture(savedDogWithBehaviors);
        returnedDog.setPicture(savedPicture);

        return returnedDog;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public boolean DeleteDog(long dogId, long ownerId) {
        if(IsInvalidDogId(dogId))
            return false;

        var foundDog = lostDogRepository.findById(dogId);
        if(foundDog.isEmpty())
            return false;

        var dog = foundDog.get();

        if(dog.getOwnerId() != ownerId)
            throw new UnauthorizedException();

        var behaviors = dogBehaviorRepository.findAllByDogId(dog.getId());
        for(var behavior : behaviors) {
            dogBehaviorRepository.deleteById(behavior.getId());
        }

        pictureRepository.deleteById(dog.getPictureId());
        lostDogRepository.delete(dog);
        return true;
    }

    private boolean IsInvalidDogId(long dogId)
    {
        if(dogId < 0) return true;
        return !lostDogRepository.existsById(dogId);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public LostDogWithBehaviorsAndWithPicture UpdateDog(long dogId, LostDogWithBehaviors updatedDog, Picture picture, long ownerId)
    {
        if(IsInvalidDogId(dogId))
            return null;
        var oldDog = lostDogRepository.findById(dogId);
        if(oldDog.isEmpty())
            return null;

        if(oldDog.get().getOwnerId() != ownerId)
            throw new UnauthorizedException();

        for(var oldBehavior : dogBehaviorRepository.findAllByDogId(oldDog.get().getId())) {
            if(dogBehaviorRepository.existsById(oldBehavior.getId()))
                dogBehaviorRepository.deleteById(oldBehavior.getId());
        }

        if(pictureRepository.existsById(oldDog.get().getPictureId()))
            pictureRepository.deleteById(oldDog.get().getPictureId());

        LostDog dogToBeSaved = updatedDog.LostDogWithoutBehaviors();
        dogToBeSaved.setIsFound(oldDog.get().isIsFound());
        dogToBeSaved.setId(dogId);
        dogToBeSaved.setOwnerId(ownerId);

        var savedPicture = pictureRepository.save(picture);
        dogToBeSaved.setPictureId(savedPicture.getId());

        var savedDog = lostDogRepository.save(dogToBeSaved);

        var behaviors = new ArrayList<DogBehavior>();
        for (var behaviorName : updatedDog.getBehaviors() ) {
            var behavior = new LostDogBehavior();
            behavior.setDogId(savedDog.getId());
            behavior.setBehavior(behaviorName);
            behaviors.add(dogBehaviorRepository.save(behavior));
        }

        LostDogWithBehaviors savedDogWithBehaviors = new LostDogWithBehaviors(savedDog);
        savedDogWithBehaviors.setBehaviors(behaviors.stream().map(DogBehavior::getBehavior).collect(Collectors.toList()));

        var returnedDog = new LostDogWithBehaviorsAndWithPicture(savedDogWithBehaviors);
        returnedDog.setPicture(savedPicture);

        return returnedDog;
    }

    @Override
    public LostDogWithBehaviorsAndWithPicture GetDogDetails(long dogId)
    {
        if(IsInvalidDogId(dogId))
            return null;

        var dog = lostDogRepository.findById(dogId);
        if(dog.isEmpty())
            return null;

        var picture = pictureRepository.findById(dog.get().getPictureId());
        var behaviors = dogBehaviorRepository.findAllByDogId(dogId);

        var behaviorStrings = new ArrayList<String>();
        for(var b : behaviors) {
            behaviorStrings.add(b.getBehavior());
        }

        LostDogWithBehaviors savedDogWithBehaviors = new LostDogWithBehaviors(dog.get());
        savedDogWithBehaviors.setBehaviors(behaviorStrings);

        var returnedDog = new LostDogWithBehaviorsAndWithPicture(savedDogWithBehaviors);

        returnedDog.setPicture(picture.orElse(new Picture(-1, "", "", new byte[0])));

        return returnedDog;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public boolean MarkLostDogAsFound(long dogId, long ownerId) {
        if(IsInvalidDogId(dogId))
            return false;
        var dog = lostDogRepository.findById(dogId);
        if(dog.isEmpty())
            return false;
        if(dog.get().getOwnerId() != ownerId)
            throw new UnauthorizedException();
        lostDogRepository.markLostDogFound(dogId);
        return true;
    }

}
