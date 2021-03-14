package se.backend.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.backend.exceptions.types.*;
import se.backend.utils.MessageResponse;

@ControllerAdvice(annotations = RestController.class)
public class ExceptionHelper {
    private final Logger logger = LoggerFactory.getLogger(ExceptionHandler.class);

    @ExceptionHandler(value = { GenericBadRequestException.class })
    public ResponseEntity<MessageResponse> handleGenericBadRequestException(GenericBadRequestException ex) {
        logger.error("GenericBadRequestException: {}", ex.getMessage());
        return new ResponseEntity<>(new MessageResponse(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

}
