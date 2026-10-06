export const validationData = (name, email, password) => {
  // Name validation only if name is provided
  if (name && !/^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)*$/.test(name.trim())) {
    return "Please enter a valid name...";
  }

  // Email validation
  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

  if (!isEmailValid) {
    return "Please enter a valid email address...";
  }

  // Password validation
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

  if (!isPasswordValid) {
    return "Please enter a valid password";
  }

  return null;
};