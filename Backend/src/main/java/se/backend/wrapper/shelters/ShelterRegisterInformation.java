package se.backend.wrapper.shelters;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import se.backend.model.account.Address;
import se.backend.model.account.Shelter;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShelterRegisterInformation {
    String name;
    Address address;
    String email;
    String phoneNumber;

    public Shelter toNewInactiveShelter() {
        Shelter shelter = new Shelter();
        shelter.setName(name);
        shelter.setPassword("");
        shelter.setAssociatedEmail(email);
        shelter.setPhoneNumber(phoneNumber);
        shelter.setAddress(address);
        shelter.setActive(false);
        shelter.setId(0);
        return shelter;
    }
}
