package se.backend.utils;

public class StringUtils {
    public static boolean isValidString(String s) {
        return s != null && !s.isEmpty() && !s.isBlank();
    }
}
