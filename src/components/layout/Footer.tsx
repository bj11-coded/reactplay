import { GraduationCap } from "lucide-react";

type FooterProps = {
  setCurrentTab: (tab: string) => void;
};

export default function Footer({ setCurrentTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-black bg-white text-black py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand details */}
        <div className="md:col-span-2 space-y-4">
          <div 
            onClick={() => setCurrentTab("home")}
            className="flex items-center space-x-2.5 cursor-pointer group w-fit"
          >
            <div className="h-9 w-9 bg-black text-white font-display font-black text-mg flex items-center justify-center border-2 border-black transition-all group-hover:bg-[#00FF00] group-hover:text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              R
            </div>
            <span className="font-display font-black text-base tracking-tighter text-black group-hover:underline group-hover:decoration-4 group-hover:decoration-[#00FF00]">
              REACTPLAY DOCS
            </span>
          </div>
          <p className="max-w-md text-neutral-700 leading-relaxed text-[11px] font-medium">
            An open-source interactive documentation environment engineered to help modern builders study, practice, and secure React patterns efficiently. Minimalist neo-monochrome architecture inspired by local developer standards.
          </p>
          <div className="text-[10px] text-neutral-500 font-bold">
            CURRENT SYSTEM CLOCK (UTC): 2026-06-07 10:36Z
          </div>
        </div>

        {/* Directory links */}
        <div>
          <h4 className="font-black text-black uppercase text-xs tracking-wider mb-4 border-b-2 border-black pb-2">CURRICULUM</h4>
          <ul className="space-y-2 text-[11px] font-bold">
            <li>
              <button onClick={() => setCurrentTab("learn")} className="hover:text-black hover:bg-[#00FF00] px-1 py-0.5 border border-transparent hover:border-black transition-all">
                ❯ Level 1: Beginner
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab("learn")} className="hover:text-black hover:bg-[#00FF00] px-1 py-0.5 border border-transparent hover:border-black transition-all">
                ❯ Level 2: Intermediate
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab("learn")} className="hover:text-black hover:bg-[#00FF00] px-1 py-0.5 border border-transparent hover:border-black transition-all">
                ❯ Level 3: Advanced
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab("docs")} className="hover:text-black hover:bg-[#00FF00] px-1 py-0.5 border border-transparent hover:border-black transition-all">
                ❯ Documentation Guide
              </button>
            </li>
          </ul>
        </div>

        {/* Interactive systems */}
        <div>
          <h4 className="font-black text-black uppercase text-xs tracking-wider mb-4 border-b-2 border-black pb-2">WORK LABS</h4>
          <ul className="space-y-2 text-[11px] font-bold">
            <li>
              <button onClick={() => setCurrentTab("playground")} className="hover:text-black hover:bg-[#00FF00] px-1 py-0.5 border border-transparent hover:border-black transition-all">
                ❯ Dynamic Sandbox
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab("snippets")} className="hover:text-black hover:bg-[#00FF00] px-1 py-0.5 border border-transparent hover:border-black transition-all">
                ❯ Widget Snippets
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab("projects")} className="hover:text-black hover:bg-[#00FF00] px-1 py-0.5 border border-transparent hover:border-black transition-all">
                ❯ Final Challenges
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab("quiz")} className="hover:text-black hover:bg-[#00FF00] px-1 py-0.5 border border-transparent hover:border-black transition-all">
                ❯ Core Diagnostic Lab
              </button>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t-2 border-black mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-neutral-500 font-bold">
        <div>
          © {currentYear} REACTPLAY DOCS. ALL ASSETS SANDBOXED.
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0 font-black uppercase text-black bg-[#00FF00] px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span>BUILT FOR BUILDERS</span>
          <span>•</span>
          <span>STABLE REACT 19 SPA</span>
        </div>
      </div>
    </footer>
  );
}
