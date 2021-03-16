package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.backend.model.dogs.LostDog;

public interface LostDogRepository extends JpaRepository<LostDog, Long>, JpaSpecificationExecutor<LostDog> {
}
