export type LessonStatus = "not-started" | "in-progress" | "completed";

export type LessonChapter =
  | "hieu-duong-huyet"
  | "nguy-co-va-theo-doi"
  | "thuc-hanh-bua-an"
  | "ke-hoach-ca-nhan";

export interface SafetyAlertData {
  type: "default" | "medication" | "exercise" | "diet";
  message: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContent {
  openingLine: string;
  simpleSummary: string;
  actionToday: string;
  illustrationPlaceholder?: string;
  illustrationAlt?: string;
  body: string[];
  safetyAlerts?: SafetyAlertData[];
  quiz: QuizQuestion[];
  sources: string[];
}

export interface Lesson {
  id: number;
  slug: string;
  title: string;
  chapter: LessonChapter;
  estimatedMinutes: number;
  icon: string;
  previewText: string;
  hasSafetyAlert: boolean;
  content?: LessonContent;
}

export type RightsStatus = "requires-permission" | "original-redraw";

export interface ImageManifestEntry {
  id: string;
  title: string;
  srcPlaceholder: string;
  alt: string;
  sourceTitle: string;
  sourceAuthor: string;
  sourceYear: number;
  sourcePage: string;
  rightsStatus: RightsStatus;
  caption: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  icon: string;
  fileName: string;
  type: "pdf" | "checklist" | "journal";
}

export interface JournalEntry {
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  exercise: string;
  bloodSugar: string;
  feeling: string;
  medicationTaken: boolean | null;
}

export type AuthProvider = "phone";

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  provider: AuthProvider;
  age?: number;
  condition?: "type2" | "prediabetes" | "elderly" | "other";
  usesMedication?: boolean;
  usesInsulin?: boolean;
  createdAt: string;
}

export interface UserProfile {
  name?: string;
  condition: "type2" | "prediabetes" | "elderly" | "other";
  usesMedication: boolean;
  usesInsulin: boolean;
  acceptedDisclaimer: boolean;
  startedAt: string;
}
