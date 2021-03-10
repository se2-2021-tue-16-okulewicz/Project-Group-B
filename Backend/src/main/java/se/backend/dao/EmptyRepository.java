package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.backend.model.EmptyModel;

public interface EmptyRepository extends JpaRepository<EmptyModel, Long>, JpaSpecificationExecutor<EmptyModel> {

}
