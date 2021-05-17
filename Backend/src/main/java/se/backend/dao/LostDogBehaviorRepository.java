package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.backend.model.dogs.Lost.LostDogBehavior;

import java.util.List;

public interface LostDogBehaviorRepository extends JpaRepository<LostDogBehavior, Long>, JpaSpecificationExecutor<LostDogBehavior> {
    List<LostDogBehavior> findAllByDogId(long dogId);
}
