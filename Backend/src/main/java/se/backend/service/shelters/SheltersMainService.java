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
import se.backend.dao.PictureRepository;
import se.backend.dao.ShelterAccountRepository;
import se.backend.dao.ShelterDogBehaviorRepository;
import se.backend.dao.ShelterDogRepository;
import se.backend.exceptions.types.UnauthorizedException;
import se.backend.model.Picture;
import se.backend.model.account.Shelter;
import se.backend.model.dogs.DogBehavior;
import se.backend.model.dogs.Shelter.ShelterDog;
import se.backend.model.dogs.Shelter.ShelterDogBehavior;
import se.backend.wrapper.dogs.ShelterDogWithBehaviors;
import se.backend.wrapper.dogs.ShelterDogWithBehaviorsAndWithPicture;
import se.backend.wrapper.shelters.ShelterInformation;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SheltersMainService implements SheltersService{
    private final Logger logger = LoggerFactory.getLogger(SheltersMainService.class);

    private final ShelterDogRepository shelterDogRepository;
    private final PictureRepository pictureRepository;
    private final ShelterDogBehaviorRepository dogBehaviorRepository;
    private final ShelterAccountRepository shelterRepository;

    @Autowired
    public SheltersMainService(ShelterDogRepository shelterDogRepository, PictureRepository pictureRepository, ShelterDogBehaviorRepository dogBehaviorRepository, ShelterAccountRepository shelterRepository) {
        this.shelterDogRepository = shelterDogRepository;
        this.pictureRepository = pictureRepository;
        this.dogBehaviorRepository = dogBehaviorRepository;
        this.shelterRepository = shelterRepository;
    }

    private static Specification<Shelter> isActive() {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("active"), true);
    }

    @Override
    public Pair<List<ShelterInformation>, Integer> GetShelters(Specification<Shelter> filters, Pageable page) {
        if(filters == null)
            filters = Specification.where(isActive());
        filters = filters.and(isActive()); //It can eventually double the filter, but it does not matter (a and a is the same as a)

        var shelterPage = shelterRepository.findAll(filters, page);

        var shelterAccounts = shelterPage.getContent();
        var sheltersInformation = shelterAccounts.stream().map(Shelter::ToShelterInformation).collect(Collectors.toList());

        return new Pair<>(sheltersInformation, shelterPage.getTotalPages());
    }

    @Override
    public ShelterInformation GetOneShelter(long shelterId) {
        var shelter = shelterRepository.findById(shelterId);

        if(shelter.isEmpty())
            return null;
        if(!shelter.get().isActive())
            return null;

        return shelter.get().ToShelterInformation();
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

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public boolean DeleteDog(long dogId, long shelterId) {
        if(IsInvalidDogId(dogId))
            return false;

        var foundDog = shelterDogRepository.findById(dogId);
        if(foundDog.isEmpty())
            return false;

        var dog = foundDog.get();

        if(dog.getShelterId() != shelterId)
            throw new UnauthorizedException();

        var behaviors = dogBehaviorRepository.findAllByDogId(dog.getId());
        for(var behavior : behaviors) {
            dogBehaviorRepository.deleteById(behavior.getId());
        }

        pictureRepository.deleteById(dog.getPictureId());
        shelterDogRepository.delete(dog);
        return true;
    }

    private boolean IsInvalidDogId(long dogId)
    {
        if(dogId < 0) return true;
        return !shelterDogRepository.existsById(dogId);
    }
}
