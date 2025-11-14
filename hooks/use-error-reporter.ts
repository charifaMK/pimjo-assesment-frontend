"use client";

import { useEffect, useRef } from "react";

interface ErrorData {
  message: string;
  stack?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  source: string;
}

interface ErrorPayload {
  type: "ERROR_CAPTURED";
  error: ErrorData;
  timestamp: number;
}

export const useErrorReporter = (): void => {
  const lastOverlayMsg = useRef<string>("");
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const inIframe = window.parent !== window;
    if (!inIframe) return;

    const sendError = (payload: unknown): void => {
      window.parent.postMessage(payload, "*");
    };

    const handleError = (e: ErrorEvent): void => {
      const errorPayload: ErrorPayload = {
        type: "ERROR_CAPTURED",
        error: {
          message: e.message,
          stack: e.error?.stack,
          filename: e.filename,
          lineno: e.lineno,
          colno: e.colno,
          source: "window.onerror",
        },
        timestamp: Date.now(),
      };
      sendError(errorPayload);
    };

    const handleUnhandledRejection = (e: PromiseRejectionEvent): void => {
      const errorPayload: ErrorPayload = {
        type: "ERROR_CAPTURED",
        error: {
          message: e.reason?.message ?? String(e.reason),
          stack: e.reason?.stack,
          source: "unhandledrejection",
        },
        timestamp: Date.now(),
      };
      sendError(errorPayload);
    };

    const pollNextjsOverlay = (): void => {
      const overlay = document.querySelector("[data-nextjs-dialog-overlay]");
      const node =
        overlay?.querySelector(
          "h1, h2, .error-message, [data-nextjs-dialog-body]"
        ) ?? null;
      const txt = node?.textContent ?? node?.innerHTML ?? "";
      
      if (txt && txt !== lastOverlayMsg.current) {
        lastOverlayMsg.current = txt;
        const errorPayload: ErrorPayload = {
          type: "ERROR_CAPTURED",
          error: { message: txt, source: "nextjs-dev-overlay" },
          timestamp: Date.now(),
        };
        sendError(errorPayload);
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    pollRef.current = setInterval(pollNextjsOverlay, 1000);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      if (pollRef.current) {
        clearInterval(pollRef.current);
      }
    };
  }, []);
};