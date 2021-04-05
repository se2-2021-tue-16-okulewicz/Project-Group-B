package se.backend.controller.internal;

import org.javatuples.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.backend.exceptions.types.GenericBadRequestException;
import se.backend.exceptions.types.UnauthorizedException;
import se.backend.model.account.UserAccount;
import se.backend.service.login.LoginService;
import se.backend.utils.Response;
import se.backend.wrapper.account.AuthenticationResults;
import se.backend.wrapper.account.UserType;

import java.util.List;
import java.util.Objects;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping(path = "")
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(DogsController.class);
    private void logHeaders(@RequestHeader HttpHeaders headers) {
        logger.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(","))
        );
    }

    private final LoginService loginService;

    @Autowired
    public UserController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping(path = "/register")
    public ResponseEntity<Response<Object>> CreateUserAccount(@RequestHeader HttpHeaders headers,
                                                                   @RequestPart("username") String username,
                                                                   @RequestPart("password") String password,
                                                                   @RequestPart("phone_number") String phoneNumber,
                                                                   @RequestPart("email") String email) {
        logHeaders(headers);

        UserAccount user = new UserAccount();
        user.setId(0);
        user.setAssociatedEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setName(username);
        user.setPassword(password);

        var result = loginService.CreateAccount(user);

        if(result.getValue0() == null)
            throw new GenericBadRequestException(result.getValue1());

        return ResponseEntity.ok(new Response<>("Registration successful", true, null));
    }

    @PostMapping(path = "/login")
    public ResponseEntity<Response<AuthenticationResults>> Authenticate(@RequestHeader HttpHeaders headers,
                                                                        @RequestPart("username") String username,
                                                                        @RequestPart("password") String password) {
        logHeaders(headers);

        var result = loginService.Authenticate(username, password);

        if(result == null){
            throw new GenericBadRequestException("Login failed.");
        }

        return ResponseEntity.ok(new Response<>(String.format("Token: %s", result.getToken()), true, result));
    }

    @PostMapping(path = "/logout")
    public ResponseEntity<Response<Object>> Logout(@RequestHeader HttpHeaders headers) {
        logHeaders(headers);

        var authorization = loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular, UserType.Shelter));
        if(!authorization.getValue0())
            throw new UnauthorizedException();

        if(!headers.containsKey("token"))
            throw new GenericBadRequestException("Failed to logout");

        var token = Objects.requireNonNull(headers.get("token")).get(0);

        if(!loginService.Logout(token))
            throw new GenericBadRequestException("Failed to logout");

        return ResponseEntity.ok(new Response<>("Logout successful", true, null));
    }

}
