package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import se.backend.model.account.AdminAccount;

public interface AdminAccountRepository extends JpaRepository<AdminAccount, Long> {
}
