package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import se.backend.model.account.Account;
import se.backend.model.account.UserAccount;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    boolean existsByAssociatedEmail(String email);
    boolean existsByName(String name);
}
