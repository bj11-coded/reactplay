import { useState } from "react";
import { Menu, X, Code, GraduationCap, Award, BookOpen, Layers, Zap, CheckCircle, User } from "lucide-react";

type NavbarProps = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  percentCompleted: number;
  user: any;
  loadingAuth: boolean;
  loginWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
};

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  percentCompleted,
  user,
  loadingAuth,
  loginWithGoogle,
  logout
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userPhotoURL = user?.photoURL || user?.user_metadata?.avatar_url;
  const userDisplayName = user?.displayName || user?.user_metadata?.full_name || user?.user_metadata?.name || "User";

  const navItems = [
    { id: "home", label: "LEARN", icon: GraduationCap },
    { id: "learn", label: "ROADMAP", icon: Layers },
    { id: "docs", label: "DOCUMENTATION", icon: BookOpen },
    { id: "playground", label: "PLAYGROUND", icon: Code },
    { id: "snippets", label: "SNIPPETS", icon: Zap },
    { id: "projects", label: "PROJECTS", icon: Award },
    { id: "quiz", label: "QUIZ LAB", icon: Award },
    { id: "profile", label: "MY PROFILE", icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b-4 border-black text-black font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div 
            onClick={() => setCurrentTab("home")}
            className="flex items-center space-x-2.5 cursor-pointer group select-none mr-2"
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
          <nav className="hidden xl:flex space-x-1.5 mr-2">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-2.5 py-1.5 text-[11px] font-black transition-all uppercase tracking-normal cursor-pointer duration-150 ${
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

          {/* Progress system indicators & Auth Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Progress Bar */}
            <div className="flex items-center space-x-2.5 text-xs bg-white border-2 border-black px-3 py-1.5 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] font-mono h-10">
              <span className="text-black font-black text-[10px]">PROGRESS:</span>
              <div className="w-18 bg-gray-200 h-2 border border-black overflow-hidden">
                <div 
                  className="bg-[#00FF00] h-full transition-all duration-300"
                  style={{ width: `${percentCompleted}%` }}
                ></div>
              </div>
              <span className="font-extrabold text-black text-[10px]">{percentCompleted}%</span>
            </div>

            {/* Google Authentication Sync Segment */}
            <div className="flex items-center h-10">
              {loadingAuth ? (
                <div className="text-[10px] bg-yellow-100 border-2 border-black px-3 py-1.5 text-black font-black uppercase tracking-wider animate-pulse flex items-center h-full">
                  SYNCING...
                </div>
              ) : user ? (
                <div className="flex items-center space-x-2 bg-neutral-50 border-2 border-black px-2.5 py-1.5 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] h-full">
                  {userPhotoURL ? (
                    <img
                      src={userPhotoURL}
                      alt={userDisplayName || "User"}
                      referrerPolicy="no-referrer"
                      className="h-5 w-5 border border-black object-cover bg-neutral-100"
                    />
                  ) : (
                    <div className="h-5 w-5 bg-[#00FF00] text-black text-[10px] font-black border border-black flex items-center justify-center uppercase">
                      {user.email?.charAt(0) || "U"}
                    </div>
                  )}
                  <span className="text-[10px] text-black font-black max-w-[130px] truncate">
                    {user.email}
                  </span>
                  <button
                    onClick={logout}
                    className="text-[9px] bg-red-400 hover:bg-black hover:text-red-400 border border-black px-1.5 py-0.5 text-black font-black uppercase tracking-wide cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5"
                  >
                    DISCONNECT
                  </button>
                </div>
              ) : (
                <button
                  onClick={loginWithGoogle}
                  className="h-full text-[10px] bg-yellow-300 hover:bg-[#00FF00] cursor-pointer transition-all border-2 border-black px-3 py-1.5 text-black font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center gap-1.5"
                >
                  <CheckCircle size={11} className="stroke-[3]" />
                  <span>SAVE TO CLOUD</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Activation bar */}
          <div className="flex lg:hidden items-center space-x-2">
            <div className="text-[10px] bg-white border-2 border-black px-2 py-1.5 text-black font-black">
              {percentCompleted}% DONE
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:bg-neutral-100 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-4 border-black bg-white px-4 pt-4 pb-5 space-y-2 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
          
          {/* Mobile Auth Management Box */}
          <div className="border-2 border-black p-3.5 bg-neutral-50 text-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] mb-1">
            {loadingAuth ? (
              <p className="text-[10px] uppercase font-black tracking-widest text-neutral-600 animate-pulse">
                INITIALIZING CLOUD CORE...
              </p>
            ) : user ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  {userPhotoURL && (
                    <img 
                      src={userPhotoURL} 
                      alt="User" 
                      referrerPolicy="no-referrer"
                      className="h-5 w-5 border border-black"
                    />
                  )}
                  <p className="text-[10px] tracking-tight text-neutral-700 font-extrabold max-w-[200px] truncate">
                    LOGGED: <span className="text-black font-black">{user.email}</span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-[10px] uppercase font-black bg-red-400 border-2 border-black cursor-pointer shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  DISCONNECT BACKEND SYNC
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  loginWithGoogle();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 text-[10px] uppercase font-black bg-yellow-300 hover:bg-[#00FF00] border-2 border-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-1"
              >
                <CheckCircle size={11} className="stroke-[3]" />
                <span>SAVE PROGRESS TO CLOUD</span>
              </button>
            )}
          </div>

          <p className="text-[9px] font-black uppercase text-neutral-500 tracking-wider mb-1 px-1">LAB STATIONS:</p>

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
                className={`w-full flex items-center space-x-3 px-3 py-2.5 text-xs font-black text-left transition-all border-2 border-black cursor-pointer ${
                  active 
                    ? "bg-[#00FF00] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" 
                    : "text-black bg-white hover:bg-neutral-100"
                }`}
              >
                <Icon size={14} className="stroke-[2.5]" />
                <span className="tracking-wide uppercase">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
