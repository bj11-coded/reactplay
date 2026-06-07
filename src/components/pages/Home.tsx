import { motion } from "motion/react";
import { ArrowRight, BookOpen, Code, Layers, Zap, Award, CheckSquare, Activity, ShieldCheck } from "lucide-react";

type HomeProps = {
  setCurrentTab: (tab: string) => void;
  percentCompleted: number;
  nextLessonId: string;
};

export default function Home({ setCurrentTab, percentCompleted, nextLessonId }: HomeProps) {
  const techStack = [
    { name: "React 19", version: "Core UI Library" },
    { name: "TypeScript", version: "Type Safety" },
    { name: "Tailwind v4", version: "Utility-First CSS" },
    { name: "Zustand", version: "Global State Store" },
    { name: "React Router", version: "Navigation" },
    { name: "Hooks", version: "State & Lifecycle" },
    { name: "TanStack Query", version: "API Caching" }
  ];

  const features = [
    {
      tabId: "docs",
      title: "Interactive Documentation",
      desc: "Learn core specs (such as components, props, hooks) backed by interview topics, real outputs, and practice tasks.",
      icon: BookOpen,
      accent: "border-green-500 hover:bg-green-500/5",
      badge: "Full Syllabus"
    },
    {
      tabId: "playground",
      title: "Live Sandbox Engine",
      desc: "Write fully custom React code in our client simulator, observe outcomes instantly, and save your snippets.",
      icon: Code,
      accent: "border-yellow-500 hover:bg-yellow-500/5",
      badge: "Realtime Evaluator"
    },
    {
      tabId: "snippets",
      title: "Neo-Brutalist Code Snippets",
      desc: "Browse robust copy-ready UI components like buttons, drawers, authentication forms, and route gates.",
      icon: Zap,
      accent: "border-blue-500 hover:bg-blue-500/5",
      badge: "Copy Ready"
    },
    {
      tabId: "projects",
      title: "Guided Sandbox Challenges",
      desc: "Deepen your knowledge by building complete, structured, level-gated practice projects with starter code blocks.",
      icon: Layers,
      accent: "border-purple-500 hover:bg-purple-500/5",
      badge: "Starter Templates"
    },
    {
      tabId: "quiz",
      title: "Diagnostic Quizzes",
      desc: "Review your conceptual mastery with interactive multiple choice labs containing rigorous post-submit feedback.",
      icon: Award,
      accent: "border-pink-500 hover:bg-pink-500/5",
      badge: "Save Highscores"
    },
    {
      tabId: "learn",
      title: "Offline Progress Engine",
      desc: "Track completed milestones, view level progress gauges, and resume lessons directly where you paused.",
      icon: CheckSquare,
      accent: "border-[#a3e635] hover:bg-[#a3e635]/5",
      badge: "Local Auto-Save"
    }
  ];

  return (
    <div className="min-h-screen text-black font-mono animate-fade-in py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Small top status badge */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center space-x-2 border-2 border-black bg-yellow-300 px-4 py-2 text-xs uppercase tracking-wider font-extrabold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span className="w-2.5 h-2.5 bg-black border border-white animate-pulse"></span>
          <span>SYSTEM READY // BRUTALIST LEARNING PLATFORM</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-8 max-w-4xl mx-auto pb-12 border-b-4 border-black">
        <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-[100px] tracking-tighter leading-[0.9] text-black select-none uppercase">
          React <br />
          <span className="bg-[#00FF00] px-4 py-1.5 inline-block border-4 border-black transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">LEARNING</span> <br />
          PLATFORM
        </h1>
        
        <p className="font-sans text-sm sm:text-base text-neutral-800 max-w-2xl mx-auto font-bold mt-4 tracking-tight leading-relaxed">
          Learn React from basic to advanced with simple documentation, real modular examples, developer snippets, and a live sandboxed code playground.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button 
            onClick={() => setCurrentTab("learn")}
            className="px-8 py-4 bg-[#00FF00] text-black border-4 border-black font-black uppercase text-xs tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-150 cursor-pointer"
          >
            START LEARNING ROADMAP
          </button>
          
          <button 
            onClick={() => setCurrentTab("playground")}
            className="px-8 py-4 bg-white text-black border-4 border-black font-black uppercase text-xs tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-150 cursor-pointer hover:bg-neutral-100"
          >
            OPEN CODE PLAYGROUND
          </button>
        </div>

        {percentCompleted > 0 && (
          <div className="pt-6 max-w-sm mx-auto">
            <div className="bg-white border-4 border-black p-6 text-left shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center mb-2 text-xs font-black text-black">
                <span>YOUR PROGRESS</span>
                <span>{percentCompleted}% COMPLETED</span>
              </div>
              <div className="w-full bg-neutral-200 h-3 border-2 border-black mb-3 overflow-hidden">
                <div className="bg-[#00FF00] h-full" style={{ width: `${percentCompleted}%` }}></div>
              </div>
              <button 
                onClick={() => {
                  if (nextLessonId) {
                    setCurrentTab("docs");
                  } else {
                    setCurrentTab("learn");
                  }
                }}
                className="w-full bg-[#00FF00] hover:bg-black hover:text-white text-black font-black py-2 px-3 text-xs tracking-wider uppercase transition-all duration-150 text-center block cursor-pointer border border-black"
              >
                CONTINUE LEARNING ❯
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tech Stack Banner */}
      <div className="py-12 border-b-4 border-black">
        <h3 className="text-center font-display font-black text-xs uppercase tracking-widest text-neutral-500 mb-8">
          CURRICULUM ARCHITECTURE
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {techStack.map((tech) => (
            <div 
              key={tech.name}
              className="border-3 border-black bg-white px-4 py-3.5 text-center transition-all hover:-translate-y-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] min-w-[155px] select-none text-black"
            >
              <div className="text-xs font-black font-sans text-black">{tech.name}</div>
              <div className="text-[10px] text-black font-bold mt-1.5 font-mono uppercase bg-[#00FF00] px-1.5 py-0.5 border border-black inline-block">{tech.version}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Feature Cards Grid */}
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-black uppercase tracking-tight">
            CORE PLATFORM MODULES
          </h2>
          <p className="font-sans text-xs text-neutral-600 max-w-lg mx-auto mt-2 tracking-wide font-black uppercase">
            Explore structured toolsets built to transition you from zero knowledge into production-ready development capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.title}
                onClick={() => setCurrentTab(feat.tabId)}
                className="border-4 border-black p-6 bg-white flex flex-col justify-between cursor-pointer group transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 hover:bg-[#00FF00]/5 text-black"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-black text-white group-hover:bg-[#00FF00] group-hover:text-black border-2 border-black transition-colors">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold border-2 border-black text-black px-2 py-0.5 bg-yellow-300 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                      {feat.badge}
                    </span>
                  </div>
                  
                  <h3 className="font-display font-black text-lg text-black group-hover:underline group-hover:decoration-[#00FF00] group-hover:decoration-4 mb-2 uppercase transition-colors tracking-tight">
                    {feat.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-neutral-700 leading-relaxed font-bold">
                    {feat.desc}
                  </p>
                </div>
                
                <div className="flex items-center text-[10px] text-black group-hover:underline font-black uppercase mt-6 transition-colors">
                  <span>ENTER MODULE</span>
                  <ArrowRight size={10} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
