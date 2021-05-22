package se.backend.wrapper.dogs;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import se.backend.model.Location;
import se.backend.model.dogs.Lost.LostDog;

import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
public class LostDogWithBehaviors extends LostDog {
    private List<String> behaviors;

    public LostDogWithBehaviors(LostDogWithBehaviors another) {
        super(another);
        behaviors = another.behaviors;
    }

    public LostDogWithBehaviors(String name, int age, String breed, String color, String size, String hairLength,
    String tailLength, String earsType,String specialMark, ArrayList<String> behavior,String city,String district,String dateLost){
        //super();
        this.setName(name);
        this.setAge(age);
        this.setBreed(breed);
        this.setColor(color);
        this.setSize(size);
        this.setHairLength(hairLength);
        this.setTailLength(tailLength);
        this.setEarsType(earsType);
        this.setSpecialMark(specialMark);
        Location l = new Location();
        l.setCity(city);
        l.setDistrict(district);
        this.setLocation(l);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate date = LocalDate.parse(dateLost, formatter);
        this.setDateLost(date);
        this.behaviors = new ArrayList<>(behavior);



    }

    public LostDogWithBehaviors(LostDog parent) {
        super(parent);
        behaviors = new ArrayList<String>();
    }

    public LostDog LostDogWithoutBehaviors() {
        var lostDog = new LostDog();
        lostDog.setDateLost(this.getDateLost());
        lostDog.setIsFound(this.isIsFound());
        lostDog.setBreed(this.getBreed());
        lostDog.setAge(this.getAge());
        lostDog.setSize(this.getSize());
        lostDog.setColor(this.getColor());
        lostDog.setSpecialMark(this.getSpecialMark());
        lostDog.setName(this.getName());
        lostDog.setHairLength(this.getHairLength());
        lostDog.setEarsType(this.getEarsType());
        lostDog.setTailLength(this.getTailLength());
        lostDog.setLocation(this.getLocation());
        return lostDog;
    }

    public boolean IsValid() {
        if(behaviors == null || behaviors.size() == 0)
            return false;
        return super.IsValid();
    }
}
