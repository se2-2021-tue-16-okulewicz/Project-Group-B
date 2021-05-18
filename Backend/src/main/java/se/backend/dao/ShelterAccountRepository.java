package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import se.backend.model.account.Shelter;

public interface ShelterAccountRepository extends JpaRepository<Shelter,Long> {
}
