import { Lesson } from "../types";

export const lessonsData: Lesson[] = [
  {
    id: "react-intro-jsx",
    title: "1. Introduction to React & JSX",
    level: "Beginner",
    estimate: "8 mins",
    description: "Learn about React's declarative nature, the Virtual DOM mechanism, and how to write dynamic components using JavaScript XML (JSX).",
    explanation: "React is a modular component-based JavaScript library designed to build fast, responsive user interfaces. Instead of modifying the real Browser DOM directly (which is slow), React maintains a lightweight 'Virtual DOM' representation in memory. When state updates, React diffs this virtual copy with a brand-new one underneath and performs surgical updates on only the altered parts of the live page. JSX is a syntax extension that enables writing HTML-like tags side-by-side with JavaScript logic inside the same function.",
    syntax: "const element = <h1 className=\"title\">Hello {username}!</h1>;",
    code: `import React from 'react';

export default function JSXSandbox() {
  const portalName = "React Matrix Core";
  const onlineCount = 42;
  const metrics = { health: "100%", level: "Stable" };

  return (
    <div className="p-6 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-mono">
      <div className="bg-[#00FF00]/10 border-2 border-black p-4 mb-4">
        <h2 className="text-sm font-black uppercase text-black">🚀 Welcome to {portalName}</h2>
        <p className="text-xs text-neutral-600 mt-1 font-bold">
          JSX allows you to embed expressions directly inside curly braces \{\}.
        </p>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between border-b border-neutral-300 pb-1">
          <span className="font-bold">System Status:</span>
          <span className="text-green-600 font-black">{metrics.health}</span>
        </div>
        <div className="flex justify-between border-b border-neutral-300 pb-1">
          <span className="font-bold">Virtual Nodes Online:</span>
          <span className="bg-yellow-300 px-1 border border-black font-black">{onlineCount}</span>
        </div>
        <div className="flex justify-between border-b border-neutral-300 pb-1">
          <span className="font-bold">Expression Parsing Test:</span>
          <span className="font-black text-purple-700">2 + 2 = {2 + 2}</span>
        </div>
      </div>
    </div>
  );
}`,
    outputExplanation: "Compiles nested HTML tags directly returning a dynamic visual block. Variables, calculations, and object property values evaluate in real time without manual element lookups.",
    practiceTask: "Add a new conditional expression that prints a warning label if onlineCount is less than 50.",
    commonMistakes: "Forgetting that JSX components must return a single root element (wrap multiple siblings inside a Fragment '<></>'), or writing HTML attributes like 'class' instead of the camelCase counterpart 'className'.",
    interviewQuestion: "What is the differences between the Real DOM and the Virtual DOM, and why is React's rendering mechanism efficient?",
    miniQuiz: {
      question: "Which of the following is true about JSX?",
      options: [
        "Browsers can execute JSX natively without compilation tools",
        "It is a syntax extension that translates to React.createElement behind the scenes",
        "JSX forces JavaScript developers to write CSS directly inside text attributes",
        "Using curly braces in JSX is restricted only to basic numerical addition"
      ],
      answerIndex: 1,
      explanation: "JSX is not standard JavaScript. Build compilers like Babel or ESBuild transform JSX tags into standard React.createElement function calls compiled for browsers."
    },
    subsections: [
      {
        title: "React Setup: CDN links v/s Professional Toolchains",
        content: "React can be imported directly into any webpage using standard direct CDN tags for simple prototyping. However, for real-world enterprise applications, a modular bundler and toolchain setup (such as Vite or Create React App) is mandatory. The toolchain handles transpilation, code minification, Hot Module Replacement (HMR), and splits modules natively for optimal load speeds.",
        exampleCode: `// CDN direct loading script injection example:
// <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
// <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

// Modern ES6 Toolchain import model:
import React from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<h1>Enterprise Portal Booted via Vite</h1>);
}`,
        exampleExplanation: "CDN setups rely on global scripts exposing the 'React' namespace directly into window. Vite-based tooling resolves imports at compile-time and packages highly optimized bundles, omitting unreferenced functions."
      },
      {
        title: "JSX Primitives & Interactive Element Rendering",
        content: "JSX is a syntax extension that represents user interfaces directly utilizing standard markup tags merged with JavaScript expressions in curly braces {}. Under the hood, compilers transpile JSX tags into standard React.createElement() method calls, transforming the markup into immutable state trees of JavaScript descriptions. Attributes must adapt to JavaScript camelCase syntaxes (e.g., 'class' becomes 'className', 'onclick' becomes 'onClick').",
        exampleCode: `import React from 'react';

export function ElementRenderer() {
  const elementId = "test-node-09";
  const labelSuffix = "Interactive Primitives";
  
  return (
    <div id={elementId} className="p-3 border-2 border-black bg-stone-50 text-xs font-mono">
      <span className="font-extrabold uppercase decoration-dotted underline">Current module: {labelSuffix}</span>
      <p className="mt-2 text-stone-500 font-bold">Dynamic evaluations: {4 * 10 + 2} virtual elements.</p>
    </div>
  );
}`,
        exampleExplanation: "Transpiles markup attributes natively to clean nodes. Variables and mathematical calculations resolve inside curly brackets instantly on render cycles."
      },
      {
        title: "Virtual DOM & Core Structural Reconciliation",
        content: "When state change occurs, React does not touch the browser DOM instantly. Instead, it computes a brand new lightweight Virtual DOM representation in memory. React compares this newly configured tree with the previous Virtual DOM layout utilizing a highly optimized diffing algorithm (the Fiber reconciler). This process, called Reconciliation, evaluates the exact minimal write actions required and updates only the matching live nodes, preventing reflow delays.",
        exampleCode: `// Traditional real DOM rewrite (Unoptimized, forces reflow on all children):
// document.getElementById('status-box').innerHTML = '<h2>New status</h2>';

// React virtual DOM approach:
// React internally diffs the changes like a git patch sequence before doing the DOM write.
const newVirtualNode = <div className="p-2 bg-yellow-300">Updated Status Pane</div>;`,
        exampleExplanation: "Direct innerHTML wipes out all nested nodes, dropping form inputs, cursor selections, and focus anchors. React's Virtual DOM surgically replaces changed elements only, retaining browser state."
      }
    ]
  },
  {
    id: "functional-components",
    title: "2. Functional vs Class Components",
    level: "Beginner",
    estimate: "10 mins",
    description: "Understand the evolutionary path from static, lifecycle-heavy Class components to modern, functional React hooks paradigms.",
    explanation: "Historically, React utilized ES6 Class components to declare internal state and handle component lifecycles. With modern React (v16.8+), Functional components combined with React Hooks became the industry standard. Functional components are cleaner, require less boilerplate code, prevent issues with the dynamic binding of the 'this' keyword, and allow for better minification and tree-shaking during build steps.",
    syntax: "function MyComponent(props) { return <div>{props.name}</div>; }",
    code: `import React, { Component } from 'react';

// Classical ES6 Class representation
class OlderClassComponent extends Component<{ message: string }, { counter: number }> {
  constructor(props: any) {
    super(props);
    this.state = { counter: 0 };
  }

  render() {
    return (
      <div className="p-3 border-2 border-black bg-stone-50 text-xs mb-4">
        <h4 className="font-black uppercase text-[10px] text-neutral-500 mb-1">Legacy Class Model</h4>
        <p className="font-bold mb-2">{this.props.message}: {this.state.counter}</p>
        <button 
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
          className="bg-yellow-300 px-2 py-0.5 border border-black font-black uppercase text-[9px]"
        >
          Class Increment
        </button>
      </div>
    );
  }
}

// Modern Functional representation
function ModernFunctionalComponent({ message }: { message: string }) {
  const [counter, setCounter] = React.useState(0);

  return (
    <div className="p-3 border-2 border-black bg-[#00FF00]/5 text-xs">
      <h4 className="font-black uppercase text-[10px] text-green-700 mb-1">Modern Functional Model</h4>
      <p className="font-bold mb-2">{message}: {counter}</p>
      <button 
        onClick={() => setCounter(prev => prev + 1)}
        className="bg-[#00FF00] px-2 py-0.5 border border-black font-black uppercase text-[9px]"
      >
        Functional Increment
      </button>
    </div>
  );
}

export default function CombinedDemo() {
  return (
    <div className="p-6 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-mono">
      <h3 className="font-black uppercase text-sm mb-3">Architectural Comparison</h3>
      <OlderClassComponent message="Class Clicks" />
      <ModernFunctionalComponent message="Hooks Clicks" />
    </div>
  );
}`,
    outputExplanation: "Demonstrates both architectural models side-by-side. Both execute identical tasks, but the functional component uses simpler declarative Hooks instead of constructor patterns.",
    practiceTask: "Refactor the 'OlderClassComponent' to fully operate inside a modern functional component without utilizing stateful class constructors.",
    commonMistakes: "Attempting to use React Hooks (like useState or useEffect) inside Class components. Hooks are strictly exclusive to function frameworks.",
    interviewQuestion: "What are the primary advantages of functional components over ES6 class components in React?",
    miniQuiz: {
      question: "Which keyword creates binding issues related to context scope that are eliminated in functional components?",
      options: [
        "const",
        "super",
        "this",
        "export"
      ],
      answerIndex: 2,
      explanation: "Class components rely heavily on 'this' to reference props, state, and custom event handlers, which often requires explicit binding inside constructor hooks."
    }
  },
  {
    id: "props-reusability",
    title: "3. Component Props & Reusability",
    level: "Beginner",
    estimate: "12 mins",
    description: "Learn how to feed custom parameter states down into your component hierarchy using immutable attributes (Props) to construct dynamic UI units.",
    explanation: "Every component can receive configurational attributes from its parent called 'Props' (short for properties). Props are strictly read-only (immutable). A child component must never modify its received root props. Dynamic structures utilize parent callback functions passed as prop values, enabling underlying kids to notify upstream nodes about events.",
    syntax: "<Card title=\"Product Name\" price={99} />",
    code: `import React from 'react';

// Dynamic Reusable Element
interface BadgeProps {
  label: string;
  type: 'danger' | 'warning' | 'success';
  onAction?: () => void;
}

function StatusBadge({ label, type, onAction }: BadgeProps) {
  const styles = {
    danger: "bg-red-500 text-white border-red-700",
    warning: "bg-yellow-300 text-black border-yellow-500",
    success: "bg-emerald-400 text-black border-emerald-600"
  };

  return (
    <div className={\`p-3 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] flex justify-between items-center bg-white \`}>
      <span className="text-[11px] font-mono font-bold tracking-tight">{label}</span>
      <div className="flex gap-2">
        <span className={\`text-[9px] font-black uppercase px-2 py-0.5 border \${styles[type]}\`}>
          {type}
        </span>
        {onAction && (
          <button 
            type="button"
            onClick={onAction}
            className="text-[9px] font-black border border-black bg-[#00FF00] px-1 active:translate-y-px transition-all"
          >
            PING
          </button>
        )}
      </div>
    </div>
  );
}

export default function ReusableGrid() {
  const pinger = (badgeName: string) => {
    alert(\`Ping fired from \${badgeName}!\`);
  };

  return (
    <div className="p-6 border-4 border-black bg-neutral-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-mono">
      <h3 className="font-black uppercase text-sm mb-3">Modular Badge Core</h3>
      <div className="space-y-2">
        <StatusBadge label="Production Server Ingress" type="success" onAction={() => pinger("Production Server")} />
        <StatusBadge label="Firebase Firestore Auth Port" type="warning" onAction={() => pinger("Firestore Auth")} />
        <StatusBadge label="Telemetry Buffer Limit Breach" type="danger" />
      </div>
    </div>
  );
}`,
    outputExplanation: "Demonstrates a reusable block customized with static prop properties, alongside interactive callback triggers connecting component trees.",
    practiceTask: "Implement an additional prop named 'subText' and display it styled as a smaller gray label directly beneath the main badge label.",
    commonMistakes: "Directly trying to mutate prop variables inside the child component (e.g., props.label = 'new label'). This triggers rendering state errors.",
    interviewQuestion: "What is the difference between props and state in React?",
    miniQuiz: {
      question: "Which of the following describes prop flow patterns in React?",
      options: [
        "Bidirectional - Parents and children can instantly redefine shared states alike",
        "Unidirectional - From parent components down into child elements, as immutable records",
        "Asynchronous - Driven specifically by event sockets",
        "Dynamic - Stored solely inside local browser cookies"
      ],
      answerIndex: 1,
      explanation: "React relies on a clean, unidirectional data flow. Data passes downwards as props, and event updates pass upwards as callback actions."
    }
  },
  {
    id: "react-state-cycles",
    title: "4. React State & Re-render Cycles",
    level: "Beginner",
    estimate: "10 mins",
    description: "Learn how React tracks state updates internally and how component mounting, rendering, and unmounting cycles function.",
    explanation: "In React, state representation (`useState`) triggers a visual translation when updated. When state changes, the component execution flow is standardly run again to produce updated Virtual DOM trees. Understanding these render cycles prevents unnecessary calculations and infinite state update-loops.",
    syntax: "const [state, setState] = useState(initialValue);",
    code: `import React, { useState } from 'react';

export default function RenderCycleVisualizer() {
  const [renderCount, setRenderCount] = useState(1);
  const [typedText, setTypedText] = useState("");

  const handleIncrement = () => {
    setRenderCount(prev => prev + 1);
  };

  return (
    <div className="p-6 border-4 border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] font-mono">
      <h3 className="text-sm font-black uppercase mb-3">State Cycle Tracker</h3>
      <div className="space-y-4 text-xs">
        <div className="p-3 bg-neutral-100 border-2 border-black flex justify-between items-center">
          <span className="font-bold">Total Renders:</span>
          <span className="bg-yellow-300 font-black px-2 py-0.5 border border-black">{renderCount}</span>
        </div>
        <div>
          <label className="block text-[10px] font-black mb-1 uppercase text-neutral-500">Live Typing State:</label>
          <input 
            type="text" 
            value={typedText} 
            onChange={(e) => setTypedText(e.target.value)}
            className="w-full border-2 border-black p-2 font-bold focus:bg-yellow-50/50" 
            placeholder="Type anything to trigger render cycle updates..."
          />
        </div>
        <button 
          onClick={handleIncrement}
          className="w-full bg-[#00FF00] border-2 border-black text-black font-black uppercase text-[10px] py-1.5 active:translate-y-0.5 transition-all cursor-pointer"
        >
          Increment Stats
        </button>
      </div>
    </div>
  );
}`,
    outputExplanation: "Displays a fully functioning state listener. Changing input values or pressing buttons forces state transitions, re-executing functions to refresh DOM values dynamically.",
    practiceTask: "Implement an input listener that triggers a conditional check when text length exceeds 10 characters.",
    commonMistakes: "Updating state directly inside the component body, which executes on every render, sparking an infinite loop.",
    interviewQuestion: "Why are React state updates asynchronous, and how do you access the latest state immediately?",
    miniQuiz: {
      question: "Which hook should be used to synchronize state with side effects or external events?",
      options: [
        "useMemo",
        "useEffect",
        "useCallback",
        "useRef"
      ],
      answerIndex: 1,
      explanation: "useEffect is specifically intended to declare rendering outcomes triggered by state updates and side effects."
    }
  },
  {
    id: "conditional-rendering-lists",
    title: "5. Conditional Rendering & Lists",
    level: "Beginner",
    estimate: "11 mins",
    description: "Learn how to selectively render HTML branches and map array structures utilizing unique key-attributes safely.",
    explanation: "Dynamic user interfaces require selective execution patterns. Conditional blocks use ternary operators or inline logical evaluation. Multi-item render cycles map lists onto elements. React requires each list item to feature a unique 'key' identifier so its reconciliation engine can track updates, reorganizations, and deletions without rebuilt render grids.",
    syntax: "items.map((item) => <li key={item.id}>{item.name}</li>)",
    code: `import React, { useState } from 'react';

interface TaskItem {
  id: string;
  name: string;
  severity: 'high' | 'normal';
}

export default function TaskMapViewer() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: "1", name: "Set up Firestore security layers", severity: "high" },
    { id: "2", name: "Translate dynamic index schemas", severity: "normal" },
    { id: "3", name: "Verify Cloud OAuth parameters", severity: "high" }
  ]);
  const [priorityFilter, setPriorityFilter] = useState(false);

  const toggleTaskSeverity = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, severity: t.severity === 'high' ? 'normal' : 'high' } : t));
  };

  const filteredTasks = priorityFilter ? tasks.filter(t => t.severity === 'high') : tasks;

  return (
    <div className="p-6 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-mono">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-black text-xs uppercase uppercase">Task Dispatch Panel</h3>
        <button 
          onClick={() => setPriorityFilter(!priorityFilter)}
          className={\`text-[9px] font-black border-2 border-black px-2 py-1 uppercase \${
            priorityFilter ? 'bg-red-500 text-white' : 'bg-neutral-200 text-black'
          }\`}
        >
          {priorityFilter ? "🔥 Showing Crucial Only" : "Showing All Tasks"}
        </button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.map((tsk) => (
          <li 
            key={tsk.id} 
            className="flex justify-between items-center p-2.5 bg-neutral-50 border-2 border-black text-xs"
          >
            <span className={tsk.severity === 'high' ? "font-black text-black" : "font-semibold text-neutral-600"}>
              {tsk.name}
            </span>
            <button 
              onClick={() => toggleTaskSeverity(tsk.id)}
              className={\`text-[9px] font-mono px-2 py-0.5 border border-black font-black uppercase tracking-tight active:translate-y-px transition-all \${
                tsk.severity === 'high' ? 'bg-red-100/50 text-red-600' : 'bg-[#00FF00]/10 text-emerald-800'
              }\`}
            >
              {tsk.severity === 'high' ? 'High' : 'Normal'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    outputExplanation: "Demonstrates filtering and list mappings with unique keys. Updates re-evaluate list layouts in real time while maintaining state across changes.",
    practiceTask: "Implement an input form field that allows typing a task name and appending it to the list state with a generated ID.",
    commonMistakes: "Using array indices (e.g. key=index) as unique React keys. Doing so leads to layout errors and state mix-ups if elements are deleted or re-ordered.",
    interviewQuestion: "Why should you avoid using Math.random() inside functional React key assignment statements?",
    miniQuiz: {
      question: "Which array function is primarily utilized in React to transform arrays of records into arrays of visual JSX tags?",
      options: [
        "Array.prototype.forEach",
        "Array.prototype.filter",
        "Array.prototype.map",
        "Array.prototype.reduce"
      ],
      answerIndex: 2,
      explanation: "map iterates through each record, returning a corresponding JSX template element to construct clean dynamic lists."
    }
  },
  {
    id: "forms-controlled-inputs",
    title: "6. Forms & Controlled Inputs",
    level: "Intermediate",
    estimate: "13 mins",
    description: "Learn to handle form interactions, handle user keystrokes, prevent standard page refreshes, and track input states natively in React state.",
    explanation: "HTML elements like inputs, drop-downs, and forms maintain personal local states inside the browser. In React, a component functions best when state updates are fully centralized. This approach is called 'Controlled Components'. Every keystroke triggers update listeners which bind inputs directly to useState hooks.",
    syntax: "const [val, setVal] = useState('');\n<input value={val} onChange={e => setVal(e.target.value)} />",
    code: `import React, { useState } from 'react';

export default function SecureRegistration() {
  const [form, setForm] = useState({ name: '', email: '', role: 'Developer' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Stop standard HTML page reload on submit
    if (form.name.length < 3 || !form.email.includes('@')) {
      alert("Invalid user specifications! Please update details.");
      return;
    }
    setSuccess(true);
  };

  return (
    <div className="p-6 border-4 border-black bg-stone-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-mono text-xs">
      <h3 className="font-black uppercase text-sm mb-3">Enterprise Access Node</h3>
      
      {success ? (
        <div className="bg-[#00FF00]/10 border-2 border-black p-4 text-center">
          <p className="font-black text-black uppercase mb-1">Access Handshake Configured!</p>
          <p className="text-[10px] text-stone-600">Name: {form.name} // User: {form.email} // Role: {form.role}</p>
          <button 
            type="button"
            onClick={() => { setForm({ name: '', email: '', role: 'Developer' }); setSuccess(false); }}
            className="mt-3 bg-black text-white font-black px-2 py-1 uppercase text-[10px] cursor-pointer"
          >
            Clear Record
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[9px] font-black uppercase text-neutral-500 mb-1">Full Name</label>
            <input 
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border-2 border-black p-2 font-black text-neutral-800 focus:bg-yellow-50/20"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-[9px] font-black uppercase text-neutral-500 mb-1">Email Coordinates</label>
            <input 
              type="text"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full border-2 border-black p-2 font-black text-neutral-800 focus:bg-yellow-50/20"
              placeholder="admin@enterprise.com"
            />
          </div>

          <div>
            <label className="block text-[9px] font-black uppercase text-neutral-500 mb-1">Assigned Framework</label>
            <select 
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              className="w-full border-2 border-black p-2 font-black bg-white focus:bg-yellow-50/20 cursor-pointer"
            >
              <option>Developer</option>
              <option>Architect</option>
              <option>Security Auditor</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#00FF00] hover:bg-emerald-400 border-2 border-black py-2 text-black font-black uppercase"
          >
            Create Sandbox Credential
          </button>
        </form>
      )}
    </div>
  );
}`,
    outputExplanation: "Demonstrates controlled component bindings. State objects update on change events, and the submit handler processes validation checks before allowing login transactions.",
    practiceTask: "Implement real-time error logging below each form input field that outputs warnings if inputs are too short.",
    commonMistakes: "Forgetting to call 'event.preventDefault()' in submit functions, which causes standard browser form triggers to refresh active pages, wiping current React states.",
    interviewQuestion: "What is the difference between controlled and uncontrolled components inside React forms, and when would you use uncontrolled inputs?",
    miniQuiz: {
      question: "Which DOM property links standard HTML element inputs to useState tracking variables?",
      options: [
        "defaultValue",
        "value",
        "name",
        "placeholder"
      ],
      answerIndex: 1,
      explanation: "The value prop of an input element binds its displayed content directly to React state values, maintaining centralized control."
    }
  },
  {
    id: "hooks-useeffect",
    title: "7. React Lifecycle & useEffect",
    level: "Intermediate",
    estimate: "15 mins",
    description: "Learn to handle side effects, track state changes, execute API queries, and clean up active event listeners correctly.",
    explanation: "React components must execute cleanly without side effects. Side effects include data queries, timers, or subscribing to sockets. The `useEffect` hook enables synchronization, and takes a dependency array representing the states it monitors. Returning a clean-up function prevents memory leaks when components unmount.",
    syntax: "useEffect(() => { subscribe(); return () => unsubscribe(); }, [dependency]);",
    code: `import React, { useState, useEffect } from 'react';

export default function HeartbeatMonitor() {
  const [pulse, setPulse] = useState(72);
  const [timerCount, setTimerCount] = useState(0);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) return;

    // Start background activity tracking interval
    const cycleInterval = setInterval(() => {
      setTimerCount(t => t + 1);
      setPulse(p => Math.floor(70 + Math.random() * 15));
    }, 1000);

    // CRITICAL: Cleanup function runs when component unmounts or dependencies update
    return () => {
      clearInterval(cycleInterval);
    };
  }, [listening]);

  return (
    <div className="p-6 border-4 border-black bg-stone-900 text-stone-200 font-mono shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-xs">
      <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-stone-800">
        <h3 className="text-white font-black uppercase text-[11px] uppercase">Pulse Synchronizer</h3>
        <span className={\`text-[9px] px-1.5 py-0.5 border \${
          listening ? 'bg-[#00FF00] text-black border-black animate-pulse' : 'bg-red-500 text-white border-red-700'
        }\`}>
          {listening ? "LISTENING" : "QUARANTINED"}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between bg-stone-950 p-2 border border-stone-800">
          <span>Active Session Lifespan:</span>
          <span className="font-bold text-yellow-500">{timerCount} seconds</span>
        </div>
        <div className="flex justify-between bg-stone-950 p-2 border border-stone-800">
          <span>Simulated Core Pulse Rate:</span>
          <span className="font-bold text-cyan-400">{pulse} BPM</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => setListening(true)}
          className="flex-1 bg-neutral-800 hover:bg-neutral-750 border border-stone-700 text-white font-mono uppercase text-[10px] py-1.5 cursor-pointer"
        >
          Initialize Listener
        </button>
        <button 
          onClick={() => { setListening(false); setTimerCount(0); }}
          className="flex-1 bg-red-950/30 text-red-400 border border-red-900 py-1.5 uppercase text-[10px] hover:bg-red-950/50 cursor-pointer"
        >
          Deactivate
        </button>
      </div>
    </div>
  );
}`,
    outputExplanation: "Handles interval state synchronization correctly. Deactivating the listener triggers clean-up functions instantly, helping avoid memory leaks.",
    practiceTask: "Implement an asynchronous API simulation fetch loading indicator using useEffect when mounting the card on layout grids.",
    commonMistakes: "Omitting dependency arrays entirely, which triggers side effects on every single render and severely slows page loads.",
    interviewQuestion: "What happens if you return a function from the useEffect hook, and when is it executed?",
    miniQuiz: {
      question: "Which dependency array parameter configuration executes a useEffect hook only once when mounting?",
      options: [
        "Empty array ([])",
        "Omitted completely (undefined dependency)",
        "Array containing props properties ([props])",
        "Array filled with primitive Boolean variables ([true])"
      ],
      answerIndex: 0,
      explanation: "Passing an empty dependency array tells React that the side effect does not watch any reactive variables, so it runs only once after the initial render."
    }
  },
  {
    id: "context-api-uplifting",
    title: "8. React Context API & Global Stores",
    level: "Intermediate",
    estimate: "14 mins",
    description: "Build clean global State Stores to bypass tedious deep components prop-drilling pathways across workspaces.",
    explanation: "Deeply nested components often require parameters tracked by parents. Passing props through multiple layers of intermediate components is tedious and makes refactoring difficult. The React Context API solves this challenge by creating global state stores. Any child component can subscribe to this store and access state values or functions directly.",
    syntax: "const MyCtx = createContext();\n<MyCtx.Provider value={store}>\n  <Child />\n</MyCtx.Provider>",
    code: `import React, { createContext, useContext, useState } from 'react';

// 1. Establish the global context portal
interface ConfigStore {
  mode: 'light' | 'stealth';
  toggleSecurityMode: () => void;
}
const ContextStore = createContext<ConfigStore | undefined>(undefined);

// Nested Kid Component (subscriber node)
function SecurityStatusBanner() {
  const store = useContext(ContextStore);
  if (!store) return null;

  return (
    <div className={\`p-4 border-2 border-black mb-3 text-xs \${
      store.mode === 'stealth' ? 'bg-zinc-950 text-emerald-400 border-zinc-800' : 'bg-yellow-300 text-black border-black'
    }\`}>
      <h4 className="font-black uppercase tracking-tight mb-1 font-mono text-[10px]">
        Global Context Consumer Banner
      </h4>
      <p className="font-bold">Active Protocol: {store.mode.toUpperCase()} WORKSPACE</p>
    </div>
  );
}

// Another nested subscriber component
function AccessTogglerButton() {
  const store = useContext(ContextStore);
  if (!store) return null;

  return (
    <button 
      type="button"
      onClick={store.toggleSecurityMode}
      className="w-full bg-black text-white px-3 py-2 font-mono font-black text-[10px] uppercase cursor-pointer"
    >
      🔑 Toggle Global Security Paradigm
    </button>
  );
}

// Context wrapper node
export default function ContextHierarchyLauncher() {
  const [mode, setMode] = useState<'light' | 'stealth'>('light');

  const toggleSecurityMode = () => {
    setMode(prev => prev === 'light' ? 'stealth' : 'light');
  };

  return (
    <ContextStore.Provider value={{ mode, toggleSecurityMode }}>
      <div className="p-6 border-4 border-black bg-neutral-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-mono">
        <h3 className="font-black text-sm uppercase text-black mb-3">Context Store Provider</h3>
        
        {/* Sub components do not require parameters drilled explicitly */}
        <div className="space-y-1">
          <SecurityStatusBanner />
          <AccessTogglerButton />
        </div>
      </div>
    </ContextStore.Provider>
  );
}`,
    outputExplanation: "Demonstrates deep state sharing using React Context. Provider wrappers propagate state values downwards, allowing deeply nested subscriber elements to access data directly.",
    practiceTask: "Expand the global state store values to support tracking an active admin username, displaying it neatly within the Status Banner.",
    commonMistakes: "Using Context API for rapidly changing variables, which can trigger complete re-renders of the entire subscriber tree.",
    interviewQuestion: "How does the Context API compare to robust, full-featured state engines like Redux?",
    miniQuiz: {
      question: "Which React hook is used inside child components to consume value states emitted by Context Providers?",
      options: [
        "useReducer",
        "useCtxState",
        "useContext",
        "useProvider"
      ],
      answerIndex: 2,
      explanation: "useContext is the hook that matches a specified Context object to consume data directly from the nearest parent provider."
    }
  },
  {
    id: "architecting-custom-hooks",
    title: "9. Architecting Custom Hooks",
    level: "Intermediate",
    estimate: "15 mins",
    description: "Learn how to bundle code, isolate side effects, and write reusable functional Hooks to clean up component code.",
    explanation: "When multiple components share similar stateful behaviors, duplicating code is inefficient. Custom hooks solve this by extracting stateful logic into reusable functions. These are standard JavaScript functions whose names always start with 'use'. They can call other React hooks internally, creating custom, reusable logic blocks.",
    syntax: "export function useToggle(init = false) { ... return [val, toggle]; }",
    code: `import React, { useState, useEffect } from 'react';

// Custom reusable hook: useLocalStorage
function useSavedPreference<T>(storageKey: string, initialValue: T): [T, (nextVal: T) => void] {
  const [pref, setPref] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const updatePreference = (nextVal: T) => {
    try {
      setPref(nextVal);
      window.localStorage.setItem(storageKey, JSON.stringify(nextVal));
    } catch (err) {
      console.error("Localstorage write error", err);
    }
  };

  return [pref, updatePreference];
}

export default function CustomHookTester() {
  const [themeMode, setThemeMode] = useSavedPreference<string>("workspace_theme", "Default Standard");
  const [inputText, setInputText] = useState("");

  return (
    <div className="p-6 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-mono text-xs">
      <h3 className="font-black uppercase text-sm mb-3">Custom Hook Testing Sandbox</h3>
      
      <div className="bg-yellow-300 p-3 border-2 border-black mb-4 font-bold text-stone-900">
        Saved Theme State: {themeMode}
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-[9px] font-black uppercase text-neutral-500 mb-1">Update Persistent Preference:</label>
          <input 
            type="text" 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className="w-full border-2 border-black p-2 font-black "
            placeholder="Type theme, e.g., Cyberpunk Dark"
          />
        </div>

        <button 
          onClick={() => {
            if (inputText.trim()) {
              setThemeMode(inputText);
              setInputText("");
            }
          }}
          className="w-full bg-[#00FF00] hover:bg-emerald-400 font-black border-2 border-black py-2 uppercase cursor-pointer"
        >
          💾 Apply and Save Configuration
        </button>
      </div>
    </div>
  );
}`,
    outputExplanation: "Demonstrates business logic extraction using a custom useLocalStorage hook. Changing preferences updates state and syncs with storage in a single, reusable function call.",
    practiceTask: "Create a custom 'useOnlineOfflineStatus' hook that listens to browser connectivity events to display a real-time connection status badge.",
    commonMistakes: "Not starting custom hook filenames and function names with the mandatory prefix string 'use', which disables linting rules designed for hooks.",
    interviewQuestion: "What are the rules of React Hooks, and why can they only be called at the top-level of React functions?",
    miniQuiz: {
      question: "Which of the following describes a key benefit of custom React hooks?",
      options: [
        "They allow functional components to bypass the limitations of the Virtual DOM",
        "They enable reusing stateful, logical hooks behavior without duplicating code configurations",
        "They compile JavaScript components directly into native binary systems",
        "They allow components to share a single, shared state reference with child nodes"
      ],
      answerIndex: 1,
      explanation: "Custom hooks let you extract stateful logic. This separates raw business logic from visual interface templates to improve code quality."
    }
  },
  {
    id: "usereducer-state-machine",
    title: "10. The useReducer State Machine",
    level: "Advanced",
    estimate: "18 mins",
    description: "Learn how to manage complex, multi-branch component states predictably using dispatch actions and central reducers.",
    explanation: "For complex systems with multiple, dependent state transitions, scattered `useState` hooks are difficult to manage. The `useReducer` hook solves this by centralizing state updates into a single function. This 'reducer' function processes actions and returns updated state objects, ensuring reliable and easy-to-test state transitions.",
    syntax: "const [state, dispatch] = useReducer(reducer, initialState);",
    code: `import React, { useReducer } from 'react';

// Declarative Interface representing our VM state
interface SystemConsoleState {
  memoryLimit: number;
  warningsDetected: boolean;
  activeProcesses: number;
  logFeed: string[];
}

type Action = 
  | { type: 'SPAWN_PROCESS' }
  | { type: 'TERMINATE_PROCESS' }
  | { type: 'FORCE_COLD_RESTART' };

const INITIAL_CONSOLE_STATE: SystemConsoleState = {
  memoryLimit: 128,
  warningsDetected: false,
  activeProcesses: 0,
  logFeed: ["System initiated. Readiness logs safe."]
};

function consoleReducer(state: SystemConsoleState, action: Action): SystemConsoleState {
  const timestamp = new Date().toLocaleTimeString();
  switch (action.type) {
    case 'SPAWN_PROCESS': {
      const nextCount = state.activeProcesses + 1;
      const memOverflow = nextCount * 64 > state.memoryLimit;
      return {
        ...state,
        activeProcesses: nextCount,
        warningsDetected: memOverflow,
        logFeed: [\`[\${timestamp}] Spawned PID \${nextCount * 102} (Active Processes: \${nextCount})\`, ...state.logFeed]
      };
    }
    case 'TERMINATE_PROCESS': {
      const nextCount = Math.max(0, state.activeProcesses - 1);
      const memOverflow = nextCount * 64 > state.memoryLimit;
      return {
        ...state,
        activeProcesses: nextCount,
        warningsDetected: memOverflow,
        logFeed: [\`[\${timestamp}] Halted PID \${(nextCount + 1) * 102} safely.\`, ...state.logFeed]
      };
    }
    case 'FORCE_COLD_RESTART':
      return {
        ...INITIAL_CONSOLE_STATE,
        logFeed: [\`[\${timestamp}] Emergency Core Reset triggered.\`]
      };
    default:
      return state;
  }
}

export default function ReducerVMConsole() {
  const [state, dispatch] = useReducer(consoleReducer, INITIAL_CONSOLE_STATE);

  return (
    <div className="p-6 border-4 border-black bg-stone-950 text-stone-200 font-mono shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-xs">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-800">
        <h3 className="text-white font-black uppercase text-[11px]">System VM Node</h3>
        <span className={\`text-[9px] px-2 py-0.5 border font-black \${
          state.warningsDetected ? 'bg-red-500 text-white animate-pulse border-red-750' : 'bg-[#00FF00] text-black border-black'
        }\`}>
          {state.warningsDetected ? "⚠️ OVERLOAD DETECTED" : "GREEN - READY"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-stone-900 p-2.5 border border-stone-800">
          <p className="text-[10px] text-stone-400 uppercase">Process Queue</p>
          <p className="font-black text-white text-base mt-0.5">{state.activeProcesses}</p>
        </div>
        <div className="bg-stone-900 p-2.5 border border-stone-800">
          <p className="text-[10px] text-stone-400 uppercase">Memory Allocation</p>
          <p className="font-black text-white text-base mt-0.5">{state.activeProcesses * 64} / {state.memoryLimit}MB</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => dispatch({ type: 'SPAWN_PROCESS' })}
          className="flex-1 bg-neutral-800 hover:bg-neutral-750 font-black border border-stone-700 py-1.5 uppercase text-[9px] cursor-pointer"
        >
          + Spawn PID
        </button>
        <button 
          onClick={() => dispatch({ type: 'TERMINATE_PROCESS' })}
          className="flex-1 bg-neutral-850 hover:bg-neutral-800 font-black border border-stone-750 py-1.5 uppercase text-[9px] cursor-pointer"
        >
          - Halt PID
        </button>
        <button 
          onClick={() => dispatch({ type: 'FORCE_COLD_RESTART' })}
          className="bg-red-950/40 text-red-400 border border-red-900 py-1.5 px-3 uppercase text-[9px] hover:bg-red-950/60 cursor-pointer"
        >
          CORE RESET
        </button>
      </div>

      <div className="p-3 bg-stone-900 border border-stone-800 rounded-sm">
        <h4 className="text-white text-[9px] font-black uppercase mb-2">VM Operation Logs:</h4>
        <pre className="text-[9px] max-h-24 overflow-y-auto leading-relaxed text-emerald-400">
          {state.logFeed.join('\\n')}
        </pre>
      </div>
    </div>
  );
}`,
    outputExplanation: "Demonstrates useReducer executing centralized actions dynamically. Sending dispatched operations keeps state values robust and structured.",
    practiceTask: "Incorporate a customizable memory configuration action that allows changing the maximum memory limit payload dynamically.",
    commonMistakes: "Directly mutating the reducer's current state object from within custom cases. Reducers must remain pure functions and always return brand new, fully cloned state objects.",
    interviewQuestion: "When should you choose useReducer over multiple useState hooks in a React component?",
    miniQuiz: {
      question: "Which of the following describes a key characteristics of a Reducer function in React?",
      options: [
        "It interacts directly with relational databases asynchronously",
        "It is a pure function that takes previous state and action payload to calculate next state securely",
        "It replaces component stylesheets with dynamic vector graphics",
        "It compiles standard HTML components into inline context bundles"
      ],
      answerIndex: 1,
      explanation: "A reducer must remain a pure function. It should not make API requests or cause side effects; it simply derives next states based on received action objects."
    }
  },
  {
    id: "performance-memoization",
    title: "11. Performance & Memoization Hooks",
    level: "Advanced",
    estimate: "16 mins",
    description: "Learn to trace, measure, and optimize slow components using useMemo, useCallback, and dynamic component memo flags.",
    explanation: "Re-rendering components recalculates local variables and updates child elements unnecessarily. The `useMemo` hook optimizes performance by caching the results of expensive calculations, while `useCallback` caches function references across renders to prevent children from reloading unnecessarily.",
    syntax: "const cachedValue = useMemo(() => expensiveFn(a), [a]);\nconst cachedCallback = useCallback(() => fn(), []);",
    code: `import React, { useState, useMemo, useCallback } from 'react';

// Heavily memoized child component
const ComplexResultViewer = React.memo(({ value }: { value: number }) => {
  return (
    <div className="p-3 bg-[#00FF00]/5 border-2 border-[#00FF00]/30 text-xs text-center font-mono font-bold mt-2">
      ⚡ Specialized Result (Updates only on number change): <span className="bg-[#00FF00] text-black px-1 border border-black">{value}</span>
    </div>
  );
});

export default function PerformanceDashboard() {
  const [weight, setWeight] = useState(25);
  const [dummyCount, setDummyCount] = useState(0);

  // Expensive calculation cached using useMemo
  const calculatedSquare = useMemo(() => {
    let loop = 0;
    while (loop < 500000) loop++; // Mock heavy calculation loop
    return weight * weight;
  }, [weight]);

  return (
    <div className="p-6 border-4 border-black bg-stone-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-mono text-xs text-stone-900">
      <h3 className="font-black text-sm uppercase text-black mb-3">Memo Core Testing</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1">
            Simulate Processing Weight: {weight} (Triggers calculations)
          </label>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={weight}
            onChange={e => setWeight(Number(e.target.value))}
            className="w-full cursor-pointer bg-neutral-200 border-2 border-black"
          />
        </div>

        <div className="p-3 bg-white border-2 border-black space-y-1.5">
          <p className="font-bold">Heavy Computed Yield: {calculatedSquare}</p>
        </div>

        <div className="pt-2 border-t border-neutral-300">
          <label className="block text-[9px] font-black uppercase text-neutral-500 mb-1">
            Toggle unrelated states should trigger fast visual re-renders:
          </label>
          <button 
            onClick={() => setDummyCount(d => d + 1)}
            className="w-full bg-yellow-300 hover:bg-yellow-400 border-2 border-black py-2 uppercase font-black cursor-pointer"
          >
            🔄 Trigger Dummy Render [renders: {dummyCount}]
          </button>
        </div>

        <ComplexResultViewer value={calculatedSquare} />
      </div>
    </div>
  );
}`,
    outputExplanation: "Demonstrates memoization. Changing dummy counters updates state instantly without re-processing expensive code loops.",
    practiceTask: "Implement a useCallback button callback to verify that children memo targets are not re-rendered on simple visual context state swaps.",
    commonMistakes: "Wrapping simple, lightweight operations in useMemo or useCallback. Caching values has its own overhead, so excessive memoization can actually degrade performance.",
    interviewQuestion: "What is Referental Equality in JavaScript, and how does it relate to the useCallback dependency checking arrays?",
    miniQuiz: {
      question: "Which of the following optimization tools prevents functional components from re-rendering if their input props are identical?",
      options: [
        "React.useRef",
        "React.useCallback",
        "React.memo",
        "React.useLayoutEffect"
      ],
      answerIndex: 2,
      explanation: "React.memo is a higher-order component container that shallowly compares component props, skipping re-renders if no changes are detected."
    }
  },
  {
    id: "protected-auth-routes",
    title: "12. Secure Client Access & Protected Routes",
    level: "Advanced",
    estimate: "20 mins",
    description: "Construct navigation security layouts and role validate administrative access to cloud system nodes.",
    explanation: "Protecting sensitive interfaces requires server state alignment and client guards. Safe authorization utilizes secure tokens alongside React Context providers which instantly redirect guests attempting illegal routing access.",
    syntax: "if (!user || !user.email.endsWith('@company.com')) return <Redirect />;",
    code: `import React, { useState } from 'react';

export default function ClientGatewaySimulator() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [securedData, setSecuredData] = useState<string | null>(null);

  const fetchSecureDatabasePayload = () => {
    if (!isAdmin) {
      setSecuredData("CRITICAL EXCEPTION: Permission Denied. Access Token Missing.");
      return;
    }
    setSecuredData("DATABASE STACK STATUS: NORMAL \\nKEY_ID: 88506113156 \\nSERVER: ACTIVE");
  };

  return (
    <div className="p-6 border-4 border-black bg-stone-900 text-stone-200 font-mono shadow-[4px_4px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto">
      <div className="flex items-center justify-between border-b-2 border-stone-800 pb-3 mb-4">
        <h3 className="text-white font-black text-xs uppercase uppercase">Gate Security Module</h3>
        <span className={\`text-[9px] font-black px-2 py-0.5 border \${
          isAdmin ? 'bg-[#00FF00] text-black border-black' : 'bg-red-500 text-white border-red-700'
        }\`}>
          {isAdmin ? "PRIVILEGED SESSION" : "GUEST CREDENTIAL"}
        </span>
      </div>

      <div className="space-y-4 text-xs">
        <p className="text-[10px] text-stone-400 font-bold leading-relaxed">
          Toggle simulation mode to see how Client routing security acts on unverified tokens:
        </p>
        
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={() => { setIsAdmin(true); setSecuredData(null); }}
            className="flex-1 bg-zinc-800 border-2 border-black hover:bg-neutral-850 text-white font-black py-1 px-1.5 cursor-pointer uppercase text-[9px]"
          >
            Authenticate Admin
          </button>
          <button 
            type="button"
            onClick={() => { setIsAdmin(false); setSecuredData(null); }}
            className="flex-1 bg-red-800/20 border-2 border-red-900 hover:bg-red-800/40 text-red-400 font-black py-1 px-1.5 cursor-pointer uppercase text-[9px]"
          >
            Revoke Access
          </button>
        </div>

        <button 
          onClick={fetchSecureDatabasePayload}
          className="w-full bg-yellow-300 hover:bg-yellow-400 border-2 border-black text-black font-black uppercase text-[10px] py-1.5 transition-all cursor-pointer"
        >
          🔑 Fetch Secured Administrative Node Data
        </button>

        {securedData && (
          <pre className={\`p-3 border-2 text-[10px] leading-relaxed overflow-x-auto whitespace-pre \${
            securedData.includes("CRITICAL") ? 'bg-red-950/40 border-red-900 text-red-400' : 'bg-[#00FF00]/10 border-[#00FF00]/40 text-[#00FF00]'
          }\`}>
            {securedData}
          </pre>
        )}
      </div>
    </div>
  );
}`,
    outputExplanation: "Enforces a clear gate lock simulation. Fetch logs return 403 errors unless authorization credentials are authenticated successfully.",
    practiceTask: "Implement a secondary condition restricting operations unless the simulated account matches specific company domain metrics.",
    commonMistakes: "Trusting database filtering solely to client javascript states, allowing attackers to access secure endpoints via inspection tools.",
    interviewQuestion: "What is JWT token verification, and why should signature verification always occur on server-side modules?",
    miniQuiz: {
      question: "Which strategy guarantees proper security when protecting administrative interfaces?",
      options: [
        "Keeping endpoints visible and hiding components in HTML with display:none",
        "Checking security access conditions both in the client state and through database rules",
        "Writing admin credentials inside client constant files",
        "Clearing local storage states on page refresh"
      ],
      answerIndex: 1,
      explanation: "Security must be end-to-end: client navigation blocks enhance user experience, but server rules enforce security gates."
    }
  }
];
