package se.backend.controller.internal;

import lombok.SneakyThrows;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.StartingWithIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
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
import se.backend.model.account.Shelter;
import se.backend.model.dogs.Lost.LostDog;
import se.backend.model.dogs.Shelter.ShelterDog;
import se.backend.service.login.LoginService;
import se.backend.service.lostdogs.LostDogService;
import se.backend.service.shelters.SheltersService;
import se.backend.utils.Response;
import se.backend.wrapper.account.UserType;
import se.backend.wrapper.dogs.LostDogWithBehaviors;
import se.backend.wrapper.dogs.LostDogWithBehaviorsAndWithPicture;
import se.backend.wrapper.dogs.ShelterDogWithBehaviors;
import se.backend.wrapper.dogs.ShelterDogWithBehaviorsAndWithPicture;
import se.backend.wrapper.shelters.ShelterInformation;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping(path = "/shelters")
public class SheltersController {
    private final Logger logger = LoggerFactory.getLogger(SheltersController.class);
    private void logHeaders(@RequestHeader HttpHeaders headers) {
        logger.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(","))
        );
    }

    private static Specification<ShelterDog> isFromShelter(Long shelterId) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("shelterId"), shelterId);
    }

    private final SheltersService sheltersService;
    private final LoginService loginService;

    @Autowired
    public SheltersController(SheltersService sheltersService, LoginService loginService) {
        this.sheltersService = sheltersService;
        this.loginService = loginService;
    }

    //<editor-fold desc=/shelters">
    @GetMapping(path = "")
    public ResponseEntity<Response<Collection<ShelterInformation>, Integer>> GetShelters(
            @RequestHeader HttpHeaders headers,
            @PageableDefault(
                    sort = "name",
                    direction = Sort.Direction.ASC,
                    value = 15
            ) Pageable pageable,
            @Spec(
                    path="name",
                    params="name",
                    spec= StartingWithIgnoreCase.class
            ) Specification<Shelter> shelterSpecification) {

        logHeaders(headers);

        var authorization = loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular, UserType.Shelter));
        if(!authorization.getValue0()) {
            throw new UnauthorizedException();
        }

        var result = sheltersService.GetShelters(shelterSpecification, pageable);

        return ResponseEntity.ok(new Response<>(String.format("%d shelter(s) found", result.getValue0().size()), true, result.getValue0(), result.getValue1()));
    }
    //</editor-fold>

    //<editor-fold desc="/shelters/{shelterId}/dogs">
    @GetMapping(path = "{shelterId}/dogs")
    public ResponseEntity<Response<Collection<ShelterDogWithBehaviorsAndWithPicture>, Integer>> GetShelterDogsFromShelter(
            @RequestHeader HttpHeaders headers,
            @PageableDefault(
                    sort = "name",
                    direction = Sort.Direction.ASC,
                    value=15
            ) Pageable pageable,
            @PathVariable("shelterId") long shelterId) {

        logHeaders(headers);

        var authorization = loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular, UserType.Shelter));
        if(!authorization.getValue0()) {
            throw new UnauthorizedException();
        }

        var result = sheltersService.GetShelterDogs(isFromShelter(shelterId), pageable);

        return ResponseEntity.ok(new Response<>(String.format("%d dog(s) found", result.getValue0().size()), true, result.getValue0(), result.getValue1()));
    }

    @SneakyThrows
    @PostMapping(path = "/{shelterId}/dogs")
    public ResponseEntity<Response<
            ShelterDogWithBehaviorsAndWithPicture, Object>> AddShelterDog(@RequestHeader HttpHeaders headers,
                                                                @PathVariable("shelterId") long shelterId,
                                                                @RequestPart("dog") ShelterDogWithBehaviors newDog,
                                                                @RequestPart("picture") MultipartFile picture) {
        logHeaders(headers);

        var authorization = loginService.IsAuthorized(headers, List.of(UserType.Shelter));
        if(!authorization.getValue0()) {
            throw new UnauthorizedException();
        }


        if(!authorization.getValue1().equals(shelterId)) {
            throw new UnauthorizedException();
        }


        if(!newDog.IsValid()) {
            throw new GenericBadRequestException("Dog does not have complete data");
        }


        ShelterDogWithBehaviorsAndWithPicture savedDog;
        try {
            var newPicture = new Picture();
            newPicture.setFileName(picture.getOriginalFilename());
            newPicture.setFileType(picture.getContentType());
            newPicture.setData(picture.getBytes());

            if(!newPicture.isValid()) {
                throw new GenericBadRequestException("Picture is not valid");
            }

            savedDog = sheltersService.AddShelterDog(newDog, newPicture, authorization.getValue1());
        } catch (IOException e) {
            throw new GenericBadRequestException("Failed to save the dog");
        }

        return ResponseEntity.ok(new Response<>(String.format("Saved dog id: %d", savedDog.getId()), true, savedDog, null));
    }
    //</editor-fold>

    //<editor-fold desc="/shelters/{shelterId}/dogs/{dogId}">
    @GetMapping(path = "{shelterId}/dogs/{dogId}")
    public ResponseEntity<Response<ShelterDog, Object>> GetLostDogDetails(@RequestHeader HttpHeaders headers,
                                                                       @PathVariable("shelterId") long shelterId,
                                                                       @PathVariable("dogId") long dogId) {
        logHeaders(headers);

        var authorization = loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular, UserType.Shelter));
        if(!authorization.getValue0()) {
            throw new UnauthorizedException();
        }

        ShelterDog savedDog = sheltersService.GetDogDetails(dogId);

        if(savedDog != null) {
            if(savedDog.getShelterId() != shelterId) {
                throw new GenericBadRequestException("This dog is not a part of the shelter");
            }
            return ResponseEntity.ok(new Response<>(String.format("Found dog id: %d", savedDog.getId()), true, savedDog, null));
        }
        else
            return ResponseEntity.status(400).body(new Response<>(String.format("Failed to fetch dog with id: %d", dogId), false, null, null));
    }
    //</editor-fold>
}
