package se.backend.exceptions.types;

public class GenericBadRequestException extends RuntimeException {
    public GenericBadRequestException(String message) {
        super(message);
    }
}
