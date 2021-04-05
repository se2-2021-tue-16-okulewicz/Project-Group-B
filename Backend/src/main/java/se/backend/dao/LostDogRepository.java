package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import se.backend.model.dogs.LostDog;

public interface LostDogRepository extends JpaRepository<LostDog, Long>, JpaSpecificationExecutor<LostDog> {
    @Modifying
    @Query("update LostDog d set d.isIsFound = 1 where d.id = :dogId")
    void markLostDogFound(@Param("dogId") Long dogId);
}
