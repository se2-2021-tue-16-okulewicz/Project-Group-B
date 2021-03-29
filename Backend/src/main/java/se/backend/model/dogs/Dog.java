package se.backend.model.dogs;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import se.backend.model.Location;
import se.backend.utils.StringUtils;

import javax.persistence.*;

@Data
@EqualsAndHashCode
@NoArgsConstructor
@MappedSuperclass
public class Dog {
    private String breed;
    private int age;
    private long pictureId;
    private String size;
    private String color;
    private String specialMarks;
    private String name;
    private String hairLength;
    private String earsType;
    private String tailLength;
    @Embedded
    private Location location;

    public Dog(Dog another){
        breed = another.breed;
        age = another.age;
        size = another.size;
        color = another.color;
        specialMarks = another.specialMarks;
        name = another.name;
        hairLength = another.hairLength;
        earsType = another.earsType;
        tailLength =  another.tailLength;
        pictureId = another.pictureId;
        location = another.location;
    }

    public boolean IsValid() {
        return StringUtils.isValidString(breed) &&
                StringUtils.isValidString(size) &&
                StringUtils.isValidString(color) &&
                StringUtils.isValidString(specialMarks) &&
                StringUtils.isValidString(name) &&
                StringUtils.isValidString(hairLength) &&
                StringUtils.isValidString(earsType) &&
                StringUtils.isValidString(tailLength) &&
                location != null &&
                StringUtils.isValidString(location.getCity()) &&
                StringUtils.isValidString(location.getDistrict());
    }
}
