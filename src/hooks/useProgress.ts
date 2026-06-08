import { useState, useEffect, useRef } from "react";
import { ProgressState } from "../types";
import { lessonsData } from "../data/lessons";
import { auth, db, googleAuthProvider, handleFirestoreError, OperationType } from "../lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const STORAGE_KEY = "reactplay_docs_progress_v2";

const initialProgress: ProgressState = {
  completedLessons: [],
  completedQuizzes: {},
  savedPlaygroundCode: "",
};

export function useProgress() {
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
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

  // Track initial fetch state to prevent overwriting cloud sync on startup
  const initialFetchFromCloudDone = useRef<boolean>(false);

  const fetchCloudProgress = async (currentUser: any) => {
    if (!currentUser) return;
    const userDocRef = doc(db, "users", currentUser.uid);
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProgress((prev) => {
          const localLessons = prev.completedLessons || [];
          const cloudLessons = data.completedLessons || [];
          const mergedLessons = Array.from(new Set([...localLessons, ...cloudLessons]));

          const mergedQuizzes = { ...prev.completedQuizzes };
          const cloudQuizzes = data.completedQuizzes || {};
          Object.keys(cloudQuizzes).forEach((topic) => {
            mergedQuizzes[topic] = Math.max(mergedQuizzes[topic] || 0, cloudQuizzes[topic] || 0);
          });

          const mergedCode = data.savedPlaygroundCode || prev.savedPlaygroundCode;

          return {
            completedLessons: mergedLessons,
            completedQuizzes: mergedQuizzes,
            savedPlaygroundCode: mergedCode,
          };
        });
      } else {
        // Doc doesn't exist, create it initially with current local states
        await setDoc(userDocRef, {
          uid: currentUser.uid,
          email: currentUser.email || "",
          completedLessons: progress.completedLessons,
          completedQuizzes: progress.completedQuizzes,
          savedPlaygroundCode: progress.savedPlaygroundCode,
          updatedAt: serverTimestamp()
        });
      }
    } catch (e) {
      console.error("Failed to sync secure user progression:", e);
      handleFirestoreError(e, OperationType.GET, `users/${currentUser.uid}`);
    } finally {
      initialFetchFromCloudDone.current = true;
      setLoadingAuth(false);
    }
  };

  // 1. Setup authentication listener
  useEffect(() => {
    let unsubscribe: any = null;
    try {
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          fetchCloudProgress(currentUser);
        } else {
          initialFetchFromCloudDone.current = false;
          setLoadingAuth(false);
        }
      });
    } catch (err) {
      console.warn("Firebase Auth listener failed, returning to local fallback mode:", err);
      setLoadingAuth(false);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // 2. Persists changes to local storage as fallback
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error("Failed to persist progress details:", e);
    }
  }, [progress]);

  // 3. Sync changes to cloud (Debounced state synchronization)
  useEffect(() => {
    if (!user || !initialFetchFromCloudDone.current) return;

    const syncToCloud = async () => {
      const userDocRef = doc(db, "users", user.uid);
      try {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email || "",
          completedLessons: progress.completedLessons,
          completedQuizzes: progress.completedQuizzes,
          savedPlaygroundCode: progress.savedPlaygroundCode,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        console.error("Failed to sync progress to cloud Firestore:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      syncToCloud();
    }, 1200); // 1.2s delay to protect DB quota and minimize network strain

    return () => clearTimeout(delayDebounce);
  }, [progress, user]);

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
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      return result.user;
    } catch (error) {
      console.error("Failed to sign in with Google OAuth under Firebase:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      resetAllProgress();
    } catch (error) {
      console.error("Failed to sign out from Firebase auth:", error);
    }
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
    user,
    loadingAuth,
    loginWithGoogle,
    logout,
  };
}
