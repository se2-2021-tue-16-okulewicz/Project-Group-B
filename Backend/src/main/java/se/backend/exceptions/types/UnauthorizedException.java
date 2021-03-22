package se.backend.exceptions.types;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException() {
        super("Unauthorised access to data");
    }
}
