package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import se.backend.model.account.Shelter;

public interface DogShelterRepository extends JpaRepository<Shelter,Long> {
}
