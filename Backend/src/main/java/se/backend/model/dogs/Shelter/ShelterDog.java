package se.backend.model.dogs.Shelter;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import se.backend.model.dogs.Dog;

import javax.persistence.*;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "shelter_dog")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ShelterDog extends Dog {
    private long shelterId;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    public ShelterDog(ShelterDog another) {
        super((Dog)another);
        shelterId = another.shelterId;
        id = another.id;
    }

    public ShelterDog(Dog parent) {
        super(parent);
    }

    public boolean IsValid() {
        if(shelterId < 0)
            return false;
        return super.IsValid();
    }
}
