package se.backend.model.account;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Data
@Embeddable
public class Address {
    private String country;
    private String town;
    private String street;
    
    @Column(name = "house_number")
    private String houseNumber;
}
