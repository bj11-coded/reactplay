import { BookOpen, CheckCircle, Clock } from "lucide-react";
import { Lesson, Level } from "../../types";
import { lessonsData } from "../../data/lessons";

type LearnProps = {
  setCurrentTab: (tab: string) => void;
  setSelectedLessonId: (id: string) => void;
  isLessonCompleted: (id: string) => boolean;
  percentCompleted: number;
  allLessons?: Lesson[];
};

export default function Learn({
  setCurrentTab,
  setSelectedLessonId,
  isLessonCompleted,
  percentCompleted,
  allLessons = lessonsData
}: LearnProps) {

  const levels: { name: Level; title: string; desc: string; accentBorder: string; badgeBg: string }[] = [
    {
      name: "Beginner",
      title: "1. CORE ESSENTIALS",
      desc: "Learn core primitives: components, JSX syntax, props definitions, hooks, rendering parameters, and basic event structures.",
      accentBorder: "border-blackSegment",
      badgeBg: "bg-yellow-300 text-black border-2 border-black"
    },
    {
      name: "Intermediate",
      title: "2. APPLICATION SCALES",
      desc: "Architect complex flows: custom hook wrappers, context networks, JSON API calls, and loading monitors.",
      accentBorder: "border-blackSegment",
      badgeBg: "bg-[#00FF00] text-black border-2 border-black"
    },
    {
      name: "Advanced",
      title: "3. PERFORMANCE / MODERN STACKS",
      desc: "Acquire enterprise-grade practices: pure reducers, state stores, useMemo cache shields, and callback controllers.",
      accentBorder: "border-blackSegment",
      badgeBg: "bg-purple-300 text-black border-2 border-black"
    }
  ];

  const handleStartLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentTab("docs");
  };

  return (
    <div className="min-h-screen text-black font-mono animate-fade-in py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Roadmap Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-black pb-8 mb-12">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-black uppercase tracking-tight">
            CURRICULUM ROADMAP
          </h1>
          <p className="font-sans text-xs text-neutral-700 mt-2 max-w-xl font-bold tracking-wide leading-relaxed">
            Follow a structured learning progress path designed by React software engineers. Master hooks and custom patterns on a step-by-step roadmap.
          </p>
        </div>

        {/* Global Progress Indicators */}
        <div className="mt-6 md:mt-0 bg-white border-4 border-black p-4 min-w-[250px] text-left shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center text-[11px] font-black text-black mb-1">
            <span>ROADMAP MASTERED:</span>
            <span className="text-[#00FF00] bg-black px-1.5 py-0.5 border border-black font-extrabold">{percentCompleted}%</span>
          </div>
          <div className="w-full bg-neutral-200 h-3 border-2 border-black rounded-sm mb-2 overflow-hidden">
            <div className="bg-[#00FF00] h-full transition-all duration-300 border-r border-black" style={{ width: `${percentCompleted}%` }}></div>
          </div>
          <span className="text-[9px] text-neutral-500 font-extrabold uppercase">COMPLETE ALL TO UNLOCK GRADUATION</span>
        </div>
      </div>

      {/* Levels Tracks Grid */}
      {allLessons.length === 0 ? (
        <div className="border-4 border-dashed border-black bg-white p-12 text-center max-w-xl mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] my-12" id="empty-state-lessons">
          <BookOpen className="mx-auto mb-4 text-black fill-[#00FF00] stroke-[2.5]" size={44} />
          <h3 className="font-display font-black text-lg text-black uppercase tracking-tight">Syllabus Directory is Empty</h3>
          <p className="font-sans text-xs text-[#555] mt-2 font-bold leading-relaxed">
            No engineering lessons have been added yet. Please click the **Admin** tab at the top to write and publish real lessons directly from the dashboard!
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {levels.map((lvl) => {
            const levelLessons = allLessons.filter((i) => i.level === lvl.name);

          return (
            <div key={lvl.name} className="space-y-6">
              {/* Level Segment Indicator Banner */}
              <div className="border-l-8 border-black pl-5 space-y-1.5 py-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display font-black text-xl tracking-tighter text-black uppercase sm:text-2xl">
                    {lvl.title}
                  </h2>
                  <span className={`text-[10px] uppercase tracking-wider font-black px-2.5 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${lvl.badgeBg}`}>
                    {lvl.name} LEVEL
                  </span>
                </div>
                <p className="font-sans text-xs text-neutral-600 font-bold max-w-4xl tracking-wide leading-relaxed">
                  {lvl.desc}
                </p>
              </div>

              {/* Lessons Grid matching the levels */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {levelLessons.map((lesson) => {
                  const done = isLessonCompleted(lesson.id);

                  return (
                    <div 
                      key={lesson.id}
                      className="border-4 border-black bg-white p-6 flex flex-col justify-between transition-all duration-200 relative group min-h-[240px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 text-black"
                    >
                      {/* Top labels */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[9px] font-mono font-black tracking-widest text-[#888] uppercase">
                            LESSON MODULE
                          </span>
                          
                          {done ? (
                            <span className="flex items-center space-x-1 text-black bg-yellow-300 border border-black text-[10px] uppercase font-black px-2 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                              <CheckCircle size={10} className="stroke-[3]" />
                              <span>COMPLETED</span>
                            </span>
                          ) : (
                            <span className="text-neutral-500 text-[10px] font-bold border border-neutral-300 px-2 py-0.5 flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 bg-neutral-400"></span>
                              <span className="font-mono text-[9px] tracking-tight uppercase">STUDY REQ</span>
                            </span>
                          )}
                        </div>

                        {/* Title & Desc */}
                        <h3 className="font-sans font-black text-sm text-black group-hover:underline group-hover:decoration-4 group-hover:decoration-[#00FF00] tracking-tight mb-2 uppercase transition-all">
                          {lesson.title}
                        </h3>
                        <p className="font-sans text-xs text-neutral-600 leading-relaxed font-bold">
                          {lesson.description}
                        </p>
                      </div>

                      {/* Footer tools */}
                      <div className="flex justify-between items-center border-t-2 border-black pt-3 mt-4 text-[10px] text-neutral-500 font-bold">
                        <span className="flex items-center space-x-1 text-black">
                          <Clock size={11} className="stroke-[2.5]" />
                          <span>{lesson.estimate}</span>
                        </span>

                        <button
                          onClick={() => handleStartLesson(lesson.id)}
                          className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors border-2 border-black uppercase flex items-center space-x-1 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 ${
                            done 
                              ? "bg-[#00FF00] text-black hover:bg-black hover:text-white" 
                              : "bg-white text-black hover:bg-black hover:text-white"
                          }`}
                        >
                          <BookOpen size={10} className="mr-0.5 inline stroke-[3.5]" />
                          <span>{done ? "REVIEW LESSON" : "START STUDY"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      )}

    </div>
  );
}
