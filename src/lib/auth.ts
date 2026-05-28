import type { User } from "@/types";

const AUTH_KEY = "dh_user";
const USERS_KEY = "dh_users";

// Stored user includes password hash (never exposed outside this module)
interface StoredUser extends User {
  passwordHash: string;
}

// ─── Crypto ────────────────────────────────────────────────────────────────────

async function sha256(text: string): Promise<string> {
  if (typeof window === "undefined") return "";
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ─── Users store ───────────────────────────────────────────────────────────────

function getAllUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveAllUsers(users: StoredUser[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ─── Session ───────────────────────────────────────────────────────────────────

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
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
  window.dispatchEvent(new Event("dh_user_changed"));
}

export function updateUser(updates: Partial<User>): void {
  if (typeof window === "undefined") return;
  const current = getCurrentUser();
  if (!current) return;
  localStorage.setItem(AUTH_KEY, JSON.stringify({ ...current, ...updates }));
}

// ─── Phone uniqueness check ────────────────────────────────────────────────────

export function isPhoneRegistered(phone: string): boolean {
  const normalized = phone.replace(/\D/g, "");
  return getAllUsers().some((u) => u.phone.replace(/\D/g, "") === normalized);
}

// ─── Register ──────────────────────────────────────────────────────────────────

export type RegisterResult =
  | { ok: true; user: User }
  | { ok: false; error: "phone_taken" | "password_mismatch" | "invalid" };

export async function registerUser(
  name: string,
  phone: string,
  password: string,
  confirmPassword: string,
  email?: string
): Promise<RegisterResult> {
  if (password !== confirmPassword) {
    return { ok: false, error: "password_mismatch" };
  }
  if (isPhoneRegistered(phone)) {
    return { ok: false, error: "phone_taken" };
  }

  const passwordHash = await sha256(password);
  const user: User = {
    id: `phone_${Date.now()}`,
    name: name.trim(),
    phone: phone.trim(),
    email: email?.trim() ?? "",
    provider: "phone",
    createdAt: new Date().toISOString(),
  };

  const users = getAllUsers();
  users.push({ ...user, passwordHash });
  saveAllUsers(users);
  saveUser(user);

  return { ok: true, user };
}

// ─── Login ─────────────────────────────────────────────────────────────────────

export type LoginResult =
  | { ok: true; user: User }
  | { ok: false; error: "not_found" | "wrong_password" };

export async function loginUser(
  phone: string,
  password: string
): Promise<LoginResult> {
  const normalized = phone.replace(/\D/g, "");
  const found = getAllUsers().find(
    (u) => u.phone.replace(/\D/g, "") === normalized
  );

  if (!found) return { ok: false, error: "not_found" };

  const hash = await sha256(password);
  if (hash !== found.passwordHash) return { ok: false, error: "wrong_password" };

  // Strip hash before saving to session
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _h, ...user } = found;
  saveUser(user);
  return { ok: true, user };
}
