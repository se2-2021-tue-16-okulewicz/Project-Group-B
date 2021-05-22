package se.backend.model.dogs.Shelter;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import se.backend.model.dogs.DogBehavior;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "shelter_dog_behavior")
@Data
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ShelterDogBehavior extends DogBehavior {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
}