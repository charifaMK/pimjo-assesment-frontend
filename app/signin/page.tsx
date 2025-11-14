"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { useSignin } from "@/hooks/use-signin";
import { OAuthButtons } from "@/components/signin/oauth-buttons";
import { SigninForm } from "@/components/signin/signin-form";

const SignInPage = (): React.ReactElement => {
  const {
    showPassword,
    isLoading,
    formData,
    handleInputChange,
    handleSignin,
    handleGoogleSignin,
    handleGithubSignin,
    togglePasswordVisibility,
  } = useSignin();

  return (
    <div className="min-h-screen py-24 bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-lg p-5 shadow-lg bg-gray-200">

        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900">Sign In to your account</h1>
        <p className="text-center text-gray-600 text-sm mb-8">
          Unlock exclusive access to premium components and design resources.
        </p>

        <OAuthButtons
          isLoading={isLoading}
          onGoogleSignin={handleGoogleSignin}
          onGithubSignin={handleGithubSignin}
        />

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-200 text-gray-600">Or continue with</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl">
          <SigninForm
            formData={formData}
            showPassword={showPassword}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onSubmit={handleSignin}
            onTogglePassword={togglePasswordVisibility}
          />

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Create account
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;