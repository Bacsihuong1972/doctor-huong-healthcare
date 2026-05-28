"use client";
import { useState, useEffect, useCallback } from "react";
import { getProgress, setLessonProgress, getLessonProgress } from "@/lib/localStorage";
import { useAuth } from "@/hooks/useAuth";
import type { LessonStatus } from "@/types";

export function useProgress() {
  const { user } = useAuth();
  const phone = user?.phone ?? "anon";
  const [progress, setProgress] = useState<Record<string, LessonStatus>>({});

  useEffect(() => {
    setProgress(getProgress(phone) as Record<string, LessonStatus>);
  }, [phone]);

  const markComplete = useCallback((slug: string) => {
    setLessonProgress(phone, slug, "completed");
    setProgress((prev) => ({ ...prev, [slug]: "completed" }));
  }, [phone]);

  const markInProgress = useCallback((slug: string) => {
    if (getLessonProgress(phone, slug) === "not-started") {
      setLessonProgress(phone, slug, "in-progress");
      setProgress((prev) => ({ ...prev, [slug]: "in-progress" }));
    }
  }, [phone]);

  const getStatus = useCallback(
    (slug: string): LessonStatus => progress[slug] ?? "not-started",
    [progress]
  );

  const completedCount = Object.values(progress).filter((s) => s === "completed").length;

  return { progress, markComplete, markInProgress, getStatus, completedCount };
}
