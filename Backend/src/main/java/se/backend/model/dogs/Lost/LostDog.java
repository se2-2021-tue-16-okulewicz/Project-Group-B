package se.backend.model.dogs.Lost;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import se.backend.model.Location;
import se.backend.model.dogs.Dog;
import se.backend.utils.StringUtils;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "lost_dog")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class LostDog extends Dog {
    private long ownerId;
    private boolean isIsFound = false;

    @Embedded
    private Location location;

    private LocalDate dateLost;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    public LostDog(LostDog another) {
        super((Dog)another);
        ownerId = another.ownerId;
        isIsFound = another.isIsFound; //Json field should be 'isFound', so simple fix is to rename field to 'isIsFound'
        dateLost = another.dateLost;
        id = another.id;
        location = another.location;
    }

    public LostDog(Dog parent) {
        super(parent);
    }

    public boolean IsValid() {
        if(dateLost == null)
            return false;
        if(location == null || !StringUtils.IsValidString(location.getCity()) || !StringUtils.IsValidString(location.getDistrict()))
            return false;

        return super.IsValid();
    }
}
