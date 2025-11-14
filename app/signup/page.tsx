"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { useSignup } from "@/hooks/use-signup";
import { SignupForm, OAuthButtons } from "@/components/signup";

const SignUpPage = (): React.ReactElement => {
  const {
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
  } = useSignup();

  return (
    <div className="min-h-screen bg-gray-50 py-24 flex items-center justify-center px-4">
      <Card className="w-full max-w-lg p-8 shadow-lg bg-gray-200">
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900">
          sign up to your account
        </h1>
        <p className="text-center text-gray-600 text-sm mb-8">
          join us and start your journey today, it only takes a minute to get started.
        </p>

        <OAuthButtons
          isLoading={isLoading}
          onGoogleSignIn={handleGoogleSignIn}
          onGitHubSignIn={handleGitHubSignIn}
          />

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-200 text-gray-600">or continue with</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl">
          <SignupForm
            formData={formData}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onSubmit={handleSignUp}
            onTogglePassword={togglePasswordVisibility}
            onToggleConfirmPassword={toggleConfirmPasswordVisibility}
            />

          <p className="text-center text-sm text-gray-600 mt-4">
            already have an account?{" "}
            <Link href="/signin" className="text-blue-600 hover:text-blue-700 font-medium">
              login now
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;