package se.backend.model.dogs.Lost;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;
import se.backend.model.Location;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "lost_dog_comment")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class LostDogComment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Embedded
    private Location location;

    private long pictureId;
    private long authorId;
    private long dogId;

    private String text;

    public LostDogComment(LostDogComment another) {
        id = another.id;
        location = another.location;
        pictureId = another.pictureId;
        authorId = another.authorId;
        dogId = another.dogId;
        text = another.text;
    }
}
