"use client";
import { useState, useEffect, useCallback } from "react";
import { getCurrentUser, saveUser, logout as logoutFn, updateUser } from "@/lib/auth";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    setLoading(false);

    // Cross-tab sync
    const storageHandler = (e: StorageEvent) => {
      if (e.key === "dh_user") setUser(getCurrentUser());
    };
    // Same-tab sync (after register/logout in same tab)
    const customHandler = () => setUser(getCurrentUser());

    window.addEventListener("storage", storageHandler);
    window.addEventListener("dh_user_changed", customHandler);
    return () => {
      window.removeEventListener("storage", storageHandler);
      window.removeEventListener("dh_user_changed", customHandler);
    };
  }, []);

  const login = useCallback((newUser: User) => {
    saveUser(newUser);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    logoutFn();
    setUser(null);
  }, []);

  const update = useCallback((updates: Partial<User>) => {
    updateUser(updates);
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  return { user, loading, login, logout, update, isAuthenticated: !!user };
}
