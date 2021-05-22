package se.backend.model.account;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import se.backend.model.account.Address;
import se.backend.wrapper.shelters.ShelterInformation;

import javax.persistence.*;
import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "shelter_account")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@NoArgsConstructor
public class Shelter extends Account implements Serializable {
    private String name;
    private String phoneNumber;
    private boolean active;

    @Embedded
    private Address address;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    public ShelterInformation ToShelterInformation() {
        return new ShelterInformation(id, name, address, phoneNumber, getAssociatedEmail());
    }
}
