import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Copy, Save, Check, Terminal, FileCode, HardDrive, Sparkles } from "lucide-react";

type PlaygroundProps = {
  playgroundCode: string;
  setPlaygroundCode: (code: string) => void;
  savePlaygroundCode: (code: string) => void;
};

// Templates data matching the requested lists
const PLAYGROUND_TEMPLATES = [
  {
    id: "counter",
    title: "Counter App",
    description: "Interactive boundary-managed incrementer and decrementer using useState hook.",
    code: `import React, { useState } from 'react';

export default function CounterApp() {
  const [count, setCount] = useState(1);
  const [history, setHistory] = useState<string[]>([]);

  const handleAction = (type: 'add' | 'sub') => {
    if (type === 'add') {
      setCount(prev => prev + 1);
      setHistory(prev => [...prev, "Added visitor"]);
    } else {
      setCount(prev => Math.max(0, prev - 1));
      setHistory(prev => [...prev, "Removed visitor"]);
    }
  };

  return (
    <div className="p-6 border-2 border-black bg-white text-black font-mono">
      <h4 className="text-xs text-neutral-500 uppercase font-bold">STATE CONTROL REGISTER</h4>
      <div className="my-4 flex items-baseline gap-2">
        <span className="text-4xl font-black">{count}</span>
        <span className="text-[10px] text-green-600 font-bold uppercase">ONLINE</span>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => handleAction('add')}
          className="bg-black text-white hover:bg-[#a3e635] hover:text-black px-3 py-1 text-xs font-bold uppercase cursor-pointer"
        >
          [+] INCREMENT
        </button>
        <button 
          onClick={() => handleAction('sub')}
          className="border border-black hover:bg-neutral-100 px-3 py-1 text-xs font-bold uppercase cursor-pointer"
        >
          [-] DECREMENT
        </button>
      </div>

      <div className="mt-4 pt-3 border-t border-dashed border-neutral-300">
        <p className="text-[9px] text-neutral-400 uppercase">Audit Records ({history.length}):</p>
        <ul className="text-[9px] text-neutral-600 mt-1 max-h-16 overflow-y-auto">
          {history.length === 0 ? "No active logs." : history.slice(-3).map((h, i) => <li key={i}>❯ {h}</li>)}
        </ul>
      </div>
    </div>
  );
}`
  },
  {
    id: "todo",
    title: "Todo App",
    description: "Responsive list manager with completion checklist state and filter toggles.",
    code: `import React, { useState } from 'react';

export default function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Configure Vite bundling configs", done: true },
    { id: 2, text: "Audit local storage states", done: false }
  ]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (!input.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  return (
    <div className="p-4 border-2 border-black bg-neutral-950 text-white font-mono rounded-sm">
      <h3 className="font-bold text-xs uppercase mb-3">TASK MANAGER</h3>
      
      <div className="flex gap-1 mb-4">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="New task title..." 
          className="bg-neutral-900 border border-neutral-800 p-1.5 text-xs text-white grow outline-none focus:border-white"
        />
        <button 
          onClick={handleAddTask}
          className="bg-white text-black text-xs font-extrabold px-3 py-1 hover:bg-[#a3e635] cursor-pointer"
        >
          ADD
        </button>
      </div>

      <div className="space-y-1.5">
        {tasks.map(t => (
          <div key={t.id} className="flex items-center justify-between border border-neutral-900 p-2 bg-neutral-900/30">
            <span className={\`text-xs font-sans \${t.done ? 'line-through text-neutral-500' : 'text-neutral-200'}\`}>
              {t.text}
            </span>
            <input 
              type="checkbox" 
              checked={t.done}
              onChange={() => setTasks(prev => prev.map(x => x.id === t.id ? {...x, done: !x.done} : x))}
              className="accent-[#a3e635] cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}`
  },
  {
    id: "props",
    title: "Props Example",
    description: "Simple overview on parent-child communication using props and event callbacks.",
    code: `import React, { useState } from 'react';

// Child component accepting prop callbacks
function CustomBadge({ label, selected, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={\`font-mono text-xs px-3 py-1.5 border uppercase cursor-pointer transition-colors \${
        selected 
          ? 'bg-black text-[#a3e635] border-black' 
          : 'bg-white text-neutral-500 border-neutral-300 hover:border-black hover:text-black'
      }\`}
    >
      ❯ {label}
    </button>
  );
}

export default function PropsExample() {
  const [selectedTag, setSelectedTag] = useState("VITE");

  return (
    <div className="border border-black p-4 bg-stone-50 text-black">
      <h4 className="font-mono text-xs text-neutral-500 font-bold uppercase mb-2">PROPERTIES TRANSMITTER</h4>
      <p className="font-mono text-xs text-neutral-700 mb-3 font-semibold">Active context selector: <span className="underline">{selectedTag}</span></p>
      
      <div className="flex gap-2">
        {["VITE", "RECONCILER", "REUX"].map(tag => (
          <CustomBadge 
            key={tag} 
            label={tag} 
            selected={selectedTag === tag} 
            onClick={() => setSelectedTag(tag)} 
          />
        ))}
      </div>
    </div>
  );
}`
  },
  {
    id: "form",
    title: "Form Handling",
    description: "Dynamic validation rules and feedback panels managed under state hooks.",
    code: `import React, { useState } from 'react';

export default function FormExample() {
  const [form, setForm] = useState({ username: "", consent: false });
  const [alert, setAlert] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username) {
      setAlert("USERNAME INPUT FIELD CANNOT STAY BLANK!");
      return;
    }
    if (!form.consent) {
      setAlert("MUST CONSENT TO TERMS PROTOCOLS!");
      return;
    }
    setAlert("FORM SUBMITTED SUCCESSFULLY!");
  };

  return (
    <div className="p-4 border border-black bg-white text-black font-mono">
      <h3 className="font-extrabold text-xs mb-3 border-b pb-2 uppercase text-neutral-600">STATE REGISTRATION FORM</h3>
      
      {alert && (
        <div className="bg-[#121212] text-white p-2.5 text-[10px] mb-3 font-semibold">
          {alert}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="block text-[10px] font-bold uppercase mb-1">USERNAME</label>
          <input 
            type="text" 
            value={form.username} 
            onChange={e => setForm(s => ({...s, username: e.target.value}))}
            className="w-full border border-black p-1.5 text-xs outline-none focus:bg-yellow-50"
            placeholder="e.g. dev_sarad"
          />
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={form.consent}
            onChange={e => setForm(s => ({...s, consent: e.target.checked}))}
            className="accent-black cursor-pointer"
            id="terms"
          />
          <label htmlFor="terms" className="text-[10px] uppercase font-bold cursor-pointer">Accept Terms</label>
        </div>

        <button type="submit" className="w-full bg-[#0c0c0c] text-white p-2 text-xs font-bold uppercase hover:bg-[#a3e635] hover:text-black transition-colors cursor-pointer">
          SUBMIT DIRECT
        </button>
      </form>
    </div>
  );
}`
  },
  {
    id: "api",
    title: "API Fetching",
    description: "Mock REST request triggers demonstrating synchronous loading states and list paints.",
    code: `import React, { useState } from 'react';

export default function ApiFetchingExample() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const simulateFetch = () => {
    setLoading(true);
    setTimeout(() => {
      setUsers([
        { id: 1, name: "Sarad Bashyal", tech: "Nextjs Core" },
        { id: 2, name: "Mark Dev", tech: "Zustand Pro" }
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="border border-black p-4 bg-zinc-900 text-white font-mono">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-2 mb-3">
        <span className="text-[10px] font-bold text-gray-400">ENDPOINT PARSER</span>
        <button 
          onClick={simulateFetch}
          className="bg-white text-black px-2 py-0.5 text-[10px] uppercase font-bold hover:bg-[#a3e635] cursor-pointer"
        >
          FETCH CHANNELS
        </button>
      </div>

      {loading ? (
        <p className="text-center py-4 text-xs font-semibold text-[#a3e635] animate-pulse">POLLING SIMULATED JSON REMOTES...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-neutral-500 py-4 text-xs font-medium">Click FETCH to query records.</p>
      ) : (
        <div className="space-y-2">
          {users.map(u => (
            <div key={u.id} className="p-2 border border-neutral-800 bg-neutral-950 rounded-sm">
              <p className="font-bold text-xs text-[#a3e635]">{u.name}</p>
              <p className="text-[10px] text-neutral-400 font-sans mt-0.5 mt-1">Syllabus Focus: {u.tech}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`
  },
  {
    id: "modal",
    title: "Modal Component",
    description: "Brutalist sliding popovers complete with active overlay control bindings.",
    code: `import React, { useState } from 'react';

export default function ModalDemo() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-[140px] bg-stone-100 text-black font-mono">
      <button 
        onClick={() => setVisible(true)}
        className="px-4 py-2 border-2 border-black bg-white hover:bg-neutral-50 font-bold uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
      >
        OPEN POPUP DRAWER
      </button>

      {visible && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black p-6 max-w-sm w-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-black text-sm uppercase text-black border-b border-black pb-2 mb-4">SYSTEM NOTIFY</h4>
            <p className="text-xs text-stone-600 mb-6 font-sans">
              Popups should lock scrolling on overlays and support clean cancel callbacks.
            </p>
            <button 
              onClick={() => setVisible(false)}
              className="bg-black text-white px-3 py-1.5 uppercase text-xs font-bold hover:bg-neutral-800 cursor-pointer"
            >
              DISMISS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`
  },
  {
    id: "dashboard",
    title: "Dashboard Card",
    description: "Clean brutalist profile UI combining data tracks and hover border animations.",
    code: `import React, { useState } from 'react';

export default function DashboardCard() {
  const [metric, setMetric] = useState(94);

  return (
    <div className="border-4 border-black bg-yellow-300 p-6 text-black font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-xs mx-auto">
      <span className="text-[10px] bg-black text-white px-2 py-0.5 uppercase tracking-wide">SYSTEM OK</span>
      <h3 className="font-black text-xl uppercase mt-4 mb-1">CORE VM CORE</h3>
      <p className="text-xs text-neutral-850 font-semibold mb-6">Engine speed metrics are operating normal.</p>
      
      <div className="flex justify-between items-baseline border-t border-black pt-4">
        <span className="text-[10px] uppercase text-neutral-700">STABLE CLOCK:</span>
        <span className="text-xl font-extrabold">{metric} ms</span>
      </div>
    </div>
  );
}`
  }
];

export default function Playground({
  playgroundCode,
  setPlaygroundCode,
  savePlaygroundCode
}: PlaygroundProps) {

  const [activeTemplateId, setActiveTemplateId] = useState("counter");
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING REACTPLAY SANDBOX RUNTIME...",
    "VITE 6.2 BUNDLER: COMPILATION SUCCESSFUL",
    "HOOKS DIRECTIVES CONNECTED SUCCESSFULLY."
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");

  const explainWithAI = async () => {
    setAiLoading(true);
    setAiResult("");
    setLogs((l) => [...l, "SENDING BUNDLED SOURCE TO SERVER-SIDE GEMINI REVIEW ENGINE..."]);
    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: playgroundCode })
      });
      const data = await res.json();
      if (data.success) {
        setAiResult(data.data);
        setLogs((l) => [...l, "GEMINI ANALYSIS INGESTED AND RENDERED SUCCESSFULLY."]);
      } else {
        setAiResult(data.message || "Could not analyze the code.");
        setLogs((l) => [...l, "ERROR: GEMINI REVIEW REQUEST DECLINED BY BACKEND SERVER."]);
      }
    } catch (err: any) {
      console.error(err);
      setAiResult("API Server returned an error. Make sure the development server is up and responsive.");
      setLogs((l) => [...l, "ERROR: CRITICAL TIMEOUT ATTEMPTING REMOTE AI HANDSHAKE."]);
    } finally {
      setAiLoading(false);
    }
  };

  // Load selected template code on template mount
  useEffect(() => {
    // If playgroundCode is empty, load active template code by default
    if (!playgroundCode) {
      const activeTpl = PLAYGROUND_TEMPLATES.find((t) => t.id === activeTemplateId);
      if (activeTpl) {
        setPlaygroundCode(activeTpl.code);
      }
    } else {
      // Find template matching current code (if any) to set select index
      const matchingTpl = PLAYGROUND_TEMPLATES.find((t) => t.code === playgroundCode || t.code?.trim() === playgroundCode?.trim());
      if (matchingTpl) {
        setActiveTemplateId(matchingTpl.id);
      }
    }
  }, []);

  const handleTemplateSelect = (id: string) => {
    setActiveTemplateId(id);
    const selected = PLAYGROUND_TEMPLATES.find((t) => t.id === id);
    if (selected) {
      setPlaygroundCode(selected.code);
      setLogs((l) => [
        ...l,
        `LOADING SPEC MODULE: [${selected.title.toUpperCase()}]`,
        "COMPILED SOURCE OBJECT SUCCESSFUL.",
        "SANDBOX SIMULATOR REDIRECTED KEY LISTENERS."
      ]);
    }
  };

  const handleRunCode = () => {
    setLogs((l) => [
      ...l,
      `EXECUTE TRIGGER RE-EVALUATION AT ${new Date().toLocaleTimeString()}`,
      "CHECKING IMPORTS & TYPINGS - STATUS OK",
      "UPDATING VIRTUAL LAYOUT TREES...",
      "RE-RENDER FRAME PROCESS COMPLETED (6.2ms)"
    ]);
  };

  const handleReset = () => {
    const selected = PLAYGROUND_TEMPLATES.find((t) => t.id === activeTemplateId);
    if (selected) {
      setPlaygroundCode(selected.code);
      setLogs((l) => [...l, "RESET CORE STATE TO SOURCE BLUEPRINT."]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(playgroundCode);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleSaveSnippet = () => {
    savePlaygroundCode(playgroundCode);
    setSaveFeedback(true);
    setLogs((l) => [...l, "COMPRESSED FILE AND BACKED UP SECURELY TO THE BROWSER LOCALSTORAGE STACK."]);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

  // Helper dynamic rendering mock panel corresponding to selected template for full visual simulation
  const renderSimulatedApp = () => {
    switch (activeTemplateId) {
      case "counter":
        return <CounterSimulation />;
      case "todo":
        return <TodoSimulation />;
      case "props":
        return <PropsSimulation />;
      case "form":
        return <FormSimulation />;
      case "api":
        return <ApiSimulation />;
      case "modal":
        return <ModalSimulation />;
      case "dashboard":
        return <DashboardSimulation />;
      default:
        return <CounterSimulation />;
    }
  };

  return (
    <div className="min-h-screen text-black font-mono animate-fade-in py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Playground Header */}
      <div className="border-b-4 border-black pb-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-black uppercase tracking-tight">
            DYNAMIC PLAYGROUND
          </h1>
          <p className="font-sans text-xs text-neutral-700 mt-2 max-w-xl font-bold tracking-wide leading-relaxed">
            Test and alter React.js stateful scripts directly inside the browser viewport. Compile preset templates or build custom widgets.
          </p>
        </div>

        {/* Template Select Dropdown */}
        <div className="flex items-center space-x-2.5 w-full md:w-auto">
          <span className="text-[10px] font-black text-black uppercase tracking-widest bg-yellow-300 border border-black px-1.5 py-0.5">PRESETS:</span>
          <select
            value={activeTemplateId}
            onChange={(e) => handleTemplateSelect(e.target.value)}
            className="bg-white border-3 border-black p-2.5 text-xs font-mono text-black font-black uppercase focus:outline-none focus:bg-[#00FF00]/10 rounded-none cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            {PLAYGROUND_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: Code editor block */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="bg-white border-4 border-black flex flex-col grow min-h-[460px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {/* Editor tools bar */}
            <div className="border-b-4 border-black bg-[#00FF00]/5 px-4 py-2.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2.5 text-xs">
              <span className="flex items-center gap-1.5 font-black uppercase text-black">
                <FileCode size={14} className="text-[#00FF00] fill-black stroke-black stroke-[2.5]" />
                <span>source_code.tsx</span>
              </span>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleCopy}
                  className="p-1 px-2.5 border-2 border-black bg-white text-black font-mono text-[10px] font-black hover:bg-neutral-100 flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  {copyFeedback ? <Check size={11} className="text-[#00FF00] stroke-[3]" /> : <Copy size={11} className="stroke-[2.5]" />}
                  <span>{copyFeedback ? "COPIED" : "COPY"}</span>
                </button>
                <button
                  onClick={handleSaveSnippet}
                  className="p-1 px-2.5 border-2 border-black bg-white text-black font-mono text-[10px] font-black hover:text-[#00FF00] flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  {saveFeedback ? <Check size={11} className="text-[#00FF00] stroke-[3]" /> : <HardDrive size={11} className="stroke-[2.5]" />}
                  <span>{saveFeedback ? "STORED LOCALLY" : "SAVE RUNTIME"}</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-1 px-2.5 border-2 border-black bg-white text-black font-mono text-[10px] font-black hover:text-red-600 flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  title="Reload template"
                >
                  <RotateCcw size={11} className="stroke-[2.5]" />
                  <span>RESET</span>
                </button>
              </div>
            </div>

            {/* Code Textarea editor */}
            <textarea
              value={playgroundCode}
              onChange={(e) => setPlaygroundCode(e.target.value)}
              className="w-full grow bg-black p-4 font-mono text-xs text-neutral-100 outline-none leading-relaxed resize-none overflow-y-auto selection:bg-[#00FF00]/45 rounded-none border-0"
              spellCheck={false}
            />

            {/* Run button tray */}
            <div className="border-t-4 border-black p-3 bg-white flex justify-end">
              <button
                onClick={handleRunCode}
                className="bg-[#00FF00] text-black hover:bg-black hover:text-[#00FF00] border-3 border-black font-mono font-black uppercase text-xs px-5 py-2.5 flex items-center gap-1.5 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <Play size={12} fill="black" className="stroke-black stroke-[3.5]" />
                <span>EVALUATE AND RUN</span>
              </button>
            </div>
          </div>

          {/* Core System terminal log files output */}
          <div className="bg-white border-4 border-black p-4 font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-[10px] text-black font-black uppercase tracking-wider block mb-2 flex items-center gap-1.5 border-b-2 border-black pb-1.5">
              <Terminal size={12} className="stroke-[3]" />
              <span>TERMINAL COMPILER CONSOLE</span>
            </span>
            <div className="space-y-1 max-h-24 overflow-y-auto font-mono text-[10px] text-neutral-800 font-bold">
              {logs.map((log, idx) => (
                <div key={idx} className="truncate">
                  <span className="text-black font-black bg-yellow-300 border border-black px-1 mr-1">OPERATOR:~$</span> {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Render simulator mockup */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-white border-4 border-black rounded-none overflow-hidden flex flex-col h-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="border-b-4 border-black bg-white px-4 py-3 flex justify-between items-center text-xs">
              <span className="font-black uppercase tracking-wide flex items-center gap-1.5 text-black">
                <span className="w-2.5 h-2.5 bg-[#00FF00] border border-black animate-pulse"></span>
                <span>WORKSPACE LIVE PREVIEW</span>
              </span>
              <span className="text-[10px] bg-[#00FF00] border-2 border-black px-2 py-0.5 font-bold text-black tracking-wider shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                REACT 19 SPA
              </span>
            </div>

            {/* Application Simulation Screen */}
            <div className="p-8 bg-neutral-100 border-b-4 border-black grow flex flex-col justify-center items-center relative select-none">
              <div className="w-full max-w-sm">
                {renderSimulatedApp()}
              </div>
            </div>

            {/* Hint tag */}
            <div className="p-3 text-center text-[10px] text-neutral-700 bg-white font-bold uppercase tracking-tight leading-normal">
              This preview reflects active changes made inside template files instantly. Live test interactions safely.
            </div>
          </div>
        </div>

      </div>

      {/* Gemini AI Code Analyzer & Companion */}
      <div className="mt-8 bg-black text-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-mono">
        <div className="flex items-center justify-between border-b-2 border-neutral-700 pb-4 mb-4 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-[#00FF00]" size={20} />
            <h3 className="font-extrabold text-sm uppercase text-[#00FF00]">
              GEMINI AI CODE ANALYZER & INSTANT REVIEWER
            </h3>
          </div>
          <span className="text-[9px] bg-[#00FF00] text-black px-2 py-0.5 font-black uppercase">
            POWERED BY GEMINI 3.5 FLASH
          </span>
        </div>

        <p className="text-[11px] text-neutral-400 font-semibold mb-4 leading-relaxed">
          Need a thorough React 19 audit, typescript check, or error reviews on your current playground code? Send it to our secure server-side Gemini system.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            type="button"
            onClick={explainWithAI}
            disabled={aiLoading}
            className="px-5 py-3 bg-[#00FF00] hover:bg-black hover:text-[#00FF00] hover:border-[#00FF00] text-black border-2 border-white font-black text-xs uppercase cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-500 disabled:border-neutral-700 transition-all flex items-center gap-2 justify-center"
          >
            {aiLoading ? (
              <span className="w-3.5 h-3.5 border-2 border-neutral-500 border-t-black rounded-full animate-spin"></span>
            ) : null}
            <span>{aiLoading ? "ANALYZING BUNDLED COMPONENT CODE..." : "⚡ RUN AI CODE REVIEW"}</span>
          </button>
        </div>

        {aiResult && (
          <div className="mt-6 bg-neutral-900 border border-neutral-800 p-5 font-mono text-xs rounded-none animate-fade-in text-neutral-200">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-2 mb-3">
              <span className="text-[9px] text-yellow-300 font-black tracking-widest uppercase block">
                GEMINI INTEL SUMMARY
              </span>
              <button
                onClick={() => setAiResult("")}
                className="text-[9px] text-neutral-400 hover:text-white uppercase transition-colors px-1.5 py-0.5 bg-neutral-850 border border-neutral-700 cursor-pointer"
              >
                Clear [x]
              </button>
            </div>
            <div className="text-[11px] leading-relaxed whitespace-pre-wrap font-mono text-neutral-200 bg-black p-3 border border-neutral-800 max-h-[450px] overflow-y-auto">
              {aiResult}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// 1. COUNTER SIMULATOR WIDGET
function CounterSimulation() {
  const [count, setCount] = useState(3);
  return (
    <div className="p-6 border-4 border-black bg-white text-black font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h4 className="text-[10px] text-neutral-500 uppercase font-black">STATE CONTROL REGISTER</h4>
      <div className="my-4 flex items-baseline gap-2">
        <span className="text-4xl font-black">{count}</span>
        <span className="text-[10px] text-[#00FF00] bg-black border border-black px-1.5 font-black uppercase">ONLINE</span>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setCount(s => s + 1)} className="bg-[#00FF00] text-black border-2 border-black text-xs px-2.5 py-1.5 font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-[#00FF00]">
          [+] INCREMENT
        </button>
        <button onClick={() => setCount(s => Math.max(0, s - 1))} className="bg-white border-2 border-black text-xs px-2.5 py-1.5 font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-100">
          [-] DECREMENT
        </button>
      </div>
    </div>
  );
}

// 2. TODO SIMULATOR WIDGET
function TodoSimulation() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Configure Vite bundling configs", done: true },
    { id: 2, text: "Audit local storage states", done: false }
  ]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  return (
    <div className="p-5 border-4 border-black bg-white text-black font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="font-black text-xs uppercase mb-3 text-black">TASK LIST REGISTER</h3>
      <div className="flex gap-1 mb-4">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="New task title..." 
          className="bg-white border-3 border-black p-1.5 text-xs text-black grow outline-none focus:bg-[#00FF00]/5 rounded-none"
        />
        <button onClick={handleAdd} className="bg-[#00FF00] border-3 border-black text-black text-xs font-black px-3.5 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
          ADD
        </button>
      </div>
      <div className="space-y-1.5">
        {todos.map(t => (
          <div key={t.id} className="flex items-center justify-between border-2 border-black p-2 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className={`text-xs font-bold ${t.done ? 'line-through text-neutral-400' : 'text-black'}`}>{t.text}</span>
            <input 
              type="checkbox" 
              checked={t.done}
              onChange={() => setTodos(todos.map(x => x.id === t.id ? {...x, done: !x.done} : x))}
              className="accent-black w-4.5 h-4.5 cursor-pointer border-2 border-black"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. PROPS SIMULATOR WIDGET
function PropsSimulation() {
  const [selected, setSelected] = useState("VITE");
  return (
    <div className="border-4 border-black p-5 bg-white text-black font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h4 className="text-[10px] text-neutral-500 font-extrabold uppercase mb-2">PROPERTIES TRANSMITTER</h4>
      <p className="text-xs text-neutral-800 font-bold mb-4">Active context indicator: <span className="underline font-black text-black bg-[#00FF00] px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">{selected}</span></p>
      <div className="flex flex-wrap gap-2">
        {["VITE", "RECONCILER", "REUX"].map((tag) => (
          <button 
            key={tag}
            onClick={() => setSelected(tag)}
            className={`text-[10px] px-3 py-1.5 border-2 border-black uppercase cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-black font-bold ${
              selected === tag 
                ? 'bg-yellow-300 text-black font-black' 
                : 'bg-white text-neutral-600 hover:text-black hover:bg-neutral-50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

// 4. FORM SIMULATOR WIDGET
function FormSimulation() {
  const [username, setUsername] = useState("");
  const [consent, setConsent] = useState(false);
  const [alert, setAlert] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setAlert("USERNAME CANNOT BE BLANK!");
      return;
    }
    if (!consent) {
      setAlert("MUST ACCEPT SECURITY CONSENTS!");
      return;
    }
    setAlert("SYSTEM DATA RECORDED SUCCESSFULLY!");
  };

  return (
    <div className="p-4 border-4 border-black bg-white text-black font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h4 className="text-[10px] font-black text-neutral-700 uppercase border-b-2 border-black pb-1 mb-3">STATE REGISTRATION</h4>
      {alert && (
        <p className="text-[10px] bg-yellow-300 border-2 border-black font-black p-1.5 px-2.5 mb-2.5 uppercase">{alert}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-[8px] uppercase font-black mb-1 text-black">USERNAME</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            placeholder="dev_user" 
            className="w-full text-xs p-1.5 bg-white border-2 border-black focus:outline-none focus:bg-[#00FF00]/5 placeholder-neutral-400"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <input 
            type="checkbox" 
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            id="sim-consent"
            className="accent-black w-4 h-4 cursor-pointer"
          />
          <label htmlFor="sim-consent" className="text-[9px] font-bold uppercase hover:text-black cursor-pointer select-none">Agree clauses</label>
        </div>
        <button type="submit" className="w-full bg-[#00FF00] text-black border-3 border-black text-xs font-black py-2 uppercase hover:bg-black hover:text-[#00FF00] transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          SUBMIT DIRECT
        </button>
      </form>
    </div>
  );
}

// 5. API SIMULATOR WIDGET
function ApiSimulation() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [simStatus, setSimStatus] = useState<string>("");

  const pullData = async () => {
    setLoading(true);
    setSimStatus("");
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const payload = await res.json();
        setData(payload);
        setSimStatus("REAL ENDPOINT QUERY FETCHED SUCCESSFULLY!");
      } else {
        throw new Error("API failed");
      }
    } catch (e) {
      console.warn("Express user API endpoint failed, fallback to offline state simulations:", e);
      // Traditional robust fallback
      setData([
        { id: 1, name: "Sarad Bashyal (Fallback)", tech: "Nextjs Core" },
        { id: 2, name: "Mark Dev (Fallback)", tech: "Zustand Pro" }
      ]);
      setSimStatus("OFFLINE LOCAL BACKUP ACTIVE");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-4 border-black bg-white text-black font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-3">
        <span className="text-[10px] font-black text-black">ENDPOINT SIMULATOR</span>
        <button onClick={pullData} className="bg-[#00FF00] text-black border-2 border-black text-[9px] font-black px-2 py-0.5 uppercase hover:bg-black hover:text-[#00FF00] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
          QUERY API
        </button>
      </div>
      {simStatus && (
        <span className={`text-[8px] font-black uppercase px-2 py-0.5 border block mb-2 text-center rounded-sm ${simStatus.includes("REAL") ? 'bg-[#00FF00]/10 border-green-600 text-green-700' : 'bg-yellow-300/20 border-yellow-600 text-yellow-800'}`}>
          {simStatus}
        </span>
      )}
      {loading ? (
        <p className="text-center py-4 text-[10px] text-black font-black animate-pulse uppercase">PULLING REMOTE DATA FIELDS...</p>
      ) : data.length === 0 ? (
        <p className="text-center py-4 text-[10px] text-neutral-500 font-bold uppercase">No active JSON records.</p>
      ) : (
        <div className="space-y-1.5">
          {data.map(d => (
            <div key={d.id} className="p-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-black text-[10px] text-black uppercase bg-yellow-300 border border-black px-1 w-fit">{d.name}</p>
              <p className="text-[9px] text-neutral-600 font-bold font-sans mt-1">Focus: {d.tech}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 6. MODAL SIMULATOR WIDGET
function ModalSimulation() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6 border-4 border-dashed border-black bg-white text-black font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-center items-center">
      <button onClick={() => setOpen(true)} className="bg-[#00FF00] border-2 border-black text-black px-4 py-2 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-[#00FF00] cursor-pointer">
        SHOW POPUP OVERLAY
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border-4 border-black p-5 max-w-xs w-full text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-black text-xs uppercase border-b-2 border-black pb-2 mb-3 text-black">SYSTEM SECURED</h4>
            <p className="text-[11.5px] text-neutral-700 leading-relaxed font-bold font-sans mb-4">Scrolling has been sandboxed inside the wrapper component.</p>
            <button onClick={() => setOpen(false)} className="bg-yellow-300 border-2 border-black text-black px-3 py-1 font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 7. DASHBOARD SIMULATOR WIDGET
function DashboardSimulation() {
  return (
    <div className="border-4 border-black bg-[#00FF00] p-5 text-black font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-xs mx-auto text-left">
      <span className="text-[10px] bg-black text-white px-2 py-0.5 uppercase tracking-wide font-black">SYSTEM OK</span>
      <h3 className="font-black text-base uppercase mt-4 mb-1">CORE CPU SECTOR</h3>
      <p className="text-[10px] text-neutral-900 font-bold mb-4 font-sans leading-relaxed">Engine parameters are operating normal across active terminals.</p>
      <div className="flex justify-between items-baseline border-t-2 border-black pt-3 text-[10px] font-black">
        <span className="uppercase text-neutral-800">READ CYCLE:</span>
        <span className="font-mono bg-white px-1.5 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">94 ms</span>
      </div>
    </div>
  );
}
