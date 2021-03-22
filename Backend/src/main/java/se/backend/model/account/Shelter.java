package se.backend.model.account;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;
import se.backend.model.account.Address;

import javax.persistence.*;

@Entity
@Table(name = "shelter")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@NoArgsConstructor
public class Shelter {
    private String name;

    @Embedded
    private Address address;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email_address")
    private String emailAddress;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long ID;

    @OneToOne(mappedBy = "shelter")
    private DogShelterAccount shelterAccount;
}
