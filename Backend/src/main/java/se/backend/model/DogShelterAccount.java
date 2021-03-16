package se.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "userAccount")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class DogShelterAccount extends Account implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int associatedShelterID;
}
