package se.backend.controller.internal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.backend.dao.UserAccountRepository;
import se.backend.exceptions.types.GenericBadRequestException;
import se.backend.model.account.Account;
import se.backend.model.account.UserAccount;
import se.backend.service.login.LoginService;
import se.backend.service.lostdogs.LostDogService;
import se.backend.utils.Response;
import se.backend.wrapper.account.AuthenticationResults;

import java.net.http.HttpResponse;

@RestController
@RequestMapping(path = "")
public class UserController {
    private UserAccountRepository userAccountRepository;
    private final LoginService loginService;

    @Autowired
    public UserController(LoginService loginService) {
        this.loginService = loginService;
    }

    public ResponseEntity<Response<UserAccount>> createUserAccount(UserAccount user, String password){
        return null;
    }
    public ResponseEntity<Response<UserAccount>> updateUser(UserAccount user) {
        return null;
    }
    @PostMapping(path = "/login")
    public ResponseEntity<Response<AuthenticationResults>> authenticate(String username, String password){
        var result = this.loginService.authenticate(username,password);
        if(result == null){
            throw new GenericBadRequestException("Login failed.");
        }
        return ResponseEntity.ok(new Response<AuthenticationResults>(String.format("Token: %s", result.getToken()), true, result));
    }

}
