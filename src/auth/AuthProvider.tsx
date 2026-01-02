import { router, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearToken, getToken, setToken } from "./authStorage";

type AuthContextType = {
  token: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);
// context object with AuthContextType type

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // component that wraps the whole  app and provides auth data
  const segments = useSegments();
  // segments is an array describing the current path parts
  const [token, setTokenState] = useState<string |  null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const saved = await getToken();

      setTokenState(saved);
      setIsLoading(false);
    })();
  }, []);
  // empty dependency array [] means: run  this only once on mount.

  useEffect(() => {
    if (isLoading) return;
    const inAuthGroup = segments[0] === "(auth)";
    const isAuthed = !!token;

    if (isAuthed && !inAuthGroup) {
      router.replace("/(auth)/login");
    }

    if (isAuthed && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [segments, token, isLoading]);

  const value = useMemo<AuthContextType>(() => ({
    // useMemo caches this object so it doesn't recreate on every render unless dependencies change.
    token,
    isLoading,
    signIn: async (newToken: string) => {
      await setToken(newToken);
      setTokenState(newToken);
      router.replace("/(tabs)");
    },
    signOut: async () => {
      await clearToken();
      setTokenState(null);
      router.replace("/(auth)/(login)");
    },
  }), [token, isLoading]);

  return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>;
}

export function useAuth() {
  // custom hook to access auth context easily
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}