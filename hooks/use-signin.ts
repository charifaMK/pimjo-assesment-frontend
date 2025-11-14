"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signInWithGoogle, signInWithGitHub } from "@/lib/supabase";
import { storeAuthToken, formatSigninError, prepareSigninBody } from "@/lib/signin-utils";

// form data interface for signin
interface SigninFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// custom hook for signin functionality
export const useSignin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SigninFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  // handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle email/password signin
  const handleSignin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const requestBody = prepareSigninBody(formData.email, formData.password, formData.rememberMe);
      
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Invalid email or password. Please make sure you have already registered an account and try again.");
        setIsLoading(false);
        return;
      }

      // store token in localstorage
      storeAuthToken(data.token);

      toast.success("Signed in successfully!");
      router.push("/overview");
    } catch (error) {
      toast.error(formatSigninError(error));
      setIsLoading(false);
    }
  };

  // handle google signin
  const handleGoogleSignin = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error("Failed to sign in with Google. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred with Google sign in. Please try again.");
      setIsLoading(false);
    }
  };

  // handle github signin
  const handleGithubSignin = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGitHub();
      if (error) {
        toast.error("Failed to sign in with GitHub. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred with GitHub sign in. Please try again.");
      setIsLoading(false);
    }
  };

  // toggle password visibility
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return {
    showPassword,
    isLoading,
    formData,
    handleInputChange,
    handleSignin,
    handleGoogleSignin,
    handleGithubSignin,
    togglePasswordVisibility,
  };
};