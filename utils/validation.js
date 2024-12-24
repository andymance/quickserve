// validation.js

export const validateEmail = (email) => {
  // Specific validation for UB email format (7-digit student number@ub.edu.ph)
  const ubEmailPattern = /^[0-9]{7}@ub\.edu\.ph$/;
  return ubEmailPattern.test(email);
};

export const validatePassword = (password) => {
  // Password must be at least 8 characters with one uppercase, one lowercase, and one number
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordPattern.test(password);
};