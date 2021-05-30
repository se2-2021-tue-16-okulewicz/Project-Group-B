package se.backend.wrapper.comments;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import se.backend.model.account.UserAccount;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentAuthor {
    String name;
    String email;
    String phoneNumber;
    long id;

    public static CommentAuthor fromAccount(UserAccount account) {
        CommentAuthor ret = new CommentAuthor();
        ret.name = account.getName();
        ret.email = account.getAssociatedEmail();
        ret.phoneNumber = account.getPhoneNumber();
        ret.id = account.getId();
        return ret;
    }
}