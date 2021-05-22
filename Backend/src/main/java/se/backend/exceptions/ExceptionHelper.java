package se.backend.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import se.backend.exceptions.types.*;
import se.backend.utils.Response;

@ControllerAdvice(annotations = RestController.class)
public class ExceptionHelper {
    private final Logger logger = LoggerFactory.getLogger(ExceptionHandler.class);

    @ExceptionHandler(value = { GenericBadRequestException.class })
    public ResponseEntity<Response<Object, Object>> handleGenericBadRequestException(GenericBadRequestException ex) {
        logger.error("GenericBadRequestException: {}", ex.getMessage());
        return new ResponseEntity<>(new Response<>(ex.getMessage(), false, null, null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = { UnauthorizedException.class })
    public ResponseEntity<Response<Object, Object>> handleUnauthorizedException(UnauthorizedException ex) {
        logger.error("GenericBadRequestException: {}", ex.getMessage());
        return new ResponseEntity<>(new Response<>(ex.getMessage(), false, null, null), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = { MissingServletRequestPartException.class })
    public ResponseEntity<Response<Object, Object>> handleMissingServletRequestPartException(MissingServletRequestPartException ex) {
        logger.error("MissingServletRequestPartException: {}", ex.getMessage());
        return new ResponseEntity<>(new Response<>("Missing part of a request", false, null, null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = { HttpMessageNotReadableException.class })
    public ResponseEntity<Response<Object, Object>> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        logger.error("HttpMessageNotReadableException: {}", ex.getMessage());
        return new ResponseEntity<>(new Response<>("Could not read provided data", false, null, null), HttpStatus.BAD_REQUEST);
    }

}
