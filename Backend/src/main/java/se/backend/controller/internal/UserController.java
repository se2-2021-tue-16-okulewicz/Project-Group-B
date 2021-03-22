package se.backend.controller.internal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.backend.dao.UserAccountRepository;
import se.backend.exceptions.types.GenericBadRequestException;
import se.backend.model.account.Account;
import se.backend.model.account.UserAccount;
import se.backend.service.login.LoginService;
import se.backend.service.lostdogs.LostDogService;
import se.backend.utils.Response;
import se.backend.wrapper.account.AuthenticationResults;

import java.net.http.HttpResponse;

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
    public ResponseEntity<Response<UserAccount>> CreateUserAccount(@RequestHeader HttpHeaders headers,
                                                                   @RequestPart("username") String username,
                                                                   @RequestPart("password") String password,
                                                                   @RequestPart("phone_number") String phoneNumber,
                                                                   @RequestPart("email") String email) {
        return null;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<Response<AuthenticationResults>> Authenticate(@RequestHeader HttpHeaders headers,
                                                                        @RequestPart("username") String username,
                                                                        @RequestPart("password") String password) {
        logHeaders(headers);

        var result = this.loginService.authenticate(username, password);

        if(result == null){
            throw new GenericBadRequestException("Login failed.");
        }

        return ResponseEntity.ok(new Response<>(String.format("Token: %s", result.getToken()), true, result));
    }

}
