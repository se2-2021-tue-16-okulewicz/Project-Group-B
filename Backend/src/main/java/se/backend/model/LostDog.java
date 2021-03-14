package se.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import se.backend.utils.JsonDateDeserializer;
import se.backend.utils.JsonDateSerializer;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "lost_dogs")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class LostDog extends Dog {
    private String lostLocation;

    @Column(name = "date_lost")
    @JsonDeserialize(using = JsonDateDeserializer.class)
    @JsonSerialize(using = JsonDateSerializer.class)
    private LocalDateTime dateLost;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
}
