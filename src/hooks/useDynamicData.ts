import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Lesson, QuizQuestion, Snippet, Project } from "../types";

export function useDynamicData() {
  const [dbLessons, setDbLessons] = useState<Lesson[]>([]);
  const [dbQuizzes, setDbQuizzes] = useState<QuizQuestion[]>([]);
  const [dbSnippets, setDbSnippets] = useState<Snippet[]>([]);
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const unsubLessons = onSnapshot(collection(db, "lessons"), (snapshot) => {
      const list: Lesson[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as Lesson);
      });
      setDbLessons(list);
    }, (err) => {
      console.error("Error listening to lessons:", err);
    });

    const unsubQuizzes = onSnapshot(collection(db, "quizzes"), (snapshot) => {
      const list: QuizQuestion[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as QuizQuestion);
      });
      setDbQuizzes(list);
    }, (err) => {
      console.error("Error listening to quizzes:", err);
    });

    const unsubSnippets = onSnapshot(collection(db, "snippets"), (snapshot) => {
      const list: Snippet[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as Snippet);
      });
      setDbSnippets(list);
    }, (err) => {
      console.error("Error listening to snippets:", err);
    });

    const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
      const list: Project[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as Project);
      });
      setDbProjects(list);
      setLoading(false);
    }, (err) => {
      console.error("Error listening to projects:", err);
      setLoading(false);
    });

    return () => {
      unsubLessons();
      unsubQuizzes();
      unsubSnippets();
      unsubProjects();
    };
  }, []);

  // CRUD actions for admin:
  const saveLesson = async (lesson: Lesson) => {
    try {
      await setDoc(doc(db, "lessons", lesson.id), lesson);
    } catch (e) {
      console.error("Firestore write lesson failed:", e);
      throw e;
    }
  };

  const deleteLesson = async (id: string) => {
    try {
      await deleteDoc(doc(db, "lessons", id));
    } catch (e) {
      console.error("Firestore delete lesson failed:", e);
      throw e;
    }
  };

  const saveQuiz = async (quiz: QuizQuestion) => {
    try {
      await setDoc(doc(db, "quizzes", quiz.id), quiz);
    } catch (e) {
      console.error("Firestore write quiz failed:", e);
      throw e;
    }
  };

  const deleteQuiz = async (id: string) => {
    try {
      await deleteDoc(doc(db, "quizzes", id));
    } catch (e) {
      console.error("Firestore delete quiz failed:", e);
      throw e;
    }
  };

  const saveSnippet = async (snippet: Snippet) => {
    try {
      await setDoc(doc(db, "snippets", snippet.id), snippet);
    } catch (e) {
      console.error("Firestore write snippet failed:", e);
      throw e;
    }
  };

  const deleteSnippet = async (id: string) => {
    try {
      await deleteDoc(doc(db, "snippets", id));
    } catch (e) {
      console.error("Firestore delete snippet failed:", e);
      throw e;
    }
  };

  const saveProject = async (project: Project) => {
    try {
      await setDoc(doc(db, "projects", project.id), project);
    } catch (e) {
      console.error("Firestore write project failed:", e);
      throw e;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (e) {
      console.error("Firestore delete project failed:", e);
      throw e;
    }
  };

  return {
    dbLessons,
    dbQuizzes,
    dbSnippets,
    dbProjects,
    loading,
    saveLesson,
    deleteLesson,
    saveQuiz,
    deleteQuiz,
    saveSnippet,
    deleteSnippet,
    saveProject,
    deleteProject
  };
}
