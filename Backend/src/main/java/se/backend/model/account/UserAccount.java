package se.backend.model.account;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import se.backend.model.account.Account;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "user_account")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserAccount extends Account implements Serializable{
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private long id;

        private String name;

        @Column(name = "phone_number")
        private String phoneNumber;
}
