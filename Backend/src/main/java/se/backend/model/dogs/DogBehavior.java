package se.backend.model.dogs;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "dog_behavior")
@Data
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class DogBehavior {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private long dogId;
    private String behavior;
}
