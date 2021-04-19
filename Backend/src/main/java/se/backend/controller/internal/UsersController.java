package se.backend.controller.internal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.backend.exceptions.types.GenericBadRequestException;
import se.backend.exceptions.types.UnauthorizedException;
import se.backend.model.account.UserAccount;
import se.backend.service.login.LoginService;
import se.backend.service.user.UserService;
import se.backend.utils.Response;
import se.backend.wrapper.account.AuthenticationResults;
import se.backend.wrapper.account.UserType;
import se.backend.wrapper.user.UserInfo;

import java.util.List;
import java.util.Objects;

import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping(path = "user")
public class UsersController {

    private final Logger logger = LoggerFactory.getLogger(DogsController.class);
    private void logHeaders(@RequestHeader HttpHeaders headers) {
        logger.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(","))
        );
    }

    private final UserService userService;
    private final LoginService loginService;

    @Autowired
    public UsersController(UserService userService, LoginService loginService) {
        this.userService = userService;
        this.loginService = loginService;
    }

    @GetMapping(path = "/{userId}")
    public ResponseEntity<Response<UserInfo>> GetUser(@RequestHeader HttpHeaders headers,
                                                      @PathVariable("userId") long userId) {
        logHeaders(headers);

        var authorization = loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular, UserType.Shelter));
        if(!authorization.getValue0()) {
            throw new UnauthorizedException();
        }

        var result = userService.GetUser(userId);

        if(result == null)
            throw new GenericBadRequestException("User does not exist");

        return ResponseEntity.ok(new Response<>("User found", true, result));
    }

    @PutMapping(path = "/{userId}")
    public ResponseEntity<Response<UserInfo>> Authenticate(@RequestHeader HttpHeaders headers,
                                                                        @PathVariable("userId") long userId,
                                                                        @RequestPart("userdata") UserInfo userInfo) {
        logHeaders(headers);

        var authorization = loginService.IsAuthorized(headers, List.of(UserType.Regular));
        if(!authorization.getValue0()) {
            throw new UnauthorizedException();
        }
        if(authorization.getValue1() != userId) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response<>("You cannot edit other users' data", false, null));
        }

        var result = userService.EditUser(userId, userInfo);
        if(result.getValue0() == null){
            throw new GenericBadRequestException(result.getValue1());
        }

        return ResponseEntity.ok(new Response<>("Updated successfully", true, result.getValue0()));
    }

    @PostMapping(path = "/logout")
    public ResponseEntity<Response<Object>> Logout(@RequestHeader HttpHeaders headers) {
        logHeaders(headers);

        var authorization = loginService.IsAuthorized(headers, List.of(UserType.Admin, UserType.Regular, UserType.Shelter));
        if(!authorization.getValue0())
            throw new UnauthorizedException();

        if(!headers.containsKey(loginService.authorizationHeader))
            throw new GenericBadRequestException("Failed to logout");

        var token = Objects.requireNonNull(headers.get(loginService.authorizationHeader)).get(0);

        if(!loginService.Logout(token))
            throw new GenericBadRequestException("Failed to logout");

        return ResponseEntity.ok(new Response<>("Logout successful", true, null));
    }

}
