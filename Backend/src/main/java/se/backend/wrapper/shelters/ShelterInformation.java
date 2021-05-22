package se.backend.wrapper.shelters;

import lombok.AllArgsConstructor;
import lombok.Data;
import se.backend.model.account.Address;

@Data
@AllArgsConstructor
public class ShelterInformation {
    private long id;
    private String name;
    private Address address;
    private String phoneNumber;
    private String email;
}
