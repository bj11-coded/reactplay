import { useState } from "react";
import { Menu, X, Code, GraduationCap, Award, BookOpen, Layers, Zap, CheckCircle } from "lucide-react";

type NavbarProps = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  percentCompleted: number;
};

export default function Navbar({ currentTab, setCurrentTab, percentCompleted }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "LEARN", icon: GraduationCap },
    { id: "learn", label: "ROADMAP", icon: Layers },
    { id: "docs", label: "DOCUMENTATION", icon: BookOpen },
    { id: "playground", label: "PLAYGROUND", icon: Code },
    { id: "snippets", label: "SNIPPETS", icon: Zap },
    { id: "projects", label: "PROJECTS", icon: Award },
    { id: "quiz", label: "QUIZ LAB", icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b-4 border-black text-black font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div 
            onClick={() => setCurrentTab("home")}
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
          >
            <div className="h-10 w-10 bg-black text-white font-display font-black text-xl flex items-center justify-center border-2 border-black group-hover:bg-[#00FF00] group-hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-tighter leading-none text-black group-hover:underline group-hover:decoration-[#00FF00] group-hover:decoration-4">
                ReactPlay Docs
              </span>
              <span className="text-[9px] tracking-widest text-neutral-600 font-bold uppercase">SANDBOX ENGINE V2</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-2">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-3 py-1.5 text-xs font-black transition-all uppercase tracking-normal cursor-pointer duration-150 ${
                    active 
                      ? "bg-[#00FF00] text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-extrabold" 
                      : "text-black hover:bg-neutral-100 hover:underline decoration-4 underline-offset-8 decoration-[#00FF00]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Progress system indicators */}
          <div className="hidden md:flex items-center space-x-3 text-xs bg-white border-2 border-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-mono">
            <span className="text-black font-black">PROGRESS:</span>
            <div className="w-24 bg-gray-200 h-2.5 border border-black overflow-hidden">
              <div 
                className="bg-[#00FF00] h-full transition-all duration-300"
                style={{ width: `${percentCompleted}%` }}
              ></div>
            </div>
            <span className="font-extrabold text-black">{percentCompleted}% DONE</span>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <div className="text-[10px] bg-white border-2 border-black px-2 py-1 text-black font-black">
              {percentCompleted}% COMPLETED
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:bg-neutral-100 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-4 border-black bg-white px-4 pt-2 pb-4 space-y-1.5 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
          {navItems.map((item) => {
            const active = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 text-xs font-black text-left transition-all border-2 border-black ${
                  active 
                    ? "bg-[#00FF00] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" 
                    : "text-black bg-white hover:bg-neutral-100"
                }`}
              >
                <Icon size={14} />
                <span className="tracking-wide uppercase">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
