package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.backend.model.dogs.Lost.LostDogBehavior;
import se.backend.model.dogs.Shelter.ShelterDogBehavior;

import java.util.List;

public interface ShelterDogBehaviorRepository extends JpaRepository<ShelterDogBehavior, Long>, JpaSpecificationExecutor<ShelterDogBehavior> {
    List<ShelterDogBehavior> findAllByDogId(long dogId);
}
