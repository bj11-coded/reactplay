import { useState } from "react";
import { Copy, Check, Play, Terminal, Zap, Layers } from "lucide-react";
import { Snippet } from "../../types";
import { snippetsData } from "../../data/snippets";

type SnippetsProps = {
  setPlaygroundCode: (code: string) => void;
  setCurrentTab: (tab: string) => void;
};

const SNIPPET_CATEGORIES = [
  "ALL",
  "Buttons",
  "Cards",
  "Forms",
  "Modal",
  "API Fetching",
  "Protected Route"
];

export default function Snippets({ setPlaygroundCode, setCurrentTab }: SnippetsProps) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const handleCopyCode = (snippet: Snippet) => {
    navigator.clipboard.writeText(snippet.code);
    setCopiedSnippetId(snippet.id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const handleOpenSnippetInPlayground = (snippet: Snippet) => {
    setPlaygroundCode(snippet.code);
    setCurrentTab("playground");
  };

  // Filter snippets based on active categorizations
  const filteredSnippets = activeCategory === "ALL"
    ? snippetsData
    : snippetsData.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen text-black font-mono animate-fade-in py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="border-b-4 border-black pb-8 mb-10">
        <h1 className="font-display font-black text-3xl sm:text-5xl text-black uppercase tracking-tight flex items-center gap-3">
          <Zap className="text-black fill-[#00FF00] stroke-[3] grow-0" size={32} />
          <span>WIDGET SNIPPET LIBRARY</span>
        </h1>
        <p className="font-sans text-xs text-neutral-700 mt-2 max-w-xl font-bold tracking-wide leading-relaxed">
          Fully styled copy-ready code blocks crafted in Tailwind. Inject modular UI elements like customized form frames, modals, and route indicators inside your project.
        </p>
      </div>

      {/* Category filters banner */}
      <div className="flex flex-wrap gap-2.5 mb-10 border-b-4 border-black pb-6">
        {SNIPPET_CATEGORIES.map((cat) => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] tracking-wider uppercase font-black px-3.5 py-1.5 border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                active
                  ? "bg-[#00FF00] text-black font-black"
                  : "bg-white text-black hover:bg-[#00FF00]/10"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Snippet Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {filteredSnippets.map((snip) => {
          const copyId = copiedSnippetId === snip.id;

          return (
            <div 
              key={snip.id}
              className="border-4 border-black bg-white p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all gap-4"
            >
              <div>
                {/* Header elements */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] bg-[#00FF00] text-black border-2 border-black px-2 py-0.5 uppercase font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    {snip.category}
                  </span>
                  
                  <span className={`text-[9px] uppercase font-black tracking-wider px-2 py-0.5 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                    snip.difficulty === "Beginner" 
                      ? "bg-green-150 text-black" 
                      : snip.difficulty === "Intermediate" 
                        ? "bg-blue-300 text-black" 
                        : "bg-purple-300 text-black"
                  }`}>
                    {snip.difficulty} LEVEL
                  </span>
                </div>

                {/* Info titles */}
                <h3 className="font-display font-black text-sm text-black uppercase tracking-tight mb-2">
                  {snip.title}
                </h3>
                
                <p className="font-sans text-xs text-neutral-800 leading-relaxed font-bold mb-4 min-h-[40px]">
                  {snip.description}
                </p>

                {/* Preformatted Code representation sample block */}
                <div className="relative mb-6 rounded-none bg-white border-2 border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <div className="bg-neutral-100 px-3 py-1.5 border-b-2 border-black flex justify-between items-center text-[9px] font-black text-black">
                    <span>MODULAR CORE CODE</span>
                    <span>REACT v19</span>
                  </div>
                  <pre className="text-neutral-800 text-[10px] p-3 max-h-[170px] overflow-y-auto overflow-x-auto bg-neutral-50 select-all leading-normal whitespace-pre font-mono">
                    {snip.code}
                  </pre>
                </div>
              </div>

              {/* Action operations buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border-t-2 border-black pt-4 mt-2">
                <button
                  onClick={() => handleCopyCode(snip)}
                  className="flex-1 p-2 text-[10px] font-black uppercase text-center border-2 border-black bg-white text-black cursor-pointer hover:bg-neutral-50 flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  {copyId ? <Check size={11} className="text-[#00FF00] stroke-[3]" /> : <Layers size={11} className="stroke-[2.5]" />}
                  <span>{copyId ? "COPIED SUCCESSFULLY" : "COPY UTILITY CODE"}</span>
                </button>
                <button
                  onClick={() => handleOpenSnippetInPlayground(snip)}
                  className="p-2 px-4 text-[10px] font-black uppercase text-center bg-[#00FF00] border-2 border-black text-black hover:bg-black hover:text-[#00FF00] transition-all cursor-pointer flex items-center justify-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  <Play size={11} fill="black" className="stroke-black stroke-[2.5]" />
                  <span>TEST IN PLAYGROUND</span>
                </button>
              </div>
            </div>
          );
        })}

        {filteredSnippets.length === 0 && (
          <div className="md:col-span-2 text-center py-16 text-neutral-700 bg-white border-4 border-dashed border-black font-black uppercase text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            NO COMPATIBLE SNIPPETS RESIDE IN THIS SPECS SECTION.
          </div>
        )}
      </div>

    </div>
  );
}
