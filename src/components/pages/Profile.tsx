import React from "react";
import { 
  User, CheckCircle2, Award, Code, RotateCcw, Cloud, CloudOff, ArrowRight,
  GraduationCap, ExternalLink, RefreshCw
} from "lucide-react";
import { Lesson, ProgressState } from "../../types";

type ProfileProps = {
  user: any;
  loadingAuth: boolean;
  progress: ProgressState;
  allLessons: Lesson[];
  percentCompleted: number;
  loginWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
  resetAllProgress: () => void;
  setCurrentTab: (tab: string) => void;
  setSelectedLessonId: (id: string) => void;
  setPlaygroundCode: (code: string) => void;
};

export default function Profile({
  user,
  loadingAuth,
  progress,
  allLessons,
  percentCompleted,
  loginWithGoogle,
  logout,
  resetAllProgress,
  setCurrentTab,
  setSelectedLessonId,
  setPlaygroundCode
}: ProfileProps) {
  
  const handleJumpToLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentTab("docs");
  };

  const handleRestorePlayground = () => {
    if (progress.savedPlaygroundCode) {
      setPlaygroundCode(progress.savedPlaygroundCode);
      setCurrentTab("playground");
    }
  };

  const handleResetClick = () => {
    if (window.confirm("Are you sure you want to completely reset all your learning progress? This cannot be undone.")) {
      resetAllProgress();
    }
  };

  // Find actual Lesson objects that are completed
  const completedLessonsDocs = allLessons.filter(lesson => 
    progress.completedLessons.includes(lesson.id)
  );

  return (
    <div className="min-h-screen text-black font-mono animate-fade-in py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Top Banner / Hero Title */}
      <div className="border-4 border-black bg-[#9333ea]/10 p-6 sm:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter text-black">
            DEVELOPER PROFILE
          </h1>
          <p className="font-sans text-sm text-neutral-800 font-bold mt-2">
            Track milestones, review scoreboards, and synchronize workspace progress.
          </p>
        </div>
        
        {/* Dynamic Sync Status Badge */}
        <div className="flex items-center">
          {user ? (
            <div className="inline-flex items-center space-x-2 bg-[#00FF00] border-3 border-black px-4 py-2 font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Cloud size={16} />
              <span>CLOUD SYNC ACTIVE</span>
            </div>
          ) : (
            <div className="inline-flex items-center space-x-2 bg-yellow-300 border-3 border-black px-4 py-2 font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <CloudOff size={16} />
              <span>LOCAL SYNC FALLBACK</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 1. Account & Progress Summary Card */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Identity Widget */}
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <h2 className="text-lg font-black border-b-2 border-black pb-2 uppercase tracking-tight flex items-center gap-2">
              <User size={18} className="stroke-[3]" />
              <span>Identity Core</span>
            </h2>

            {loadingAuth ? (
              <div className="py-4 text-center text-xs font-bold animate-pulse uppercase">
                Syncing Authorization Token...
              </div>
            ) : user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="User profile" 
                      referrerPolicy="no-referrer"
                      className="h-14 w-14 border-3 border-black bg-neutral-100 object-cover"
                    />
                  ) : (
                    <div className="h-14 w-14 bg-[#00FF00] border-3 border-black flex items-center justify-center text-xl font-black">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <div>
                    <h3 className="font-extrabold text-sm text-black truncate max-w-[180px]">
                      {user.displayName || "Google Developer"}
                    </h3>
                    <p className="text-xs text-neutral-600 truncate max-w-[180px]">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={logout}
                  className="w-full bg-red-400 hover:bg-black hover:text-red-400 text-black border-3 border-black font-black uppercase text-xs py-2.5 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  DISCONNECT BACKEND
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-neutral-600 leading-relaxed font-bold">
                  Your learning profile is running locally. Authenticate with Google to backup logs and auto-sync status dynamically.
                </p>
                <button 
                  onClick={loginWithGoogle}
                  className="w-full bg-yellow-300 hover:bg-[#00FF00] text-black border-3 border-black font-black uppercase text-xs py-2.5 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={14} className="stroke-[3]" />
                  <span>SAVE PROGRESS TO CLOUD</span>
                </button>
              </div>
            )}
          </div>

          {/* Aggregated Progress Badge Card */}
          <div className="border-4 border-black bg-[#00FF00]/10 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h2 className="text-lg font-black uppercase tracking-tight">Milestone Progress</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-black">
                <span>CURRICULUM DONE</span>
                <span>{percentCompleted}%</span>
              </div>
              <div className="w-full bg-white border-3 border-black h-5 overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div 
                  className="bg-[#00FF00] h-full border-r border-black transition-all duration-300"
                  style={{ width: `${percentCompleted}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="bg-white border-2 border-black p-2.5 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-lg font-black">{progress.completedLessons.length}</div>
                <div className="text-[9px] font-bold uppercase text-neutral-500">Lessons Finished</div>
              </div>
              <div className="bg-white border-2 border-black p-2.5 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-lg font-black">{Object.keys(progress.completedQuizzes).length}</div>
                <div className="text-[9px] font-bold uppercase text-neutral-500">Quizzes Tried</div>
              </div>
            </div>
          </div>

          {/* Reset progression Button */}
          <div className="border-4 border-black bg-neutral-50 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xs font-black uppercase mb-3 text-neutral-600">Danger Zone</h3>
            <button 
              onClick={handleResetClick}
              className="w-full bg-white hover:bg-red-500 hover:text-white text-red-500 border-3 border-black font-black uppercase text-[10px] py-2.5 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={12} className="stroke-[3]" />
              <span>RESET PROGRESS LOGS</span>
            </button>
          </div>

        </div>

        {/* 2. Detailed Progress Tracking Lists */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Lessons list card */}
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <h2 className="text-lg font-black border-b-2 border-black pb-2 uppercase tracking-tight flex items-center gap-2">
              <GraduationCap size={18} className="stroke-[3]" />
              <span>Completed Syllabus Units ({progress.completedLessons.length})</span>
            </h2>

            {completedLessonsDocs.length === 0 ? (
              <div className="border-2 border-dashed border-neutral-300 p-8 text-center text-xs font-bold text-neutral-500 uppercase space-y-3">
                <p>No completed lessons checked off yet.</p>
                <button 
                  onClick={() => setCurrentTab("learn")}
                  className="px-4 py-2 bg-[#00FF00] hover:bg-black hover:text-white border-2 border-black text-black font-black uppercase text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  Explore Roadmap
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1">
                {completedLessonsDocs.map(lesson => (
                  <div 
                    key={lesson.id} 
                    onClick={() => handleJumpToLesson(lesson.id)}
                    className="border-3 border-black p-3.5 flex items-center justify-between cursor-pointer group hover:bg-[#00FF00]/5 hover:-translate-y-0.5 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white"
                  >
                    <div className="space-y-1 pr-2 truncate">
                      <div className="text-xs font-black text-black truncate max-w-[200px]">
                        {lesson.title}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] font-black uppercase px-1.5 py-0.5 border border-black bg-neutral-100">
                          {lesson.level}
                        </span>
                        <span className="text-[9px] text-neutral-500 font-bold">{lesson.estimate}</span>
                      </div>
                    </div>
                    <ExternalLink size={14} className="opacity-40 group-hover:opacity-100 transition-opacity text-black shrink-0 stroke-[2.5]" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quiz scoreboards */}
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <h2 className="text-lg font-black border-b-2 border-black pb-2 uppercase tracking-tight flex items-center gap-2">
              <Award size={18} className="stroke-[3]" />
              <span>Highscore Diagnostic Ledger ({Object.keys(progress.completedQuizzes).length})</span>
            </h2>

            {Object.keys(progress.completedQuizzes).length === 0 ? (
              <div className="border-2 border-dashed border-neutral-300 p-8 text-center text-xs font-bold text-neutral-500 uppercase space-y-3">
                <p>No quiz score evaluations recorded yet.</p>
                <button 
                  onClick={() => setCurrentTab("quiz")}
                  className="px-4 py-2 bg-[#00FF00] hover:bg-black hover:text-white border-2 border-black text-black font-black uppercase text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  Enter Quiz Lab
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                {Object.entries(progress.completedQuizzes).map(([topic, score]) => (
                  <div 
                    key={topic}
                    className="border-3 border-black p-3 flex items-center justify-between bg-neutral-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <span className="text-xs font-black truncate max-w-[340px] text-black">
                      {topic}
                    </span>
                    <span className="bg-yellow-300 border-2 border-black px-2.5 py-0.5 text-xs font-black text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] shrink-0">
                      BEST: {score}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Playground snapshot card */}
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <h2 className="text-lg font-black border-b-2 border-black pb-2 uppercase tracking-tight flex items-center gap-2">
              <Code size={18} className="stroke-[3]" />
              <span>Saved Sandbox Clipboard</span>
            </h2>

            {progress.savedPlaygroundCode ? (
              <div className="space-y-4">
                <div className="bg-neutral-900 border-3 border-black text-neutral-300 p-4 font-mono text-[10px] rounded-0 max-h-[140px] overflow-y-auto overflow-x-auto whitespace-pre leading-relaxed shadow-[inner_2px_2px_4px_rgba(0,0,0,0.4)]">
                  {progress.savedPlaygroundCode}
                </div>
                <button 
                  onClick={handleRestorePlayground}
                  className="px-5 py-2.5 bg-[#00FF00] hover:bg-black hover:text-[#00FF00] text-black border-3 border-black font-black uppercase text-[10px] tracking-wide transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>RESTORE SYNC TO LIVE RUNTIME</span>
                  <ArrowRight size={12} className="stroke-[3]" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-neutral-300 p-8 text-center text-xs font-bold text-neutral-500 uppercase space-y-3">
                <p>No custom sandboxed code saved on cloud backup yet.</p>
                <button 
                  onClick={() => setCurrentTab("playground")}
                  className="px-4 py-2 bg-[#00FF00] hover:bg-black hover:text-white border-2 border-black text-black font-black uppercase text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  Open Sandbox
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
