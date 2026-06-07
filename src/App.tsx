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
import { useProgress } from "./hooks/useProgress";
import { lessonsData } from "./data/lessons";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");
  const [playgroundCode, setPlaygroundCode] = useState<string>("");

  const {
    progress,
    toggleLessonCompleted,
    isLessonCompleted,
    saveQuizScore,
    getBestQuizScore,
    savePlaygroundCode,
    getPercentageCompleted,
  } = useProgress();

  // Find next uncompleted lesson to recommend continuing:
  const nextLessonId = lessonsData.find(l => !isLessonCompleted(l.id))?.id || lessonsData[0]?.id || "";

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
            percentCompleted={getPercentageCompleted()} 
            nextLessonId={nextLessonId} 
          />
        );
      case "learn":
        return (
          <Learn 
            setCurrentTab={setCurrentTab}
            setSelectedLessonId={setSelectedLessonId}
            isLessonCompleted={isLessonCompleted}
            percentCompleted={getPercentageCompleted()}
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
          />
        );
      case "projects":
        return (
          <Projects 
            setPlaygroundCode={setPlaygroundCode}
            setCurrentTab={setCurrentTab}
          />
        );
      case "quiz":
        return (
          <Quiz 
            saveQuizScore={saveQuizScore}
            getBestQuizScore={getBestQuizScore}
          />
        );
      default:
        return (
          <Home 
            setCurrentTab={setCurrentTab} 
            percentCompleted={getPercentageCompleted()} 
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
        percentCompleted={getPercentageCompleted()} 
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
