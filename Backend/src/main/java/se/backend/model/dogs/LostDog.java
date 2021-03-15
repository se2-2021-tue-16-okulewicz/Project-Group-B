package se.backend.model.dogs;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;
import lombok.EqualsAndHashCode;
import se.backend.model.Location;
import se.backend.utils.JsonDateDeserializer;
import se.backend.utils.JsonDateSerializer;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "lost_dog")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class LostDog extends Dog {
    @Embedded
    private Location location;
    private long userId;
    private boolean isFound;

    private LocalDate dateLost;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
}
