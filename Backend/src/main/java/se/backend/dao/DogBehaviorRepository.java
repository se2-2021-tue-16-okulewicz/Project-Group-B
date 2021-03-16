package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.backend.model.dogs.DogBehavior;

import java.util.List;

public interface DogBehaviorRepository extends JpaRepository<DogBehavior, Long>, JpaSpecificationExecutor<DogBehavior> {
    List<DogBehavior> findAllByDogId(long dogId);
}
