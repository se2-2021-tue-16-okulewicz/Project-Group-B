package se.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "picture")
@Data
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String fileName;
    private String fileType;

    @Lob
    private byte[] data;
}
