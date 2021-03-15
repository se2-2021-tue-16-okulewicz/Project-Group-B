package se.backend.model.dogs;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@EqualsAndHashCode
@MappedSuperclass
public class Dog {
    private String breed;
    private int age;
    private String size;
    private String color;
    private String specialMarks;
    private String name;
    private String hairLength;
    private String earsType;
    private String tailLength;
}
