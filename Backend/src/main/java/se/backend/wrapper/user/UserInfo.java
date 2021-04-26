package se.backend.wrapper.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import se.backend.model.account.UserAccount;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
    String name;
    String email;
    String phoneNumber;

    public static UserInfo fromUserAccount(UserAccount userAccount) {
        var userInfo = new UserInfo();
        userInfo.setName(userAccount.getName());
        userInfo.setPhoneNumber(userAccount.getPhoneNumber());
        userInfo.setEmail(userAccount.getAssociatedEmail());
        return userInfo;
    }
}
