package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.backend.model.dogs.Lost.LostDogComment;

import java.util.List;

public interface LostDogCommentRepository extends JpaRepository<LostDogComment, Long>, JpaSpecificationExecutor<LostDogComment> {
    List<LostDogComment> findAllByDogId(long dogId);
}
