package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.backend.model.dogs.DogBehaviour;

public interface DogBehaviourRepository extends JpaRepository<DogBehaviour, Long>, JpaSpecificationExecutor<DogBehaviour> {
}
