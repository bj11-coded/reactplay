import { useState, useEffect } from "react";
import { ProgressState } from "../types";
import { lessonsData } from "../data/lessons";

const STORAGE_KEY = "reactplay_docs_progress_v2";

const initialProgress: ProgressState = {
  completedLessons: [],
  completedQuizzes: {},
  savedPlaygroundCode: "",
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    if (typeof window === "undefined") return initialProgress;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          completedLessons: parsed.completedLessons || [],
          completedQuizzes: parsed.completedQuizzes || {},
          savedPlaygroundCode: parsed.savedPlaygroundCode || "",
        };
      }
    } catch (e) {
      console.error("Failed to parse progress data from localStorage", e);
    }
    return initialProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error("Failed to persist progress details:", e);
    }
  }, [progress]);

  const toggleLessonCompleted = (lessonId: string) => {
    setProgress((prev) => {
      const alreadyDone = prev.completedLessons.includes(lessonId);
      const nextCompleted = alreadyDone
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return { ...prev, completedLessons: nextCompleted };
    });
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return progress.completedLessons.includes(lessonId);
  };

  const saveQuizScore = (topic: string, score: number) => {
    setProgress((prev) => {
      const currentBest = prev.completedQuizzes[topic] || 0;
      const nextBest = Math.max(currentBest, score);
      return {
        ...prev,
        completedQuizzes: {
          ...prev.completedQuizzes,
          [topic]: nextBest,
        },
      };
    });
  };

  const getBestQuizScore = (topic: string): number => {
    return progress.completedQuizzes[topic] || 0;
  };

  const savePlaygroundCode = (code: string) => {
    setProgress((prev) => ({ ...prev, savedPlaygroundCode: code }));
  };

  const getPercentageCompleted = (): number => {
    const totalLessons = lessonsData.length;
    if (totalLessons === 0) return 0;
    const completedCount = progress.completedLessons.length;
    return Math.round((completedCount / totalLessons) * 100);
  };

  const resetAllProgress = () => {
    setProgress(initialProgress);
  };

  return {
    progress,
    toggleLessonCompleted,
    isLessonCompleted,
    saveQuizScore,
    getBestQuizScore,
    savePlaygroundCode,
    getPercentageCompleted,
    resetAllProgress,
  };
}
