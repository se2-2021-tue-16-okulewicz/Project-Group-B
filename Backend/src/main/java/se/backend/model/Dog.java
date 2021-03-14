package se.backend.model;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
public class Dog {
    private String breed;
    private int age;
    private String size;
    private String color;
    private String specialMarks;
    private String name;
    //TODO: Add images
    private String hairLength;
    private String earsType;
    private String tailLength;
    //TODO: Add behaviours

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
}