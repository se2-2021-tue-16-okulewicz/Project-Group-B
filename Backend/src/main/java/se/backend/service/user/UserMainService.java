package se.backend.service.user;

import org.javatuples.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import se.backend.dao.AdminAccountRepository;
import se.backend.dao.DogShelterAccountRepository;
import se.backend.dao.UserAccountRepository;
import se.backend.model.account.UserAccount;
import se.backend.utils.StringUtils;
import se.backend.wrapper.account.UserType;
import se.backend.wrapper.user.UserInfo;

import java.util.HashMap;
import java.util.List;

@Service
public class UserMainService implements  UserService {

    private final UserAccountRepository userAccountRepository;

    @Autowired
    public UserMainService (UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    @Override
    public UserInfo GetUser(long userId) {
        var user = userAccountRepository.findById(userId);
        return user.map(UserInfo::fromUserAccount).orElse(null);
    }

    @Override
    public Pair<UserInfo, String> EditUser(long userId, UserInfo editedInfo) {
        var originalAccount = userAccountRepository.findById(userId);

        if(originalAccount.isEmpty())
            return new Pair<>(null, "User does not exist");

        if(!StringUtils.IsValidString(editedInfo.getPhoneNumber()) ||
                !StringUtils.IsValidString(editedInfo.getName()) ||
                !StringUtils.IsValidString(editedInfo.getEmail()))
            return new Pair<>(null, "Incomplete data");

        if(!StringUtils.IsStringAnEmail(editedInfo.getEmail()))
            return new Pair<>(null, "Email is invalid");

        editedInfo.setEmail(editedInfo.getEmail().toLowerCase());

        if(userAccountRepository.existsByAssociatedEmail(editedInfo.getEmail()))
            return new Pair<>(null, "Email is already used");

        if(userAccountRepository.existsByName(editedInfo.getName()))
            return new Pair<>(null, "Name is already used");

        if(!StringUtils.IsStringAPhoneNumber(editedInfo.getPhoneNumber()))
            return new Pair<>(null, "Phone number is invalid");

        if(editedInfo.getName().length() < 3)
            return new Pair<>(null, "User name is too short");

        if(editedInfo.getName().length() > 32)
            return new Pair<>(null, "User name is too long");

        UserAccount editedAccount = new UserAccount();
        editedAccount.setId(userId);
        editedAccount.setName(editedInfo.getName());
        editedAccount.setAssociatedEmail(editedInfo.getEmail());
        editedAccount.setPhoneNumber(editedInfo.getPhoneNumber());
        editedAccount.setPassword(originalAccount.get().getPassword());
        userAccountRepository.save(editedAccount);

        return new Pair<>(editedInfo, "");
    }
}
