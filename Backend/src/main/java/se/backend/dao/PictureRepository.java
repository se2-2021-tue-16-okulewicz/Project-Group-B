package se.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.backend.model.Picture;

public interface PictureRepository extends JpaRepository<Picture, Long>, JpaSpecificationExecutor<Picture> {
}
