import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, Search, Copy, Check, ChevronLeft, ChevronRight, Play,
  AlertTriangle, HelpCircle, GraduationCap, ArrowRight, CheckCircle2 
} from "lucide-react";
import { Lesson } from "../../types";
import { lessonsData } from "../../data/lessons";

type DocsProps = {
  selectedLessonId: string;
  setSelectedLessonId: (id: string) => void;
  toggleLessonCompleted: (id: string) => void;
  isLessonCompleted: (id: string) => boolean;
  setCurrentTab: (tab: string) => void;
  setPlaygroundCode: (code: string) => void;
};

export default function Docs({
  selectedLessonId,
  setSelectedLessonId,
  toggleLessonCompleted,
  isLessonCompleted,
  setCurrentTab,
  setPlaygroundCode
}: DocsProps) {

  const [searchQuery, setSearchQuery] = useState("");
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showInterviewAnswer, setShowInterviewAnswer] = useState(false);

  // Fallback to first lesson if none is selected
  const activeLessonId = selectedLessonId || lessonsData[0]?.id || "";
  const activeLesson = lessonsData.find((l) => l.id === activeLessonId) || lessonsData[0];

  // References for scrolling
  const explanationRef = useRef<HTMLDivElement>(null);
  const exampleRef = useRef<HTMLDivElement>(null);
  const taskRef = useRef<HTMLDivElement>(null);
  const mistakesRef = useRef<HTMLDivElement>(null);
  const interviewRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  // Reset quiz states when active lesson changes
  useEffect(() => {
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setShowInterviewAnswer(false);
  }, [activeLessonId]);

  // Copy code utility
  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Launch example in sandbox playground
  const handleOpenInPlayground = (code: string) => {
    setPlaygroundCode(code);
    setCurrentTab("playground");
  };

  // Filter lessons based on key filters
  const filteredLessons = lessonsData.filter((l) =>
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.explanation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Prev / Next logic handlers
  const activeIndex = lessonsData.findIndex((l) => l.id === activeLessonId);
  const prevLesson = activeIndex > 0 ? lessonsData[activeIndex - 1] : null;
  const nextLesson = activeIndex < lessonsData.length - 1 ? lessonsData[activeIndex + 1] : null;

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    elementRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Safe checks for rendering
  if (!activeLesson) {
    return (
      <div className="min-h-screen text-center py-20 font-mono text-black text-xs font-black">
        NO LESSONS FOUND IN SYSTEM DIRECTORY.
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black font-mono animate-fade-in py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Search banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-8 border-b-4 border-black pb-6 items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <BookOpen className="text-[#00FF00] fill-black stroke-black stroke-[2.5]" size={22} />
          <h1 className="font-display font-black text-xl tracking-tighter text-black uppercase">KNOWLEDGE BASE</h1>
        </div>
        
        {/* Global doc completion label */}
        <div className="text-[11px] text-black font-bold uppercase flex items-center space-x-2 bg-yellow-300 border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span>PROGRESS DETECTOR:</span>
          <span className="text-black font-black">
            {lessonsData.filter((l) => isLessonCompleted(l.id)).length} OF {lessonsData.length} TOPICS MASTERED
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Topic Navigation list */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white border-4 border-black p-4 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Search Input block */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics..."
                className="w-full bg-white border-3 border-black text-xs text-black p-2.5 pl-8 focus:outline-none focus:bg-[#00FF00]/5 font-mono placeholder-neutral-500 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
              <Search className="absolute left-2.5 top-3.5 text-black" size={13} />
            </div>

            {/* Level Gated Navigation list */}
            {["Beginner", "Intermediate", "Advanced"].map((level) => {
              const levelLessons = filteredLessons.filter((l) => l.level === level);
              if (levelLessons.length === 0) return null;

              return (
                <div key={level} className="space-y-2">
                  <div className="flex items-center justify-between border-b-2 border-black pb-1 mt-2">
                    <span className="text-[10px] font-black text-black uppercase tracking-widest">{level}</span>
                    <span className="text-[10px] bg-black text-white px-1.5 font-bold border border-black">
                      {levelLessons.length}
                    </span>
                  </div>
                  
                  <nav className="space-y-1">
                    {levelLessons.map((item) => {
                      const active = item.id === activeLessonId;
                      const completed = isLessonCompleted(item.id);

                      return (
                        <button
                          key={item.id}
                          onClick={() => setSelectedLessonId(item.id)}
                          className={`w-full flex items-center justify-between text-left px-2 py-2 text-xs transition-colors cursor-pointer border-2 ${
                            active 
                              ? "bg-[#00FF00] text-black border-black font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" 
                              : "text-neutral-700 border-transparent hover:text-black hover:bg-neutral-100 hover:border-black font-bold"
                          }`}
                        >
                          <span className="truncate pr-1 uppercase tracking-tight">{item.title}</span>
                          {completed && (
                            <span className={active ? "text-black" : "text-black font-black"}>
                              <CheckCircle2 size={11} className="shrink-0 stroke-[3]" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              );
            })}

            {filteredLessons.length === 0 && (
              <span className="text-[10px] text-neutral-500 block text-center py-4 font-bold uppercase">NO COMPATIBLE TOPICS FOUND</span>
            )}
          </div>
        </aside>

        {/* Main core content segment */}
        <main className="lg:col-span-7 space-y-12">
          
          {/* Header lesson controls */}
          <div className="border-b-4 border-black pb-6 space-y-4">
            <div className="flex flex-wrap gap-2.5 items-center">
              <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-1 bg-yellow-300 border-2 border-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {activeLesson.level} INDEX
              </span>
              <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-purple-300 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                READ TIME: {activeLesson.estimate}
              </span>
              
              {/* Completed Button Trigger */}
              <button
                onClick={() => toggleLessonCompleted(activeLesson.id)}
                className={`ml-auto flex items-center space-x-2 text-[10px] font-black uppercase py-1.5 px-3 border-2 border-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-black ${
                  isLessonCompleted(activeLesson.id)
                    ? "bg-[#00FF00]"
                    : "bg-white hover:bg-neutral-100"
                }`}
              >
                <span>{isLessonCompleted(activeLesson.id) ? "✓ COMPLETED WORK" : "MARK AS DONE"}</span>
              </button>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-4xl text-black uppercase tracking-tighter leading-[1.0] mt-4">
              {activeLesson.title}
            </h2>

            <p className="font-sans text-xs text-neutral-800 leading-relaxed font-bold">
              {activeLesson.description}
            </p>
          </div>

          {/* Section: Simple explanation */}
          <section ref={explanationRef} className="space-y-4">
            <h3 className="text-xs font-black border-b-2 border-black pb-2 uppercase tracking-wide text-black">
              CONCEPTUAL EXPLANATION
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-800 leading-relaxed font-bold">
              {activeLesson.explanation}
            </p>
          </section>

          {/* Section: Syntax */}
          <section className="space-y-3 bg-white border-4 border-black p-5 font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-wider block">SYNTAX PATTERN</span>
            <pre className="text-white text-xs bg-black p-3.5 overflow-x-auto select-all leading-relaxed whitespace-pre border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {activeLesson.syntax}
            </pre>
          </section>

          {/* Section: Real Example Code block */}
          <section ref={exampleRef} className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-black pb-2">
              <h3 className="text-xs font-black uppercase tracking-wide text-black">
                SAMPLE WORKPIECE
              </h3>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleCopyCode(activeLesson.code)}
                  className="p-1 px-2.5 border-2 border-black bg-white text-black font-mono text-[10px] font-black hover:bg-neutral-100 flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  {copyFeedback ? <Check size={11} className="text-[#00FF00] stroke-[4]" /> : <Copy size={11} className="stroke-[3]" />}
                  <span>{copyFeedback ? "COPIED" : "COPY CODE"}</span>
                </button>
                <button
                  onClick={() => handleOpenInPlayground(activeLesson.code)}
                  className="p-1 px-2.5 border-2 border-black bg-[#00FF00] text-black font-mono text-[10px] font-black flex items-center gap-1 cursor-pointer hover:bg-black hover:text-[#00FF00] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <Play size={11} className="stroke-[3]" />
                  <span>OPEN IN PLAYGROUND</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <pre className="text-neutral-100 text-xs bg-black border-4 border-black p-4 rounded-none overflow-x-auto max-h-[380px] leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-all font-mono">
                {activeLesson.code}
              </pre>
            </div>

            {/* Explanation of outcomes */}
            <div className="bg-white border-4 border-black p-4 font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-[10px] font-black text-black uppercase tracking-widest block mb-1">RUNDOWN EXPLANATION</span>
              <p className="text-xs text-neutral-800 leading-relaxed font-bold">
                {activeLesson.outputExplanation}
              </p>
            </div>
          </section>

          {/* Section: Practice task card */}
          <section ref={taskRef} className="border-4 border-dashed border-black bg-yellow-300/30 p-5 space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center space-x-2 text-black">
              <HelpCircle size={15} className="stroke-[3]" />
              <span className="text-[11px] font-black uppercase tracking-widest">PRACTICE CHALLENGE TASK</span>
            </div>
            <p className="font-sans text-xs text-neutral-800 font-bold leading-relaxed">
              {activeLesson.practiceTask}
            </p>
            <div className="text-[9px] text-neutral-600 uppercase font-black">
              PRO TIP: Copy example parameters above into the live workspace and run audits manually to solidify understanding.
            </div>
          </section>

          {/* Section: Common mistakes */}
          <section ref={mistakesRef} className="border-l-8 border-red-500 pl-4 py-1 space-y-2">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertTriangle size={15} className="stroke-[3]" />
              <span className="text-[11px] font-black uppercase tracking-wider">CRITICAL PITFALLS & ERRORS</span>
            </div>
            <p className="font-sans text-xs text-neutral-800 font-bold leading-relaxed">
              {activeLesson.commonMistakes}
            </p>
          </section>

          {/* Section: Interview Question */}
          <section ref={interviewRef} className="border-4 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center space-x-2 text-black mb-2">
              <GraduationCap size={16} className="stroke-[3]" />
              <span className="text-[11px] font-black uppercase tracking-wider">SENIOR INTERVIEW QUESTIONS</span>
            </div>
            <p className="font-sans font-black text-xs text-neutral-900 mb-4 leading-normal">
              Q: &ldquo;{activeLesson.interviewQuestion}&rdquo;
            </p>
            
            {showInterviewAnswer ? (
              <div className="bg-[#00FF00]/10 border-3 border-black p-4 text-xs font-sans text-neutral-800 rounded-none leading-relaxed animate-fade-in shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-mono text-[9px] text-black font-black uppercase block mb-1 bg-yellow-300 border border-black w-fit px-1">PRO-ENGINEER FEEDBACK ROUTE:</span>
                React relies on fiber data tree nodes to reconcile component outputs. The reconciler checks for structural shifts or changed prop identity markers, and triggers single-frame reflow computations directly into the real browser viewport dynamically while recycling DOM nodes to keep execution times under 16ms thresholds.
                <button 
                  onClick={() => setShowInterviewAnswer(false)} 
                  className="block mt-3 text-[10px] text-black underline uppercase font-black font-mono cursor-pointer"
                >
                  COLLAPSE FEEDBACK
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowInterviewAnswer(true)}
                className="bg-white border-2 border-black text-black text-[10px] font-black px-3 py-1.5 uppercase hover:bg-neutral-100 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                REVEAL INTERVIEW EXPLANATION
              </button>
            )}
          </section>

          {/* Section: Mini quiz module */}
          <section ref={quizRef} className="border-4 border-black bg-[#00FF00]/10 p-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="text-xs font-black text-black uppercase tracking-widest border-b-2 border-black pb-2">
              MINI-DIAGNOSTIC TEST
            </h4>

            <p className="font-sans text-xs sm:text-sm font-black text-black">
              {activeLesson.miniQuiz.question}
            </p>

            <div className="space-y-2 mt-4">
              {activeLesson.miniQuiz.options.map((option, idx) => {
                const isChosen = selectedAnswer === idx;
                const isCorrect = idx === activeLesson.miniQuiz.answerIndex;

                let optionStyles = "border-black text-black bg-white hover:bg-[#00FF00]/10";
                if (quizSubmitted) {
                  if (isCorrect) {
                     optionStyles = "border-black text-black bg-yellow-300 font-black";
                  } else if (isChosen) {
                     optionStyles = "border-black text-white bg-black font-bold";
                  } else {
                     optionStyles = "border-neutral-200 text-neutral-400 opacity-50 bg-white";
                  }
                } else if (isChosen) {
                  optionStyles = "border-black bg-[#00FF00] text-black font-black";
                }

                return (
                  <button
                    key={idx}
                    disabled={quizSubmitted}
                    onClick={() => setSelectedAnswer(idx)}
                    className={`w-full flex items-start text-left p-3.5 text-xs tracking-tight border-2 rounded-none font-sans transition-all duration-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${optionStyles} ${
                      !quizSubmitted ? "cursor-pointer" : ""
                    }`}
                  >
                    <span className="font-mono text-[10px] text-neutral-500 mr-2 uppercase">[{String.fromCharCode(65 + idx)}]</span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && !quizSubmitted && (
              <button
                onClick={() => setQuizSubmitted(true)}
                className="w-full bg-[#00FF00] text-black border-3 border-black font-mono font-black uppercase text-xs p-2.5 hover:bg-black hover:text-[#00FF00] tracking-wider cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                SUBMIT CHOICE
              </button>
            )}

            {quizSubmitted && (
              <div className="bg-white border-3 border-black p-4 text-xs leading-relaxed animate-fade-in shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {selectedAnswer === activeLesson.miniQuiz.answerIndex ? (
                  <p className="text-black bg-[#00FF00] border border-black w-fit px-1.5 py-0.5 font-black uppercase mb-1 flex items-center gap-1 text-[11px]">🟢 CORRECT SELECTION!</p>
                ) : (
                  <p className="text-white bg-black w-fit px-1.5 py-0.5 font-black uppercase mb-1 flex items-center gap-1 text-[11px]">🔴 MISSED TARGET!</p>
                )}
                <p className="text-neutral-800 mt-1 font-sans font-bold text-xs leading-normal">
                  {activeLesson.miniQuiz.explanation}
                </p>
              </div>
            )}
          </section>

          {/* Prev / Next Bottom navigation */}
          <div className="flex justify-between items-center border-t-2 border-black pt-6">
            {prevLesson ? (
              <button
                onClick={() => setSelectedLessonId(prevLesson.id)}
                className="flex items-center space-x-1.5 text-xs text-black border-2 border-black bg-white px-3 py-1.5 font-black uppercase tracking-tight shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <ChevronLeft size={14} className="stroke-[3]" />
                <span>PREV: {prevLesson.title.slice(0, 15)}...</span>
              </button>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <button
                onClick={() => setSelectedLessonId(nextLesson.id)}
                className="flex items-center space-x-1.5 text-xs text-black border-2 border-black bg-[#00FF00] px-3 py-1.5 font-black uppercase tracking-tight shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <span>NEXT: {nextLesson.title.slice(0, 15)}...</span>
                <ChevronRight size={14} className="stroke-[3]" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentTab("quiz")}
                className="flex items-center space-x-1.5 text-xs text-black border-2 border-black bg-yellow-300 px-3 py-1.5 font-black uppercase tracking-tight shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <span>PROCEED TO QUIZ LABS</span>
                <ArrowRight size={14} className="stroke-[3]" />
              </button>
            )}
          </div>

        </main>

        {/* Right Table of contents navigation panel */}
        <aside className="lg:col-span-2 hidden lg:block font-mono">
          <div className="sticky top-24 space-y-4">
            <h4 className="text-[10px] font-black uppercase text-neutral-500 tracking-widest border-b-2 border-black pb-2">
              LESSON DIRECTORY
            </h4>
            
            <ul className="space-y-3.5 text-[10px] font-black uppercase text-neutral-700">
              <li>
                <button 
                  onClick={() => scrollToSection(explanationRef)}
                  className="hover:text-black hover:underline cursor-pointer"
                >
                  ❯ Concept Summary
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection(exampleRef)}
                  className="hover:text-black hover:underline cursor-pointer"
                >
                  ❯ Live Example
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection(taskRef)}
                  className="hover:text-black hover:underline cursor-pointer"
                >
                  ❯ Practice Task
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection(mistakesRef)}
                  className="hover:text-black hover:underline cursor-pointer"
                >
                  ❯ Common Mistakes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection(interviewRef)}
                  className="hover:text-black hover:underline cursor-pointer"
                >
                  ❯ Interview specs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection(quizRef)}
                  className="hover:text-black hover:underline text-black bg-[#00FF00] px-1 border border-black cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                >
                  ⚡ Lesson Test
                </button>
              </li>
            </ul>

            {/* Completion status widget info */}
            <div className="bg-[#00FF00]/10 border-4 border-black p-4 mt-6 text-[10px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-black font-black block uppercase mb-2">Completion status:</span>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="completion-checkbox"
                  checked={isLessonCompleted(activeLesson.id)}
                  onChange={() => toggleLessonCompleted(activeLesson.id)}
                  className="w-4 h-4 rounded-none accent-black bg-white border-2 border-black cursor-pointer"
                />
                <label htmlFor="completion-checkbox" className="font-black text-black uppercase cursor-pointer select-none">
                  {isLessonCompleted(activeLesson.id) ? "DONE & CHECKED" : "UNCOMPLETED"}
                </label>
              </div>
            </div>

          </div>
        </aside>

      </div>

    </div>
  );
}
