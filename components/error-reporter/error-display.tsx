import React from "react";
import { ErrorDetails } from "./error-details";

interface ErrorDisplayProps {
  error: Error & { digest?: string };
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <div className="max-w-md w-full text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-destructive">
          Something went wrong!
        </h1>
        <p className="text-muted-foreground">
          An unexpected error occurred. Please try again fixing with Orchids
        </p>
      </div>
      <div className="space-y-2">
        <ErrorDetails error={error} />
      </div>
    </div>
  );
};