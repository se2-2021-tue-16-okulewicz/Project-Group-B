package se.backend.exceptions.types;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message, Long id) {
        super(message + " Id: " + id.toString());
    }
}
