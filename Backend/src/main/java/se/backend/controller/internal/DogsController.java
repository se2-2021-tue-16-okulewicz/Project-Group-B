package se.backend.controller.internal;

import lombok.SneakyThrows;
import net.kaczmarzyk.spring.data.jpa.domain.*;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.mockito.internal.matchers.StartsWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.backend.exceptions.types.GenericBadRequestException;
import se.backend.exceptions.types.UnauthorizedException;
import se.backend.model.Picture;
import se.backend.model.dogs.LostDog;
import se.backend.service.login.LoginService;
import se.backend.service.lostdogs.LostDogService;
import se.backend.utils.Response;
import se.backend.wrapper.account.UserType;
import se.backend.wrapper.dogs.LostDogWithBehaviors;
import se.backend.wrapper.dogs.LostDogWithBehaviorsAndWithPicture;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import static java.util.stream.Collectors.joining;


@RestController
@RequestMapping(path = "/lostdogs")
public class DogsController {
    private final Logger logger = LoggerFactory.getLogger(DogsController.class);
    private void logHeaders(@RequestHeader HttpHeaders headers) {
        logger.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(","))
        );
    }

    private final LostDogService lostDogService;
    private final LoginService loginService;

    @Autowired
    public DogsController(LostDogService lostDogService, LoginService loginService) {
        this.lostDogService = lostDogService;
        this.loginService = loginService;
    }

    //<editor-fold desc="/lostdogs">
    @GetMapping(path = "")
    public ResponseEntity<Response<Collection<LostDogWithBehaviorsAndWithPicture>, Integer>> GetLostDogs(
            @RequestHeader HttpHeaders headers,
            @PageableDefault(
                    sort = "dateLost",
                    direction = Sort.Direction.DESC,
                    value=15
            ) Pageable pageable,
            @And({
                    @Spec(path="isIsFound", params="filter.isFound", spec= Equal.class),
                    @Spec(path="breed", params="filter.breed", spec= StartingWithIgnoreCase.class),
                    @Spec(path="age", params="filter.ageFrom" , spec= GreaterThanOrEqual.class),
                    @Spec(path="age", params="filter.ageTo", spec= LessThanOrEqual.class),
                    @Spec(path="size", params="filter.size", spec= StartingWithIgnoreCase.class),
                    @Spec(path="color", params="filter.color", spec= StartingWithIgnoreCase.class),
                    @Spec(path="name", params="filter.name", spec= StartingWithIgnoreCase.class),
                    @Spec(path="ownerId", params="filter.ownerId", spec= Equal.class),
                    @Spec(path="location.city", params="filter.location.city", spec= StartingWithIgnoreCase.class),
                    @Spec(path="location.district", params="filter.location.district", spec= StartingWithIgnoreCase.class),
                    @Spec(path="dateLost", params="filter.dateLostAfter" , spec= GreaterThanOrEqual.class),
                    @Spec(path="dateLost", params="filter.dateLostBefore", spec= LessThanOrEqual.class),
            }) Specification<LostDog> dogSpecification) {

        logHeaders(headers);

        var authorization = loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular, UserType.Shelter));
        if(!authorization.getValue0()) {
            throw new UnauthorizedException();
        }

        var result = lostDogService.GetLostDogs(dogSpecification, pageable);

        return ResponseEntity.ok(new Response<>(String.format("%d dog(s) found", result.getValue0().size()), true, result.getValue0(), result.getValue1()));
    }

    @SneakyThrows
    @PostMapping(path = "")
    public ResponseEntity<Response<LostDog, Object>> AddLostDog(@RequestHeader HttpHeaders headers,
                                                        @RequestPart("dog") LostDogWithBehaviors newDog,
                                                        @RequestPart("picture") MultipartFile picture) {
        logHeaders(headers);

        var authorization = loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular, UserType.Shelter));
        if(!authorization.getValue0()) {
            throw new UnauthorizedException();
        }

        if(!newDog.IsValid()) {
            throw new GenericBadRequestException("Dog does not have complete data");
        }

        LostDog savedDog;
        try {
            var newPicture = new Picture();
            newPicture.setFileName(picture.getOriginalFilename());
            newPicture.setFileType(picture.getContentType());
            newPicture.setData(picture.getBytes());

            if(!newPicture.isValid()) {
                throw new GenericBadRequestException("Picture is not valid");
            }

            savedDog = lostDogService.AddLostDog(newDog, newPicture, authorization.getValue1());
        } catch (IOException e) {
            throw new GenericBadRequestException("Failed to save the dog");
        }

        return ResponseEntity.ok(new Response<>(String.format("Saved dog id: %d", savedDog.getId()), true, savedDog, null));
    }
    //</editor-fold>

    //<editor-fold desc="/lostdogs/{dogId}">
    @DeleteMapping(path = "/{dogId}")
    public ResponseEntity<Response<Boolean, Object>> DeleteLostDog(@RequestHeader HttpHeaders headers,
                                                           @PathVariable("dogId") long dogId) {
        logHeaders(headers);

        var authorization = loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular, UserType.Shelter));
        if(!authorization.getValue0()) {
            throw new UnauthorizedException();
        }

        if(lostDogService.DeleteDog(dogId, authorization.getValue1()))
            return ResponseEntity.ok(new Response<>(String.format("Deleted dog with id: %d", dogId), true, true, null));
        else
            return ResponseEntity.status(400).body(new Response<>(String.format("Failed to delete dog with id: %d", dogId), false, false, null));
    }

    @GetMapping(path = "/{dogId}")
    public ResponseEntity<Response<LostDog, Object>> GetLostDogDetails(@RequestHeader HttpHeaders headers,
                                                               @PathVariable("dogId") long dogId) {
        logHeaders(headers);

        var authorization = loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular, UserType.Shelter));
        if(!authorization.getValue0()) {
            throw new UnauthorizedException();
        }

        LostDog savedDog = lostDogService.GetDogDetails(dogId);
        if(savedDog != null)
            return ResponseEntity.ok(new Response<>(String.format("Saved dog id: %d", savedDog.getId()), true, savedDog, null));
        else
            return ResponseEntity.status(400).body(new Response<>(String.format("Failed to fetch dog with id: %d", dogId), false, null, null));
    }

    @SneakyThrows
    @PutMapping(path = "/{dogId}")
    public ResponseEntity<Response<LostDog, Object>> UpdateDog(@RequestHeader HttpHeaders headers,
                                                       @PathVariable("dogId") long dogId,
                                                       @RequestPart("dog") LostDogWithBehaviors updatedDog,
                                                       @RequestPart("picture") MultipartFile picture) {
        logHeaders(headers);

        var authorization = loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular));
        if(!authorization.getValue0()) {
            throw new UnauthorizedException();
        }

        if(!updatedDog.IsValid()) {
            throw new GenericBadRequestException("Dog does not have complete data");
        }

        LostDog oldDog = lostDogService.GetDogDetails(dogId);
        if(oldDog == null)
            throw new GenericBadRequestException(String.format("Failed to update dog - No dog with id: %d was found" , dogId));

        try {
            var newPicture = new Picture();
            newPicture.setFileName(picture.getOriginalFilename());
            newPicture.setFileType(picture.getContentType());
            newPicture.setData(picture.getBytes());

            if(!newPicture.isValid()) {
                throw new GenericBadRequestException("Picture is not valid");
            }

            var savedDog = lostDogService.UpdateDog(dogId, updatedDog, newPicture, authorization.getValue1());

            if(savedDog != null)
                return ResponseEntity.ok(new Response<>(String.format("Saved dog id: %d", savedDog.getId()), true, savedDog, null));
            else
                throw new GenericBadRequestException(String.format("Failed to update dog with id: %d", dogId));
        } catch (IOException e) {
            throw new GenericBadRequestException("Failed to update the dog");
        }
    }
    //</editor-fold>

    //<editor-fold desc="/lostdogs/{dogId}/found">
    @PutMapping(path = "/{dogId}/found")
    public ResponseEntity<Response<Object, Object>> MarkAsFound(@RequestHeader HttpHeaders headers,
                                                        @PathVariable("dogId") long dogId) {
        logHeaders(headers);

        var authorization = loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular));
        if(!authorization.getValue0()) {
            throw new UnauthorizedException();
        }

        boolean wasMarked = lostDogService.MarkLostDogAsFound(dogId, authorization.getValue1());

        if(!wasMarked)
            throw new GenericBadRequestException("Failed to mark dog as found");

        return ResponseEntity.ok(new Response<>("Dog marked as found", true, null, null));
    }
    //</editor-fold>
}
