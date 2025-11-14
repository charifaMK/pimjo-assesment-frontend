"use client";

import React, { useEffect } from "react";
import { useErrorReporter } from "../../hooks/use-error-reporter";
import { sendGlobalErrorToParent } from "../../lib/error-reporter-utils";
import { ErrorDisplay } from "./error-display";

interface ReporterProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}

const ErrorReporter: React.FC<ReporterProps> = ({ error, reset }) => {
  useErrorReporter();

  useEffect(() => {
    if (!error) return;
    sendGlobalErrorToParent(error);
  }, [error]);

  if (!error) return null;

  return (
    <html>
      <body className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <ErrorDisplay error={error} />
      </body>
    </html>
  );
};

export default ErrorReporter;