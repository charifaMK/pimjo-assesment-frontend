// validates email format using regex pattern
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// validates password strength with multiple criteria
export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters long" };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: "Password must contain at least one lowercase letter" };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: "Password must contain at least one uppercase letter" };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: "Password must contain at least one number" };
  }
  
  return { isValid: true };
};

// stores authentication token in browser local storage
export const storeAuthToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
};

// retrieves authentication token from browser local storage
export const getAuthToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

// removes authentication token from browser local storage
export const removeAuthToken = (): void => {
  localStorage.removeItem("auth_token");
};

// checks if user has valid authentication token
export const isUserAuthenticated = (): boolean => {
  const token = getAuthToken();
  return !!token;
};

// formats error messages for consistent user display
export const formatSigninError = (error: any): string => {
  if (typeof error === "string") {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return "An unexpected error occurred. Please try again.";
};

// prepares and sanitizes signin request data
export const prepareSigninBody = (email: string, password: string, rememberMe: boolean) => {
  return {
    email: email.trim().toLowerCase(),
    password,
    rememberMe,
  };
};