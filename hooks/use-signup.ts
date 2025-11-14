"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signInWithGoogle, signInWithGitHub } from "@/lib/supabase";
import { validateSignupForm, signupUser } from "@/utils/signup-utils";

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// return type for the hook
interface UseSignupReturn {
  formData: SignupFormData;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignUp: (e: React.FormEvent) => Promise<void>;
  handleGoogleSignIn: () => Promise<void>;
  handleGitHubSignIn: () => Promise<void>;
  togglePasswordVisibility: () => void;
  toggleConfirmPasswordVisibility: () => void;
}

// custom hook for signup logic
export const useSignup = (): UseSignupReturn => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // toggle password visibility
  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  // toggle confirm password visibility
  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword((prev) => !prev);
  };


  // handle email/password signup
  const handleSignUp = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // validate form using utility function
    const validation = validateSignupForm(formData);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      toast.error(firstError);
      return;
    }

    setIsLoading(true);

    try {
      // use utility function for api call
      const result = await signupUser({
        email: formData.email,
        name: formData.fullName,
        password: formData.password,
      });

      if (result.success) {
        toast.success(result.message);
        setTimeout(() => {
          router.push("/signin?registered=true");
        }, 1500);
      } else {
        toast.error(result.message);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("an error occurred. please try again.");
      setIsLoading(false);
    }
  };

  // handle google signup
  const handleGoogleSignIn = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error("failed to sign up with google. please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("an error occurred with google sign up. please try again.");
      setIsLoading(false);
    }
  };

  // handle github signup
  const handleGitHubSignIn = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGitHub();
      if (error) {
        toast.error("failed to sign up with github. please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("an error occurred with github sign up. please try again.");
      setIsLoading(false);
    }
  };

  return {
    formData,
    showPassword,
    showConfirmPassword,
    isLoading,
    handleInputChange,
    handleSignUp,
    handleGoogleSignIn,
    handleGitHubSignIn,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
};