package se.backend.utils;

import org.apache.commons.validator.EmailValidator;

import java.util.regex.Pattern;

public class StringUtils {
    public static boolean IsValidString(String s) {
        return s != null && !s.isEmpty() && !s.isBlank();
    }

    public static boolean IsStringAnEmail(String potentialEmail) {
        return EmailValidator.getInstance().isValid(potentialEmail);
    }

    private static final String PHONE_NUMBER_GARBAGE_REGEX = "[()\\s-]+";
    private static final String PHONE_NUMBER_REGEX = "^((\\+[1-9]?[0-9])|0)?[7-9]?[0-9]{9}$";
    private static final Pattern PHONE_NUMBER_PATTERN = Pattern.compile(PHONE_NUMBER_REGEX);
    public static boolean IsStringAPhoneNumber(String potentialPhoneNumber) {
        return potentialPhoneNumber != null && PHONE_NUMBER_PATTERN.matcher(potentialPhoneNumber.replaceAll(PHONE_NUMBER_GARBAGE_REGEX, "")).matches();
    }
}
