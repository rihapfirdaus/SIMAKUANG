import {
  REQUIRED_FIELD_ERROR,
  INVALID_EMAIL_ERROR,
  SHORT_PASSWORD_ERROR,
  PASSWORD_MISMATCH_ERROR,
  INVALID_PASSWORD_ERROR,
} from "./Strings";

export function EmailValidation(email) {
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (email === "") {
    return {
      valid: false,
      errorMessage: REQUIRED_FIELD_ERROR,
    };
  } else {
    return {
      valid: validation,
      errorMessage: validation ? "" : INVALID_EMAIL_ERROR,
    };
  }
}

export function PasswordValidation(password) {
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasLength = password.length >= 8;
  const validation = hasLength && (hasNumber || hasSpecialChar);
  if (password === "") {
    return {
      valid: false,
      errorMessage: REQUIRED_FIELD_ERROR,
    };
  } else {
    if (hasLength) {
      return {
        valid: validation,
        errorMessage: validation ? "" : INVALID_PASSWORD_ERROR,
      };
    } else {
      return {
        valid: validation,
        errorMessage: validation ? "" : SHORT_PASSWORD_ERROR,
      };
    }
  }
}

export function InputValidation(value) {
  return value === ""
    ? {
        valid: false,
        errorMessage: REQUIRED_FIELD_ERROR,
      }
    : {
        valid: true,
        errorMessage: "",
      };
}

export function RepasswordValidation(password, repassword) {
  if (repassword === "") {
    return {
      valid: false,
      errorMessage: REQUIRED_FIELD_ERROR,
    };
  } else {
    return password == repassword
      ? {
          valid: true,
          errorMessage: "",
        }
      : {
          valid: false,
          errorMessage: PASSWORD_MISMATCH_ERROR,
        };
  }
}

export function LoginFormValidation(email, password) {
  return EmailValidation(email).valid && PasswordValidation(password).valid
    ? true
    : false;
}

export function SignupFormValidation(email, name, password, repassword) {
  return EmailValidation(email).valid &&
    InputValidation(name).valid &&
    PasswordValidation(password).valid &&
    RepasswordValidation(repassword).valid
    ? false
    : true;
}
