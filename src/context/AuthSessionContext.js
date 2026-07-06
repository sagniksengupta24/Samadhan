import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { getSession, onAuthStateChange, signOut } from "../services/authService";

const AuthSessionContext = createContext(null);

export function AuthSessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    let isMounted = true;
    let subscription;

    async function restoreSession() {
      setAuthLoading(true);
      setAuthError("");
      try {
        const restoredSession = await getSession();
        if (isMounted) {
          setSession(restoredSession);
        }
      } catch (error) {
        if (isMounted) {
          setAuthError(error.message || "Unable to restore your session.");
        }
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    }

    try {
      subscription = onAuthStateChange((nextSession) => {
        setSession(nextSession);
      });
    } catch (error) {
      setAuthError(error.message || "Unable to start authentication.");
      setAuthLoading(false);
    }

    restoreSession();

    return () => {
      isMounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  const signOutUser = useCallback(async () => {
    await signOut();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      authError,
      authLoading,
      currentUser: session?.user ?? null,
      session,
      signOutUser
    }),
    [authError, authLoading, session, signOutUser]
  );

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession() {
  const context = useContext(AuthSessionContext);

  if (!context) {
    throw new Error("useAuthSession must be used inside AuthSessionProvider.");
  }

  return context;
}
