package se.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;
import lombok.EqualsAndHashCode;
import se.backend.utils.JsonDateDeserializer;
import se.backend.utils.JsonDateSerializer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "lost_dogs")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class LostDog extends Dog {
    private String lostLocation;

    @Column(name = "date_lost")
    @JsonDeserialize(using = JsonDateDeserializer.class)
    @JsonSerialize(using = JsonDateSerializer.class)
    private LocalDateTime dateLost;
}