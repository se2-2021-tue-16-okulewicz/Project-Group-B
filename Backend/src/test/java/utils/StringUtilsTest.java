package utils;

import org.junit.jupiter.api.Test;
import se.backend.utils.StringUtils;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class StringUtilsTest {
    
    @Test
    public void IsValidStringTest() {
        assertTrue(StringUtils.IsValidString("Valid String"));
        assertFalse(StringUtils.IsValidString(""));
        assertFalse(StringUtils.IsValidString(null));
        assertFalse(StringUtils.IsValidString("    "));
        assertFalse(StringUtils.IsValidString("\t\t"));
        assertFalse(StringUtils.IsValidString("\t \t \t"));
    }

    @Test
    public void IsStringAnEmailTest() {
        assertTrue(StringUtils.IsStringAnEmail("email@mail.pl"));
        assertTrue(StringUtils.IsStringAnEmail("\" fancy valid email with spaces\"@mail.pl"));
        assertTrue(StringUtils.IsStringAnEmail("email-ip@[192.168.0.1]"));
        assertFalse(StringUtils.IsStringAnEmail("Not an email"));
        assertFalse(StringUtils.IsStringAnEmail("Mark.Buy@"));
        assertFalse(StringUtils.IsStringAnEmail("@mail.pl"));
        assertFalse(StringUtils.IsStringAnEmail("@."));
        assertFalse(StringUtils.IsStringAnEmail(""));
    }

    @Test
    public void IsStringAPhoneNumberTest() {
        assertTrue(StringUtils.IsStringAPhoneNumber("788 640 000"));
        assertTrue(StringUtils.IsStringAPhoneNumber("+48 788 64 00 00"));
        assertTrue(StringUtils.IsStringAPhoneNumber("+1-908-528-5656"));
        assertFalse(StringUtils.IsStringAPhoneNumber("Not an phone number"));
        assertFalse(StringUtils.IsStringAPhoneNumber("788 644"));
        assertFalse(StringUtils.IsStringAPhoneNumber("++11--32"));
        assertFalse(StringUtils.IsStringAPhoneNumber("@."));
        assertFalse(StringUtils.IsStringAPhoneNumber(""));
    }
}
