package se.backend.service.user;

import org.javatuples.Pair;
import se.backend.model.account.UserAccount;
import se.backend.wrapper.user.UserInfo;

public interface UserService {
    UserInfo GetUser(long userId);

    /**
     * First value is UserInfo - null if sth failed, Second value is error message (in the case of first value is null)
     */
    Pair<UserInfo, String> EditUser(long userId, UserInfo editedInfo);
}
