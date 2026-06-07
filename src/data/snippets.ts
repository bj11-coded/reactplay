import { Snippet } from "../types";

export const snippetsData: Snippet[] = [
  {
    id: "brutalist-button",
    title: "Brutalist Neo-Shadow Button",
    difficulty: "Beginner",
    description: "A gorgeous, high-contrast, bold brutalist-style interactive button components with custom hover translate animations and high responsiveness.",
    category: "Buttons",
    code: `import React, { useState } from 'react';

export default function BrutalistButton() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <button 
        onClick={() => setClickCount(prev => prev + 1)}
        className="px-6 py-3 font-mono text-sm font-black border-2 border-black bg-yellow-300 text-black uppercase transition-all duration-100 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
      >
        CLICK ME, DEV (${"clickCount"})
      </button>
      <span className="text-xs font-mono text-gray-500">INTERACTIVE COUNT: {clickCount}</span>
    </div>
  );
}`
  },
  {
    id: "brutalist-card",
    title: "Minimal Developer Portrait Card",
    difficulty: "Beginner",
    description: "A signature profile card reflecting standard monochrome themes with sharp borders and tag badges.",
    category: "Cards",
    code: `import React from 'react';

export default function developerCard() {
  return (
    <div className="max-w-xs border-2 border-dashed border-neutral-800 p-6 bg-white font-mono text-black">
      <div className="w-12 h-12 rounded-full border-2 border-black bg-stone-100 flex items-center justify-center font-black text-xl mb-4">
        R
      </div>
      <h3 className="font-extrabold text-lg uppercase leading-tight">REACTPLAY DEVS</h3>
      <p className="text-xs text-stone-500 mt-1">EST. JUNE 2026</p>
      
      <p className="text-xs text-neutral-700 my-4 leading-relaxed">
        Building custom React modular systems with brutalist typography and absolute visual integrity.
      </p>

      <div className="flex flex-wrap gap-1 mt-2">
        <span className="text-[10px] bg-black text-white px-2 py-0.5 uppercase">TYPOGRAPHY</span>
        <span className="text-[10px] border border-black px-2 py-0.5 uppercase">SPA</span>
      </div>
    </div>
  );
}`
  },
  {
    id: "stateful-auth-form",
    title: "Brutalist Login Form",
    difficulty: "Intermediate",
    description: "Fully state-driven security credential intake forms packed with custom validations and custom feedback panels.",
    category: "Forms",
    code: `import React, { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setAlert("E-MAIL CONTAINS WRONG SYMBOLS!");
      return;
    }
    if (password.length < 5) {
      setAlert("PASSWORD MUST RUN AT LEAST 5 CHARACTERS!");
      return;
    }
    setAlert("");
    setSuccess(true);
  };

  return (
    <div className="p-6 border-2 border-black max-w-sm bg-stone-50 font-mono text-black">
      <h3 className="text-md font-black uppercase tracking-tight border-b-2 border-black pb-2 mb-4">
        VERIFY SYSTEM ID
      </h3>
      
      {success ? (
        <div className="bg-green-100 border border-black p-3 text-xs mb-3 font-bold text-green-800">
          ACCESS COMPLETED. WELCOME BACK OPERATOR.
          <button onClick={() => { setSuccess(false); setEmail(""); setPassword(""); }} className="block underline text-black mt-2 uppercase text-[10px]">
            Log out
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {alert && (
            <div className="bg-red-100 border border-black p-2 text-[10px] font-bold text-red-800">
              {alert}
            </div>
          )}
          <div>
            <label className="block text-[10px] font-bold uppercase mb-1">EMAIL ADRESS</label>
            <input 
              type="text" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-black p-2 bg-white text-xs font-sans focus:outline-none"
              placeholder="operator@system.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase mb-1">PASSWORD KEY</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-black p-2 bg-white text-xs font-sans focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-black hover:bg-neutral-800 text-white p-2 text-xs font-bold uppercase"
          >
            AUTHORIZE ACCESS
          </button>
        </form>
      )}
    </div>
  );
}`
  },
  {
    id: "clean-modal",
    title: "Imperative Portal Modal Drawer",
    difficulty: "Intermediate",
    description: "An elegant interactive popup component styled with brutalist thick borders, featuring a clean trigger system and dynamic screen dismiss controls.",
    category: "Modal",
    code: `import React, { useState } from 'react';

export default function InteractiveModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 flex flex-col items-center">
      <button 
        onClick={() => setIsOpen(true)}
        className="border-2 border-black bg-white hover:bg-neutral-50 px-4 py-2 font-mono text-xs uppercase font-extrabold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
      >
        OPEN SYSTEM MODAL
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border-4 border-black p-6 max-w-md w-full font-mono text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-4">
              <h3 className="font-extrabold text-sm uppercase">SYSTEM ALERT PANEL</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="font-black text-sm border border-black px-1.5 hover:bg-black hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <p className="text-xs text-gray-700 leading-relaxed mb-6">
              You are accessing compiled React component files inside the ReactPlay sandboxed viewport simulator. Changes made to this widget will evaluate immediately.
            </p>

            <div className="flex justify-end gap-2 text-xs font-bold">
              <button 
                onClick={() => setIsOpen(false)}
                className="border border-black px-3 py-1.5 hover:bg-neutral-100 uppercase text-[10px]"
              >
                DISMISS
              </button>
              <button 
                onClick={() => alert("PROCESS INITIALIZED")}
                className="bg-black text-white px-3 py-1.5 uppercase hover:bg-neutral-850 text-[10px]"
              >
                EXECUTE ACTION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`
  },
  {
    id: "protected-route-simulation",
    title: "Stateful Router Gate Guard",
    difficulty: "Advanced",
    description: "Simulates higher-order client security gateways that guard user access to private directories based on auth state.",
    category: "Protected Route",
    code: `import React, { useState } from 'react';

export default function ProtectedRouteSimulator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("dashboard"); // "dashboard" | "admin"

  return (
    <div className="border border-black p-4 font-mono text-black bg-stone-50 max-w-md">
      <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
        <span className="text-[10px] font-bold">GATE: ROUTER SHIELD</span>
        <div className="flex items-center gap-1.5">
          <span className={\`w-2.5 h-2.5 rounded-full \${isAuthenticated ? 'bg-green-500' : 'bg-red-500'}\`}></span>
          <span className="text-[10px] font-bold uppercase">{isAuthenticated ? "AUTHORIZED" : "GUEST LEVEL"}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => setIsAuthenticated(prev => !prev)}
          className="border border-black text-[10px] px-2 py-1 font-bold bg-white hover:bg-neutral-100"
        >
          TOGGLE AUTH ({isAuthenticated ? "SIGN OUT" : "LOG IN"})
        </button>
        <button 
          onClick={() => setCurrentRoute("admin")}
          className="border border-black text-[10px] px-2 py-1 bg-neutral-900 text-white"
        >
          GOTO /ADMIN
        </button>
      </div>

      <div className="p-4 border border-dashed border-neutral-600 bg-white">
        {currentRoute === "admin" && !isAuthenticated ? (
          <div className="text-center py-4">
            <p className="text-xs text-red-600 font-bold uppercase">🔐 AUTHENTICATION REQUIRED</p>
            <p className="text-[10px] text-gray-500 mt-2">
              Route /admin is locked. Log in to gain token permissions.
            </p>
          </div>
        ) : currentRoute === "admin" ? (
          <div>
            <p className="text-xs text-green-700 font-bold uppercase">🟢 AREA ACCESS SUCCESSFUL</p>
            <p className="text-[10px] text-neutral-800 mt-2 font-sans">
              Welcome to the administrative master console. Database ports are streaming.
            </p>
            <button onClick={() => setCurrentRoute("dashboard")} className="mt-3 text-[9px] underline">Back to dashboard</button>
          </div>
        ) : (
          <div>
            <p className="text-xs font-bold uppercase">🖥️ STATIC PUBLIC FEED</p>
            <p className="text-[10px] text-gray-500 mt-1">
              This area is readable by unsubscribed user web-browsers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}`
  },
  {
    id: "async-api-requester",
    title: "JSON API Fetcher with Reload",
    difficulty: "Intermediate",
    description: "An async API retriever demonstrating clean state updates, with robust loading feedback and error management.",
    category: "API Fetching",
    code: `import React, { useState, useEffect } from 'react';

export default function ApiRequester() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pullData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");
      if (!res.ok) throw new Error("Fault response");
      const list = await res.json();
      setPosts(list);
    } catch(e) {
      setError("FAILED TO RETRIEVE POST DATA CHANNELS!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    pullData();
  }, []);

  return (
    <div className="p-4 border border-black bg-stone-900 text-white font-mono text-[11px] max-w-sm">
      <div className="flex justify-between items-center border-b border-stone-750 pb-2 mb-3">
        <span className="font-bold text-gray-400">DATA OUTLET: GET /POSTS</span>
        <button 
          onClick={pullData}
          className="bg-green-500 hover:bg-green-600 text-black px-2 py-0.5 font-bold rounded-sm text-[9px] cursor-pointer"
        >
          RELOAD
        </button>
      </div>

      {loading ? (
        <p className="text-center py-4 text-green-400 animate-pulse">STREAMING REMOTE JSON CHANNELS...</p>
      ) : error ? (
        <p className="text-red-400 py-2">{error}</p>
      ) : (
        <div className="space-y-2">
          {posts.map((p, i) => (
            <div key={p.id} className="border-l-2 border-green-500 pl-2 py-1">
              <p className="font-bold text-green-400">#{i + 1} {p.title.slice(0, 25)}...</p>
              <p className="text-[10px] text-gray-400 leading-relaxed mt-0.5">{p.body.slice(0, 60)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`
  }
];
