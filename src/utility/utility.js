export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateDateOfBirth = (dob) => {
    const dateOfBirth = new Date(dob);
    const today = new Date();

    if (dateOfBirth > today) {
      return false;
    }

    return true;
  };