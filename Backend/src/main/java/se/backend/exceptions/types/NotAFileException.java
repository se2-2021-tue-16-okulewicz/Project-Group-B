package se.backend.exceptions.types;

public class NotAFileException extends RuntimeException {
    public NotAFileException(String message) {
        super(message);
    }
}
