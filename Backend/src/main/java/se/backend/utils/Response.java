package se.backend.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Response<T> {
    String message;
    boolean successful;
    T data;
}
