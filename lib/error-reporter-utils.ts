interface GlobalErrorPayload {
  type: "global-error-reset";
  error: {
    message: string;
    stack?: string;
    digest?: string;
    name: string;
  };
  timestamp: number;
  userAgent: string;
}

export const sendGlobalErrorToParent = (error: Error & { digest?: string }): void => {
  const payload: GlobalErrorPayload = {
    type: "global-error-reset",
    error: {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      name: error.name,
    },
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
  };

  window.parent.postMessage(payload, "*");
};

export const isInIframe = (): boolean => {
  return window.parent !== window;
};