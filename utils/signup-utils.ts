// validates password strength and length requirements
export const validatePassword = (password: string): { isValid: boolean; message: string | null } => {
  if (password.length < 8) {
    return { isValid: false, message: "password must be at least 8 characters long" };
  }
  return { isValid: true, message: null };
};

// validates email format using regex pattern
export const validateEmail = (email: string): { isValid: boolean; message: string | null } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "please enter a valid email address" };
  }
  
  return { isValid: true, message: null };
};

// validates full name length and format
export const validateFullName = (fullName: string): { isValid: boolean; message: string | null } => {
  if (fullName.trim().length < 2) {
    return { isValid: false, message: "full name must be at least 2 characters long" };
  }
  
  return { isValid: true, message: null };
};

// validates that password and confirm password fields match
export const validatePasswordMatch = (password: string, confirmPassword: string): { isValid: boolean; message: string | null } => {
  if (password !== confirmPassword) {
    return { isValid: false, message: "passwords do not match" };
  }
  
  return { isValid: true, message: null };
};

// performs comprehensive validation of the entire signup form
export const validateSignupForm = (formData: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  // validate full name field
  const nameValidation = validateFullName(formData.fullName);
  if (!nameValidation.isValid && nameValidation.message) {
    errors.fullName = nameValidation.message;
  }
  
  // validate email field
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid && emailValidation.message) {
    errors.email = emailValidation.message;
  }
  
  // validate password field
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid && passwordValidation.message) {
    errors.password = passwordValidation.message;
  }
  
  // validate password confirmation field
  const passwordMatchValidation = validatePasswordMatch(formData.password, formData.confirmPassword);
  if (!passwordMatchValidation.isValid && passwordMatchValidation.message) {
    errors.confirmPassword = passwordMatchValidation.message;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};


export const signupUser = async (userData: {
  email: string;
  name: string;
  password: string;
}): Promise<{ success: boolean; message: string; error?: string }> => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error === "USER_ALREADY_EXISTS") {
        return { 
          success: false, 
          message: "email already registered. please sign in instead.",
          error: data.error 
        };
      } else {
        return { 
          success: false, 
          message: data.message || "registration failed. please try again.",
          error: data.error 
        };
      }
    }

    return { 
      success: true, 
      message: "account created successfully! redirecting to sign in..." 
    };
  } catch (error) {
    return { 
      success: false, 
      message: "an error occurred. please try again.",
      error: "NETWORK_ERROR" 
    };
  }
};

// converts error codes to user-friendly error messages
export const formatErrorMessage = (error: string): string => {
  const errorMap: Record<string, string> = {
    "USER_ALREADY_EXISTS": "email already registered. please sign in instead.",
    "INVALID_EMAIL": "please enter a valid email address.",
    "WEAK_PASSWORD": "password must be at least 8 characters long.",
    "NETWORK_ERROR": "network error. please check your connection and try again.",
    "UNKNOWN_ERROR": "an unexpected error occurred. please try again.",
  };

  return errorMap[error] || errorMap["UNKNOWN_ERROR"];
};
