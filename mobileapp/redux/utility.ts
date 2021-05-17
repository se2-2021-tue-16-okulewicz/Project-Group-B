/**
 * Returns true if email is valid, false otherwise
 * @param {String} email
 */
export function isEmailValid(email: string) {
  let emailRegex: RegExp =
    /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;

  return emailRegex.test(email);
}

/**
 * Returns true if username is valid, false otherwise
 * @param {String} username
 */
export function isUsernameValid(username: string) {
  if (username.length > 0) {
    return true;
  }
  return false;
}

/**
 * Returns true if password is valid, false otherwise
 * @param {String} password
 */
export function isPasswordValid(password: string) {
  if (password.length > 0) {
    return true;
  }
  return false;
}
