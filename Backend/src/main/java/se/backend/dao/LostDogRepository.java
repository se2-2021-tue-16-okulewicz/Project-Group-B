package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.backend.model.LostDog;

public interface LostDogRepository extends JpaRepository<LostDog, Long>, JpaSpecificationExecutor<LostDog> {
}
