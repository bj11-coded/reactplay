import { useState } from "react";
import { Award, Code, HelpCircle, Check, Copy, Layers, Play } from "lucide-react";
import { Project } from "../../types";
import { projectsData } from "../../data/projects";

type ProjectsProps = {
  setPlaygroundCode: (code: string) => void;
  setCurrentTab: (tab: string) => void;
  allProjects?: Project[];
};

export default function Projects({ 
  setPlaygroundCode, 
  setCurrentTab,
  allProjects = projectsData
}: ProjectsProps) {
  const [activeTab, setActiveTab] = useState<"ALL" | "Beginner" | "Intermediate" | "Advanced">("ALL");
  const [copiedProjectId, setCopiedProjectId] = useState<string | null>(null);
  const [expandedStarterId, setExpandedStarterId] = useState<string | null>(null);

  const handleCopyStarter = (proj: Project) => {
    navigator.clipboard.writeText(proj.starterCode || "");
    setCopiedProjectId(proj.id);
    setTimeout(() => setCopiedProjectId(null), 2000);
  };

  const handleLoadStarterInPlayground = (proj: Project) => {
    setPlaygroundCode(proj.starterCode || "");
    setCurrentTab("playground");
  };

  const filteredProjects = activeTab === "ALL"
    ? allProjects
    : allProjects.filter((p) => p.level === activeTab);

  return (
    <div className="min-h-screen text-black font-mono animate-fade-in py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="border-b-4 border-black pb-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-black uppercase tracking-tight flex items-center gap-3">
            <Award className="text-black fill-[#00FF00] grow-0 font-bold stroke-[3]" size={32} />
            <span>PRACTICE CHALLENGE LABS</span>
          </h1>
          <p className="font-sans text-xs text-neutral-700 mt-2 max-w-xl font-bold tracking-wide">
            Test your real-world engineering muscle on guided coding challenges. Load clean starter scripts and solve advanced problems.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap gap-2.5 font-black text-xs uppercase">
          {["ALL", "Beginner", "Intermediate", "Advanced"].map((cat) => {
            const active = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat as any)}
                className={`px-3.5 py-2 border-2 border-black tracking-tight text-[10px] cursor-pointer transition-all ${
                  active 
                    ? "bg-[#00FF00] text-black font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" 
                    : "bg-white text-black font-bold hover:bg-neutral-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects List cards stack */}
      <div className="space-y-12">
        {filteredProjects.map((proj) => {
          const isCopied = copiedProjectId === proj.id;

          return (
            <div 
              key={proj.id}
              className="border-4 border-black bg-white p-6 md:p-8 flex flex-col relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] gap-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left side: descriptions, specs, prerequisites */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`text-[9px] uppercase font-black tracking-wider px-2.5 py-1 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                        proj.level === "Beginner" 
                          ? "bg-[#00FF00] text-black" 
                          : proj.level === "Intermediate" 
                            ? "bg-blue-300 text-black" 
                            : "bg-purple-300 text-black"
                      }`}>
                        {proj.level} SYLLABUS
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold bg-neutral-100 border border-neutral-300 px-1 py-0.5">PROJECT CODE SPEC</span>
                    </div>

                    <h2 className="font-display font-black text-xl sm:text-2xl text-black uppercase tracking-tight">
                      {proj.title}
                    </h2>
                    
                    <p className="font-sans text-xs text-neutral-800 leading-relaxed font-bold mt-2">
                      {proj.description}
                    </p>
                  </div>

                  {/* Feature Lists checklist */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-black uppercase tracking-widest bg-yellow-300 border border-black px-1.5 py-0.5 w-fit">EXPECTED FUNCTIONAL FEATURES:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans font-bold">
                      {proj.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start text-neutral-800">
                          <Check size={14} className="text-[#00FF00] fill-black stroke-black stroke-[3.5] shrink-0 mr-2 mt-0.5" />
                          <span className="font-bold">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prerequisites */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black text-black uppercase tracking-widest bg-yellow-300 border border-black px-1.5 py-0.5 w-fit">REQUIRED TECHNICAL CONCEPTS:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.requiredConcepts.map((item, idx) => (
                        <span 
                          key={idx}
                          className="text-[9px] font-mono font-black bg-white border-2 border-black px-2 py-0.5 text-black uppercase tracking-tight shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right side: Starter, Playground loading mechanisms */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  
                  {/* Starter panel drawer */}
                  <div className="border-3 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <div className="bg-neutral-100 px-4 py-2 border-b-3 border-black flex justify-between items-center text-xs">
                      <span className="font-mono text-[10px] font-black text-black uppercase">STARTER_TEMPLATE.tsx</span>
                      
                      <button
                        onClick={() => handleCopyStarter(proj)}
                        className="p-1 px-2.5 border-2 border-black bg-white text-black text-[9px] font-black hover:bg-neutral-50 flex items-center gap-1 cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                      >
                        {isCopied ? <Check size={10} className="text-[#00FF00] stroke-[3]" /> : <Copy size={10} className="stroke-[2.5]" />}
                        <span>{isCopied ? "COPIED" : "COPY"}</span>
                      </button>
                    </div>

                    <pre className="text-neutral-800 bg-neutral-50 p-4 max-h-[140px] overflow-y-auto text-[10px] leading-relaxed whitespace-pre font-mono select-all border-0">
                      {proj.starterCode}
                    </pre>
                  </div>

                  {/* Final Challenges Prompt alert box */}
                  <div className="border-2 border-black bg-yellow-50/50 border-l-8 border-l-yellow-300 p-4 space-y-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center space-x-1.5 text-black">
                      <HelpCircle size={14} className="stroke-[3]" />
                      <span className="text-[10px] font-black uppercase tracking-wider">EXTRA CHALLENGE EXERCISE:</span>
                    </div>
                    <p className="font-sans text-[11px] text-neutral-800 leading-relaxed font-bold">
                      {proj.finalChallenge}
                    </p>
                  </div>

                  {/* Direct playground loaders */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleLoadStarterInPlayground(proj)}
                      className="w-full bg-[#00FF00] hover:bg-black hover:text-[#00FF00] text-black border-3 border-black font-mono font-black uppercase text-xs p-3.5 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    >
                      <Play size={12} fill="black" className="stroke-black stroke-[3]" />
                      <span>LOAD STARTER IN PLAYGROUND</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          );
        })}

        {filteredProjects.length === 0 && (
          <div className="border-4 border-dashed border-black bg-white p-12 text-center max-w-xl mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] my-6" id="empty-state-projects">
            <Award className="mx-auto mb-4 text-black fill-[#00FF00] stroke-[2.5]" size={44} />
            <h3 className="font-display font-black text-lg text-black uppercase tracking-tight">Challenge Labs is Empty</h3>
            <p className="font-sans text-xs text-[#555] mt-2 font-bold leading-relaxed">
              No guided coding challenges have been loaded yet. Please click the **Admin** tab at the top to write and publish starter templates and specs directly from the dashboard!
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
