/**
 * Validates that a password meets the following criteria:
 * - It contains at least one letter
 * - It contains at least one number
 * - It is at least 8 characters long
 * @param {string} str - The password to validate
 * @returns {boolean} - true if the password is valid, false otherwise
 */
const validatePassword = (str) => {
  const regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Regular expression to match password criteria
  return regExp.test(str); // Returns true if the password matches the criteria, false otherwise
};

module.exports = { validatePassword };
