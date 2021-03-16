package se.backend.model.account;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import se.backend.model.account.Account;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "dog_shelter_account")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class DogShelterAccount extends Account implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private int associatedShelterID;
}
