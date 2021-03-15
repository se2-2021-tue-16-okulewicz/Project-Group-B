package se.backend.wrapper.dogs;

import lombok.Data;
import lombok.EqualsAndHashCode;
import se.backend.model.dogs.LostDog;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class LostDogWithBehaviors extends LostDog {
    private List<String> behaviors;
}
