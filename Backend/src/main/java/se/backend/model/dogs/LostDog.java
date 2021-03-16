package se.backend.model.dogs;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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
    }

    public LostDog(Dog parent) {
        super(parent);
    }
}
