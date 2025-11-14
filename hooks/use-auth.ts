"use client";

import { useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSession = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("auth_token");
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/auth/session", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // token is invalid or has expired
        localStorage.removeItem("auth_token");
        setUser(null);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setUser(data.user || null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch session"));
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return {
    user,
    isLoading,
    error,
    refetch: fetchSession,
  };
};