// validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// validate password strength
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

// store auth token in localstorage
export const storeAuthToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
};

// get auth token from localstorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

// remove auth token from localstorage
export const removeAuthToken = (): void => {
  localStorage.removeItem("auth_token");
};

// check if user is authenticated
export const isUserAuthenticated = (): boolean => {
  const token = getAuthToken();
  return !!token;
};

// format error message for signin
export const formatSigninError = (error: any): string => {
  if (typeof error === "string") {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return "An unexpected error occurred. Please try again.";
};

// prepare signin request body
export const prepareSigninBody = (email: string, password: string, rememberMe: boolean) => {
  return {
    email: email.trim().toLowerCase(),
    password,
    rememberMe,
  };
};