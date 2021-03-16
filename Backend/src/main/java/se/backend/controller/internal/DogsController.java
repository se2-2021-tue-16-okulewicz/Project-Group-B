package se.backend.controller.internal;

import com.sun.istack.NotNull;
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
import se.backend.model.Picture;
import se.backend.model.dogs.LostDog;
import se.backend.service.lostdogs.LostDogService;
import se.backend.utils.Response;
import se.backend.wrapper.dogs.LostDogWithBehaviors;
import se.backend.wrapper.dogs.LostDogWithBehaviorsAndWithPicture;

import java.util.Collection;

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

    @Autowired
    public DogsController(LostDogService lostDogService) {
        this.lostDogService = lostDogService;
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
        //Check authorization with token

        //TODO: Filters
        var result = lostDogService.GetLostDogs(Specification.where(null), pageable);

        return ResponseEntity.ok(new Response<>(String.format("%d dog(s) found", result.size()), true, result));
    }

    @SneakyThrows
    @PostMapping(path = "")
    public ResponseEntity<Response<LostDog>> AddLostDog(@RequestHeader HttpHeaders headers,
                                                        @RequestPart("dog") @NotNull LostDogWithBehaviors newDog,
                                                        @RequestPart("picture") @NotNull MultipartFile picture) {
        logHeaders(headers);
        //Check authorization with token

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
}