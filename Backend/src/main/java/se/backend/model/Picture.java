package se.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.imageio.ImageIO;
import javax.persistence.*;
import java.io.ByteArrayInputStream;
import java.net.URLConnection;

@Entity
@Table(name = "picture")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String fileName;
    private String fileType;

    @Lob
    private byte[] data;

    public boolean isValid() {
        try {
            //Illegal element in file name
            if(fileName.contains(".."))
                return false;

            //Invalid mime type
            String nameMimeType = URLConnection.guessContentTypeFromName(fileName);

            if(!nameMimeType.equals(fileType))
                return false;

            //Checking if binary data is correctly recognized as an image
            return ImageIO.read(new ByteArrayInputStream(data)) != null;
        } catch (Exception e) {
            return false;
        }
    }
}
