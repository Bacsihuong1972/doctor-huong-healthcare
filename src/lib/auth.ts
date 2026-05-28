import type { User } from "@/types";

const AUTH_KEY = "dh_user";

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveUser(user: User): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("dh_user_changed"));
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}

export function updateUser(updates: Partial<User>): void {
  if (typeof window === "undefined") return;
  const current = getCurrentUser();
  if (!current) return;
  const updated = { ...current, ...updates };
  localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
}

/**
 * Register with name + phone only.
 * Returns the user record stored in localStorage.
 */
export function registerByPhone(name: string, phone: string): User {
  const user: User = {
    id: `phone_${Date.now()}`,
    name: name.trim(),
    phone: phone.trim(),
    email: "",
    provider: "phone",
    createdAt: new Date().toISOString(),
  };
  saveUser(user);
  return user;
}
