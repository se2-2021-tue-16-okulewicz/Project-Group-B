package se.backend.wrapper.comments;

import lombok.Data;
import lombok.EqualsAndHashCode;
import se.backend.model.Picture;
import se.backend.model.dogs.Lost.LostDogComment;

@Data
@EqualsAndHashCode(callSuper = true)
public class CommentWithAuthorAndPicture extends LostDogComment {
    CommentAuthor author;
    private Picture picture;

    public CommentWithAuthorAndPicture(LostDogComment comment) {
        super(comment);
    }
}
