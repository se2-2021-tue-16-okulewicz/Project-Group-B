package se.backend.controller.internal;

import lombok.SneakyThrows;
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
    public ResponseEntity<Response<Collection<LostDogWithBehaviorsAndWithPicture>>> GetLostDogs(@RequestHeader HttpHeaders headers,
                                                                                                @PageableDefault(
                                                                                                   sort = "dateLost",
                                                                                                   direction = Sort.Direction.DESC,
                                                                                                   value=15
                                                                                               ) Pageable pageable) {
        logHeaders(headers);
        if(!loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular, UserType.Shelter))) {
            throw new UnauthorizedException();
        }

        //TODO: Filters
        var result = lostDogService.GetLostDogs(Specification.where(null), pageable);

        return ResponseEntity.ok(new Response<>(String.format("%d dog(s) found", result.size()), true, result));
    }

    @SneakyThrows
    @PostMapping(path = "")
    public ResponseEntity<Response<LostDog>> AddLostDog(@RequestHeader HttpHeaders headers,
                                                        @RequestPart("dog") LostDogWithBehaviors newDog,
                                                        @RequestPart("picture") MultipartFile picture) {
        logHeaders(headers);
        if(!loginService.IsAuthorized(headers, List.of(UserType.Regular))) {
            throw new UnauthorizedException();
        }

        LostDog savedDog;
        try {
            var newPicture = new Picture();
            newPicture.setFileName(picture.getOriginalFilename());
            newPicture.setFileType(picture.getContentType());
            newPicture.setData(picture.getBytes());

            savedDog = lostDogService.AddLostDog(newDog, newPicture);
        } catch (Exception e) {
            throw new GenericBadRequestException("Failed to save the dog");
        }

        return ResponseEntity.ok(new Response<>(String.format("Saved dog id: %d", savedDog.getId()), true, savedDog));
    }
    //</editor-fold>

    @DeleteMapping(path = "/{dogId}")
    public ResponseEntity<Response<Boolean>> DeleteLostDog(@RequestHeader HttpHeaders headers, @PathVariable("dogId") long dogId) {
        logHeaders(headers);
        if(!loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular))) {
            throw new UnauthorizedException();
        }

        // If we successfully delete
        if(lostDogService.DeleteDog(dogId)) return ResponseEntity.ok(new Response<>(String.format("Deleted dog with id: %d", dogId), true, true));

        // If we fail to delete
        else return ResponseEntity.status(400).body(new Response<>(String.format("Failed to delete dog with id: %d", dogId), false, false));
    }

    @GetMapping(path = "/{dogId}")
    public ResponseEntity<Response<LostDog>> GetLostDogDetails(@RequestHeader HttpHeaders headers, @PathVariable("dogId") long dogId) {
        logHeaders(headers);
        if(!loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular, UserType.Shelter))) {
            throw new UnauthorizedException();
        }

        LostDog savedDog;
        savedDog = lostDogService.GetDogDetails(dogId);

        // Successfully get dog
        if(savedDog != null) return ResponseEntity.ok(new Response<>(String.format("Saved dog id: %d", savedDog.getId()), true, savedDog));

        // fail get dog
        else return ResponseEntity.status(400).body(new Response<>(String.format("Failed to fetch dog with id: %d", dogId), false, null));
    }

    @SneakyThrows
    @PutMapping(path = "/{dogId}")
    public ResponseEntity<Response<LostDog>> UpdateDog(@RequestHeader HttpHeaders headers,
                                                       @PathVariable("dogId") long dogId,
                                                       @RequestPart("dog") LostDogWithBehaviors updatedDog,
                                                       @RequestPart("picture") MultipartFile picture) {
        logHeaders(headers);
        if(!loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular))) {
            throw new UnauthorizedException();
        }

        LostDog oldDog = lostDogService.GetDogDetails(dogId);
        if(oldDog == null) return ResponseEntity.status(400).body(new Response<>(String.format("Failed to update dog - No dog with id: %d was found" , dogId), false, null));

        try {
            var newPicture = new Picture();
            newPicture.setFileName(picture.getOriginalFilename());
            newPicture.setFileType(picture.getContentType());
            newPicture.setData(picture.getBytes());

            var savedDog = lostDogService.UpdateDog(dogId, updatedDog, newPicture);

            // Successfully get dog
            if(savedDog != null) return ResponseEntity.ok(new Response<>(String.format("Saved dog id: %d", savedDog.getId()), true, savedDog));

            // fail get dog
            else throw new GenericBadRequestException(String.format("Failed to update dog with id: %d", dogId));
        } catch (IOException e) {
            throw new GenericBadRequestException("Failed to update the dog");
        }
    }


}
