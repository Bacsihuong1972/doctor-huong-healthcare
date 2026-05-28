import type { JournalEntry, UserProfile } from "@/types";

const KEYS = {
  JOURNAL: "dh_journal",
  PROFILE: "dh_profile",
  FONT_SIZE: "dh_font_size",
  HIGH_CONTRAST: "dh_high_contrast",
} as const;

function progressKey(phone: string): string {
  return `dh_progress_${phone || "anon"}`;
}

// Progress — keyed by phone number so each user keeps their own progress
export function getProgress(phone: string): Record<string, "not-started" | "in-progress" | "completed"> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(progressKey(phone)) || "{}");
  } catch {
    return {};
  }
}

export function setLessonProgress(
  phone: string,
  slug: string,
  status: "not-started" | "in-progress" | "completed"
): void {
  if (typeof window === "undefined") return;
  const progress = getProgress(phone);
  progress[slug] = status;
  localStorage.setItem(progressKey(phone), JSON.stringify(progress));
}

export function getLessonProgress(
  phone: string,
  slug: string
): "not-started" | "in-progress" | "completed" {
  return getProgress(phone)[slug] ?? "not-started";
}

// Journal
export function getJournal(): Record<string, JournalEntry> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEYS.JOURNAL) || "{}");
  } catch {
    return {};
  }
}

export function saveJournalEntry(date: string, entry: JournalEntry): void {
  if (typeof window === "undefined") return;
  const journal = getJournal();
  journal[date] = entry;
  localStorage.setItem(KEYS.JOURNAL, JSON.stringify(journal));
}

export function getJournalEntry(date: string): JournalEntry | null {
  return getJournal()[date] ?? null;
}

export function clearJournal(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS.JOURNAL);
}

// User Profile
export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEYS.PROFILE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
}

// Font Size
export function getFontSize(): number {
  if (typeof window === "undefined") return 0;
  try {
    return parseInt(localStorage.getItem(KEYS.FONT_SIZE) || "0", 10);
  } catch {
    return 0;
  }
}

export function setFontSize(delta: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS.FONT_SIZE, String(delta));
}

// High contrast
export function getHighContrast(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEYS.HIGH_CONTRAST) === "true";
}

export function setHighContrast(val: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS.HIGH_CONTRAST, String(val));
}
