package se.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "table_empty")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class EmptyModel implements Serializable {

    private static final long serialVersionUID = -6783504532088859179L;

    public static EmptyModel EMPTY = new EmptyModel();

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
}
