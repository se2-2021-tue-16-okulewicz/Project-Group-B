package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.backend.model.account.Shelter;
import se.backend.model.dogs.Shelter.ShelterDog;

public interface ShelterAccountRepository extends JpaRepository<Shelter,Long>, JpaSpecificationExecutor<Shelter> {
}
