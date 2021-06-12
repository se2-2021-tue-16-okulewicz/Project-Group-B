package se.backend.model.account;

import lombok.Data;
import se.backend.utils.StringUtils;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Data
@Embeddable
public class Address {
    private String city;
    private String street;
    private String postCode;
    private String buildingNumber;
    private String additionalAddressLine;

}
