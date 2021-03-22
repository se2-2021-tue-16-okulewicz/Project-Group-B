package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import se.backend.model.account.DogShelterAccount;
import se.backend.model.account.UserAccount;

public interface DogShelterAccountRepository extends JpaRepository<DogShelterAccount, Long> {
}
