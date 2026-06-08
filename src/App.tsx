import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Learn from "./components/pages/Learn";
import Docs from "./components/pages/Docs";
import Playground from "./components/pages/Playground";
import Snippets from "./components/pages/Snippets";
import Projects from "./components/pages/Projects";
import Quiz from "./components/pages/Quiz";
import Admin from "./components/pages/Admin";
import Profile from "./components/pages/Profile";
import { useProgress } from "./hooks/useProgress";
import { useDynamicData } from "./hooks/useDynamicData";
import { lessonsData } from "./data/lessons";
import { quizzesData } from "./data/quizzes";
import { snippetsData } from "./data/snippets";
import { projectsData } from "./data/projects";
import { Lesson, QuizQuestion, Snippet, Project } from "./types";

export default function App() {
  const [currentTab, rawSetCurrentTab] = useState<string>(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/admin") {
        return "admin";
      }
    }
    return "home";
  });

  const setCurrentTab = (tab: string) => {
    rawSetCurrentTab(tab);
    if (typeof window !== "undefined") {
      const targetPath = tab === "admin" ? "/admin" : "/";
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, "", targetPath);
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === "/admin") {
        rawSetCurrentTab("admin");
      } else {
        rawSetCurrentTab((prev) => (prev === "admin" ? "home" : prev));
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const [selectedLessonId, setSelectedLessonId] = useState<string>("");
  const [playgroundCode, setPlaygroundCode] = useState<string>("");

  const {
    progress,
    toggleLessonCompleted,
    isLessonCompleted,
    saveQuizScore,
    getBestQuizScore,
    savePlaygroundCode,
    user,
    loadingAuth,
    loginWithGoogle,
    logout,
    resetAllProgress,
  } = useProgress();

  // Load dynamic Realtime Database documents from cloud Firestore
  const {
    dbLessons,
    dbQuizzes,
    dbSnippets,
    dbProjects,
    saveLesson,
    deleteLesson,
    saveQuiz,
    deleteQuiz,
    saveSnippet,
    deleteSnippet,
    saveProject,
    deleteProject
  } = useDynamicData();

  // Load local mock items from localStorage for seamless guest-mode testing
  const [localLessons, setLocalLessons] = useState<Lesson[]>([]);
  const [localQuizzes, setLocalQuizzes] = useState<QuizQuestion[]>([]);
  const [localSnippets, setLocalSnippets] = useState<Snippet[]>([]);
  const [localProjects, setLocalProjects] = useState<Project[]>([]);

  useEffect(() => {
    try {
      const l = localStorage.getItem("reactplay_custom_lessons");
      const q = localStorage.getItem("reactplay_custom_quizzes");
      const s = localStorage.getItem("reactplay_custom_snippets");
      const p = localStorage.getItem("reactplay_custom_projects");
      if (l) setLocalLessons(JSON.parse(l));
      if (q) setLocalQuizzes(JSON.parse(q));
      if (s) setLocalSnippets(JSON.parse(s));
      if (p) setLocalProjects(JSON.parse(p));
    } catch (e) {
      console.error("Local records load error", e);
    }
  }, []);

  // Compute merged unified collections deduplicated by target ID
  const deduplicateById = <T extends { id: string }>(staticList: T[], dbList: T[], localList: T[]): T[] => {
    const map = new Map<string, T>();
    staticList.forEach(item => map.set(item.id, item));
    dbList.forEach(item => map.set(item.id, item));
    localList.forEach(item => map.set(item.id, item));
    return Array.from(map.values());
  };

  const allLessons = deduplicateById(lessonsData, dbLessons, localLessons);
  const allQuizzes = deduplicateById(quizzesData, dbQuizzes, localQuizzes);
  const allSnippets = deduplicateById(snippetsData, dbSnippets, localSnippets);
  const allProjects = deduplicateById(projectsData, dbProjects, localProjects);

  // Recommend uncompleted lessons:
  const nextLessonId = allLessons.find(l => !isLessonCompleted(l.id))?.id || allLessons[0]?.id || "";

  // Dynamic Progress calculations
  const calcPercentCompleted = (): number => {
    const total = allLessons.length;
    if (total === 0) return 0;
    const completedCount = allLessons.filter(l => isLessonCompleted(l.id)).length;
    return Math.round((completedCount / total) * 100);
  };
  const percentageValue = calcPercentCompleted();

  // Synchronize initial progress code back to playground states if any was stored
  useEffect(() => {
    if (progress.savedPlaygroundCode) {
      setPlaygroundCode(progress.savedPlaygroundCode);
    }
  }, [progress.savedPlaygroundCode]);

  // Render correct visual tab panel dynamically
  const renderTabContent = () => {
    switch (currentTab) {
      case "home":
        return (
          <Home 
            setCurrentTab={setCurrentTab} 
            percentCompleted={percentageValue} 
            nextLessonId={nextLessonId} 
          />
        );
      case "learn":
        return (
          <Learn 
            setCurrentTab={setCurrentTab}
            setSelectedLessonId={setSelectedLessonId}
            isLessonCompleted={isLessonCompleted}
            percentCompleted={percentageValue}
            allLessons={allLessons}
          />
        );
      case "docs":
        return (
          <Docs 
            selectedLessonId={selectedLessonId}
            setSelectedLessonId={setSelectedLessonId}
            toggleLessonCompleted={toggleLessonCompleted}
            isLessonCompleted={isLessonCompleted}
            setCurrentTab={setCurrentTab}
            setPlaygroundCode={setPlaygroundCode}
            allLessons={allLessons}
          />
        );
      case "playground":
        return (
          <Playground 
            playgroundCode={playgroundCode}
            setPlaygroundCode={setPlaygroundCode}
            savePlaygroundCode={savePlaygroundCode}
          />
        );
      case "snippets":
        return (
          <Snippets 
            setPlaygroundCode={setPlaygroundCode}
            setCurrentTab={setCurrentTab}
            allSnippets={allSnippets}
          />
        );
      case "projects":
        return (
          <Projects 
            setPlaygroundCode={setPlaygroundCode}
            setCurrentTab={setCurrentTab}
            allProjects={allProjects}
          />
        );
      case "quiz":
        return (
          <Quiz 
            saveQuizScore={saveQuizScore}
            getBestQuizScore={getBestQuizScore}
            allQuizzes={allQuizzes}
          />
        );
      case "admin":
        return (
          <Admin 
            user={user}
            loadingAuth={loadingAuth}
            loginWithGoogle={loginWithGoogle}
            logout={logout}
            dbLessons={dbLessons}
            dbQuizzes={dbQuizzes}
            dbSnippets={dbSnippets}
            dbProjects={dbProjects}
            saveLesson={saveLesson}
            deleteLesson={deleteLesson}
            saveQuiz={saveQuiz}
            deleteQuiz={deleteQuiz}
            saveSnippet={saveSnippet}
            deleteSnippet={deleteSnippet}
            saveProject={saveProject}
            deleteProject={deleteProject}
            localLessons={localLessons}
            localQuizzes={localQuizzes}
            localSnippets={localSnippets}
            localProjects={localProjects}
            setLocalLessons={setLocalLessons}
            setLocalQuizzes={setLocalQuizzes}
            setLocalSnippets={setLocalSnippets}
            setLocalProjects={setLocalProjects}
          />
        );
      case "profile":
        return (
          <Profile 
            user={user}
            loadingAuth={loadingAuth}
            progress={progress}
            allLessons={allLessons}
            percentCompleted={percentageValue}
            loginWithGoogle={loginWithGoogle}
            logout={logout}
            resetAllProgress={resetAllProgress}
            setCurrentTab={setCurrentTab}
            setSelectedLessonId={setSelectedLessonId}
            setPlaygroundCode={setPlaygroundCode}
          />
        );
      default:
        return (
          <Home 
            setCurrentTab={setCurrentTab} 
            percentCompleted={percentageValue} 
            nextLessonId={nextLessonId} 
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black border-4 sm:border-8 border-black font-sans">
      {/* 1. Global Navigation header layout */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        percentCompleted={percentageValue} 
        user={user}
        loadingAuth={loadingAuth}
        loginWithGoogle={loginWithGoogle}
        logout={logout}
      />

      {/* 2. Main Page Viewer slot with clean bounds container */}
      <main className="flex-grow bg-white">
        {renderTabContent()}
      </main>

      {/* 3. Global developer information footer */}
      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
}
