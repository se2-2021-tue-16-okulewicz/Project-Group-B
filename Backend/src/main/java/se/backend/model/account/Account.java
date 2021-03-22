package se.backend.model.account;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@EqualsAndHashCode
@NoArgsConstructor
@MappedSuperclass
public class Account {

    @Column(name = "username")
    private String associatedEmail;
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAssociatedEmail() {
        return associatedEmail;
    }

    public void setAssociatedEmail(String associatedEmail) {
        this.associatedEmail = associatedEmail;
    }
}
