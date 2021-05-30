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
import se.backend.dao.*;
import se.backend.exceptions.types.GenericBadRequestException;
import se.backend.exceptions.types.UnauthorizedException;
import se.backend.model.Picture;
import se.backend.model.dogs.DogBehavior;
import se.backend.model.dogs.Lost.LostDog;
import se.backend.model.dogs.Lost.LostDogBehavior;
import se.backend.model.dogs.Lost.LostDogComment;
import se.backend.wrapper.comments.CommentAuthor;
import se.backend.wrapper.comments.CommentWithAuthorAndPicture;
import se.backend.wrapper.dogs.LostDogWithBehaviors;
import se.backend.wrapper.dogs.LostDogWithBehaviorsAndWithPicture;
import se.backend.wrapper.dogs.LostDogWithBehaviorsPictureAndComments;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class LostDogMainService implements LostDogService{
    private final Logger logger = LoggerFactory.getLogger(LostDogMainService.class);

    private final LostDogRepository lostDogRepository;
    private final PictureRepository pictureRepository;
    private final LostDogBehaviorRepository dogBehaviorRepository;
    private final LostDogCommentRepository lostDogCommentRepository;
    private final UserAccountRepository userAccountRepository;

    @Autowired
    public LostDogMainService(LostDogRepository lostDogRepository, PictureRepository pictureRepository, LostDogBehaviorRepository dogBehaviorRepository, LostDogCommentRepository lostDogCommentRepository, UserAccountRepository userAccountRepository) {
        this.lostDogRepository = lostDogRepository;
        this.pictureRepository = pictureRepository;
        this.dogBehaviorRepository = dogBehaviorRepository;
        this.lostDogCommentRepository = lostDogCommentRepository;
        this.userAccountRepository = userAccountRepository;
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

        var comments = lostDogCommentRepository.findAllByDogId(dog.getId());
        for(var comment : comments) {
            DeleteDogComment(comment.getId(), 0, true);
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

        LostDog dogToBeSaved = updatedDog.LostDogWithoutBehaviors();

        var savedPicture = pictureRepository.findById(oldDog.get().getPictureId()).orElse(null);
        dogToBeSaved.setIsFound(oldDog.get().isIsFound());
        dogToBeSaved.setId(dogId);
        dogToBeSaved.setOwnerId(ownerId);
        dogToBeSaved.setPictureId(oldDog.get().getPictureId());

        if(picture != null) {
            if(pictureRepository.existsById(oldDog.get().getPictureId()))
                pictureRepository.deleteById(oldDog.get().getPictureId());
            savedPicture = pictureRepository.save(picture);
            dogToBeSaved.setPictureId(savedPicture.getId());
        }

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
    public LostDogWithBehaviorsPictureAndComments GetDogDetails(long dogId)
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

        var dogBehaviorsPicture = new LostDogWithBehaviorsAndWithPicture(savedDogWithBehaviors);

        dogBehaviorsPicture.setPicture(picture.orElse(null));

        var returnedDog = new LostDogWithBehaviorsPictureAndComments(dogBehaviorsPicture);

        List<CommentWithAuthorAndPicture> comments = new ArrayList<>();

        var commentsFromDB = lostDogCommentRepository.findAllByDogId(returnedDog.getId());
        for(var comment : commentsFromDB) {
            comments.add(GetCommentWithAuthorAndPicture(comment));
        }

        returnedDog.setComments(comments);
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

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public CommentWithAuthorAndPicture AddCommentToDog(long lostDogId, LostDogComment comment, Picture picture, long authorId) {

        comment.setAuthorId(authorId);
        comment.setDogId(lostDogId);
        comment.setId(0);

        long pictureId = 0;
        Picture savedPicture = null;

        if(picture != null) {
            savedPicture = pictureRepository.save(picture);
            pictureId = savedPicture.getId();
        }

        comment.setPictureId(pictureId);

        var savedComment = lostDogCommentRepository.save(comment);

        var returnComment = new CommentWithAuthorAndPicture(savedComment);
        returnComment.setPicture(savedPicture);

        var author = userAccountRepository.findById(authorId);

        if(author.isEmpty())
            throw new GenericBadRequestException("User adding comment not found");

        var authorInfo = CommentAuthor.fromAccount(author.get());
        returnComment.setAuthor(authorInfo);

        return returnComment;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public CommentWithAuthorAndPicture EditDogComment(long commentId, LostDogComment updatedVersion, Picture picture, long authorId) {
        var oldComment = lostDogCommentRepository.findById(commentId);
        if(oldComment.isEmpty()) {
            throw new GenericBadRequestException("Comment to update does not exist");
        }

        if(oldComment.get().getAuthorId() != authorId)
            throw new UnauthorizedException();

        updatedVersion.setDogId(oldComment.get().getDogId());
        updatedVersion.setAuthorId(oldComment.get().getAuthorId());
        updatedVersion.setId(commentId);

        if(picture != null) {
            var savedPicture = pictureRepository.save(picture);
            var pictureId = savedPicture.getId();
            if(oldComment.get().getPictureId() != 0) {
                pictureRepository.deleteById(oldComment.get().getPictureId());
            }
            updatedVersion.setPictureId(pictureId);
        } else {
            updatedVersion.setPictureId(oldComment.get().getPictureId());
        }

        var savedComment = lostDogCommentRepository.save(updatedVersion);

        var returnComment = new CommentWithAuthorAndPicture(savedComment);

        if(savedComment.getPictureId() == 0) {
            returnComment.setPicture(null);
        } else {
            var commentPicture = pictureRepository.findById(savedComment.getPictureId());
            if(commentPicture.isEmpty())
                throw new GenericBadRequestException("Comment picture not found");
            returnComment.setPicture(commentPicture.get());
        }

        var author = userAccountRepository.findById(savedComment.getAuthorId());

        if(author.isEmpty())
            throw new GenericBadRequestException("User adding comment not found");

        var authorInfo = CommentAuthor.fromAccount(author.get());
        returnComment.setAuthor(authorInfo);

        return returnComment;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public boolean DeleteDogComment(long commentId, long authorId, boolean dogRemoved) {
        var oldComment = lostDogCommentRepository.findById(commentId);
        if(oldComment.isEmpty())
            throw new GenericBadRequestException("Comment to delete does not exist");

        if(oldComment.get().getAuthorId() != authorId && !dogRemoved)
            throw new UnauthorizedException();

        var pictureId = oldComment.get().getPictureId();
        if(pictureId != 0)
            pictureRepository.deleteById(pictureId);

        lostDogCommentRepository.deleteById(commentId);

        return true;
    }

    private CommentWithAuthorAndPicture GetCommentWithAuthorAndPicture(LostDogComment comment) {
        var returnComment = new CommentWithAuthorAndPicture(comment);

        if(returnComment.getPictureId() == 0) {
            returnComment.setPicture(null);
        } else {
            var commentPicture = pictureRepository.findById(returnComment.getPictureId());
            returnComment.setPicture(commentPicture.orElse(null));
        }

        var author = userAccountRepository.findById(returnComment.getAuthorId());

        if(author.isEmpty())
            throw new GenericBadRequestException("User adding comment not found");

        var authorInfo = CommentAuthor.fromAccount(author.get());
        returnComment.setAuthor(authorInfo);

        return returnComment;
    }
}
