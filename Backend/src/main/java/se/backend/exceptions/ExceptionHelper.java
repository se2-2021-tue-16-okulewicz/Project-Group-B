package se.backend.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.backend.exceptions.types.*;
import se.backend.utils.Response;

@ControllerAdvice(annotations = RestController.class)
public class ExceptionHelper {
    private final Logger logger = LoggerFactory.getLogger(ExceptionHandler.class);

    @ExceptionHandler(value = { GenericBadRequestException.class })
    public ResponseEntity<Response<Object>> handleGenericBadRequestException(GenericBadRequestException ex) {
        logger.error("GenericBadRequestException: {}", ex.getMessage());
        return new ResponseEntity<>(new Response<>(ex.getMessage(), false, null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = { UnauthorizedException.class })
    public ResponseEntity<Response<Object>> handleUnauthorizedException(UnauthorizedException ex) {
        logger.error("GenericBadRequestException: {}", ex.getMessage());
        return new ResponseEntity<>(new Response<>(ex.getMessage(), false, null), HttpStatus.FORBIDDEN);
    }

}
