/**
 * Coverts array of bytes into base64 string
 * @param {Uint8Array} image Array with bytes as numbers
 */
export function byteArrayToBase64(image) {
  return btoa(Uint8ToString(image));
}

/**
 * Concatenates many Uint8Arrays from 1 array of them into one Uint8Array
 * @param {Array<Uint8Array>} arrays Array of Uint8Arrays that will be concatenated
 */
export function concatUint8Arrays(arrays) {
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  if (!arrays.length) return null;

  let result = new Uint8Array(totalLength);

  let length = 0;
  for (let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}

/**
 * Converts Uiny8Array into proper string in chunks
 * @param {Uint8Array} u8a Uint8Array that will be converted to string in chunks
 */
export function Uint8ToString(u8a) {
  var CHUNK_SZ = 0x8000;
  var c = [];
  for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
    c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
  }
  return c.join("");
}
/**
 * Returns a promise to convert the file into Base64 string
 * @param {File} file
 */
export function fileToBase64(file) {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });
}
/**
 * Converts Date object or string formatted like "2020-12-18T00:00:00" to
 * string formatted like "18-12-2020"
 * @param {string} date
 */
export function dateFormat(date) {
  if (!date) return null;
  let date_;
  if (typeof date === "string") {
    date_ = new Date(date);
  } else {
    date_ = date;
  }
  return `${date_.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })}`;
}

/**
 * Returns encrypted string
 * @param {String} string
 */
export function Encrypt(string) {
  let length = string.length;
  var result = "";
  var charcode = 0;

  for (var i = 0; i < length; i++) {
    charcode = (string[i].charCodeAt() + i + 2) % 128;
    result += String.fromCharCode(charcode);
  }
  return result;
}

/**
 * Returns true if email is valid, false otherwise
 * @param {String} email
 */
export function isEmailValid(email) {
  const re = /\S+@\S+\.\S+/;

  if (email.match(re)) {
    return true;
  }
  return false;
}

/**
 * Returns true if username is valid, false otherwise
 * @param {String} username
 */
export function isUsernameValid(username) {
  if (username.length > 8) {
    return true;
  }
  return false;
}

/**
 * Returns true if password is valid, false otherwise
 * @param {String} password
 */
export function isPasswordValid(password) {
  if (password.length >= 8) {
    return true;
  }
  return false;
}
