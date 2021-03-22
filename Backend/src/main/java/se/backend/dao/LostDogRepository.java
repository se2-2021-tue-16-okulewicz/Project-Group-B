package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.backend.model.dogs.DogBehavior;
import se.backend.model.dogs.LostDog;

import java.util.List;

public interface LostDogRepository extends JpaRepository<LostDog, Long>, JpaSpecificationExecutor<LostDog> {
}
