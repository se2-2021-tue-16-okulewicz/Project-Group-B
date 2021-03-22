package se.backend.model.account;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "admin_account")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AdminAccount extends Account{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

}
