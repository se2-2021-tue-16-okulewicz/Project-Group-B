package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.backend.model.dogs.Shelter.ShelterDog;

public interface ShelterDogRepository extends JpaRepository<ShelterDog, Long>, JpaSpecificationExecutor<ShelterDog> {
}
