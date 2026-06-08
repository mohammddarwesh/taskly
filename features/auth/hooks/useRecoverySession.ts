"use client";
import { useEffect, useState } from "react";

const getSessionFromHash = () => {
  if (typeof window === "undefined") return { accessToken: null, isValidRecovery: false };
  const params = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = params.get("access_token");
  const type = params.get("type");
  return { accessToken, isValidRecovery: type === "recovery" && !!accessToken };
};

export const useRecoverySession = () => {
  const [session, setSession] = useState(getSessionFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setSession(getSessionFromHash()); 
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return session;
};