import { Lesson } from "../types";

export const lessonsData: Lesson[] = [
  // BEGINNER LESSONS
  {
    id: "what-is-react",
    title: "What is React?",
    level: "Beginner",
    description: "Learn the core concepts of React, its component-driven architecture, and virtual DOM mechanism.",
    estimate: "10 mins",
    explanation: "React is a open-source JavaScript library developed by Meta for building modern user interfaces. Instead of modifying the browser's DOM directly, which is slow, React updates a 'Virtual DOM' in memory. When state updates, React calculates the minimal set of changes (diffing) and batche-updates the real DOM efficiently.",
    syntax: "import React from 'react';\n// React components can be written as JavaScript functions returning JSX",
    code: `function WelcomeMessage() {
  return (
    <div className="p-6 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h1 className="text-2xl font-black tracking-tight text-black">HELLO BUILDER!</h1>
      <p className="font-mono text-sm text-gray-700 mt-2">
        Welcome to modular rendering. This component is isolated and reusable.
      </p>
    </div>
  );
}`,
    outputExplanation: "Produces a beautifully styled alert-box shaped card on screen. Modifying text inside this function will dynamically re-render this visual block instantly without page reloads.",
    practiceTask: "Add an extra paragraph element with your personal bio inside the WelcomeMessage component, and style lock it with font-mono.",
    commonMistakes: "Remember that React components must always return a single root element (or use fragments like <>...</>) and must start with a capital letter (e.g., WelcomeMessage, not welcomeMessage).",
    interviewQuestion: "What is the Virtual DOM and how does React's reconciliation engine work?",
    miniQuiz: {
      question: "Why does React use uppercase names for custom components?",
      options: [
        "To satisfy standard ESLint settings",
        "React uses capitalization to distinguish custom components from standard browser elements (like div or main)",
        "Uppercase words execute faster in the JS main thread",
        "It is simply a recommendation and lowercase names run the exact same way"
      ],
      answerIndex: 1,
      explanation: "Capitalized elements in JSX are compiled as variable references rather than literal HTML tags, enabling React to mount custom components."
    }
  },
  {
    id: "jsx",
    title: "JSX Guide",
    level: "Beginner",
    description: "Understand JavaScript XML syntax, dynamic embedding, and styling attributes in JSX.",
    estimate: "12 mins",
    explanation: "JSX is a XML-like syntax extension to JavaScript that allows you to write HTML structures directly inside your JS code. It is compiled by Vite/Babel down to React.createElement() calls. In JSX, you can embed any valid JavaScript expressions using curly braces {}.",
    syntax: "const element = <h1 className='text-3xl'>{dynamicValue}</h1>;",
    code: `function DashboardCard() {
  const user = { name: "Sarah Bashyal", role: "Software Architect" };
  const getStatus = () => "ACTIVE";

  return (
    <div className="border-2 border-black p-4 font-mono bg-yellow-50 my-2">
      <h2 className="font-bold text-lg uppercase text-black">{user.name}</h2>
      <p className="text-xs text-gray-600 mb-2">{user.role}</p>
      <div className="inline-block bg-black text-[#58a6ff] text-xs px-2 py-1 font-bold">
        STATUS: {getStatus()}
      </div>
    </div>
  );
}`,
    outputExplanation: "Extracts values from the user metadata and outputs a responsive banner badge showing Sarah's system status dynamically.",
    practiceTask: "Create a variable named 'date' set to the current year and embed it at the footer of the DashboardCard.",
    commonMistakes: "Do not use 'class' for HTML classes. Since JSX compiles to JavaScript, 'class' is a preserved JS keyword - you must always use 'className' instead.",
    interviewQuestion: "Why can't you write standard JS if/else statements directly inside a JSX return block?",
    miniQuiz: {
      question: "Which of the following expression embeddings is invalid inside JSX curly braces?",
      options: [
        "{Math.max(10, 20)}",
        "{if (true) { return 'yes' }}",
        "{isLogged ? 'Welcome' : 'Sign In'}",
        "{['React', 'Vite'].map(x => <li>{x}</li>)}"
      ],
      answerIndex: 1,
      explanation: "Curly braces in JSX accept statement expressions (expressions that evaluate to a value). An if/else statement is a control flow statement, which does not return a value directly. Use ternary operations or logical short-circuits instead."
    }
  },
  {
    id: "components",
    title: "React Components",
    level: "Beginner",
    description: "Master nesting components, separating layout files, and structuring composition patterns.",
    estimate: "12 mins",
    explanation: "Components are independent, reusable bits of user interface. They are self-contained logical units. Rather than building massive pages, you compose interfaces out of nested modules (headers, navigation cards, feedback blocks).",
    syntax: "function Child() {}\nfunction Parent() { return <Child />; }",
    code: `// Sub-component
function FeatureBadge({ title }: { title: string }) {
  return <span className="border border-black bg-black text-white px-2 py-0.5 text-xs mr-2 uppercase">{title}</span>;
}

// Parent component
export default function ProjectFooter() {
  return (
    <div className="p-4 border-t-2 border-black bg-neutral-100 flex items-center justify-between">
      <span className="font-mono text-xs">BUILD STACK:</span>
      <div className="flex">
        <FeatureBadge title="Vite" />
        <FeatureBadge title="Tailwind" />
        <FeatureBadge title="React 19" />
      </div>
    </div>
  );
}`,
    outputExplanation: "Produces a neat inline horizontal status tray with custom labels.",
    practiceTask: "Add a custom description prop or element to the FeatureBadge and display it as lowercase under the badge.",
    commonMistakes: "Avoid nesting the function definition of one component inside another. This causes the internal component to be destroyed and recreated on every single render, losing focus and performance.",
    interviewQuestion: "What is the difference between functional components and class components in React?",
    miniQuiz: {
      question: "What occurs if you define a component function inside another component's render body?",
      options: [
        "It triggers a compilation error automatically",
        "It behaves perfectly and improves loading performance",
        "React re-creates information from scratch on each rendering trigger, wiping any internal state and element focus",
        "It prevents Tailwind classes from applying styling rules"
      ],
      answerIndex: 2,
      explanation: "Nesting component definitions causes the inner function blueprint to get redefined on each parent render cycle, forcing React to fully unmount and remount that subtree."
    }
  },
  {
    id: "props",
    title: "Understanding Props",
    level: "Beginner",
    description: "Learn how to orchestrate single-direction data flow with props and props callbacks.",
    estimate: "15 mins",
    explanation: "Props (short for properties) represent read-only inputs passed into components. React employs a strict one-way data flow: props must never be modified by the receiving child component. This makes components predictable and easy to debug.",
    syntax: "interface Props { value: string; }\nfunction Custom({ value }: Props)",
    code: `type ButtonProps = {
  label: string;
  variant: "primary" | "secondary";
  onClick: () => void;
};

export default function TechButton({ label, variant, onClick }: ButtonProps) {
  const isPrimary = variant === "primary";
  return (
    <button
      onClick={onClick}
      className={\`px-4 py-2 font-mono text-sm font-bold uppercase transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none \${
        isPrimary 
          ? 'bg-black text-white hover:bg-neutral-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
          : 'bg-white text-black border-2 border-black hover:bg-neutral-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
      }\`}
    >
      {label}
    </button>
  );
}`,
    outputExplanation: "Builds a reactive button with instant state callback hookup. Triggers translation transformations strictly on click actions.",
    practiceTask: "Implement an additional variant parameter called 'danger' that outputs a bright red background button style with white text.",
    commonMistakes: "Remember that props are read-only! Mutating standard props lines directly (e.g., props.name = 'John') triggers severe rendering state sync bugs. Treat props as completely immutable.",
    interviewQuestion: "What does 'immutable props' mean and how does it safeguard code integrity?",
    miniQuiz: {
      question: "Can a child component update its received props directly?",
      options: [
        "Yes, by using standard assignments",
        "No, props are read-only and immutable. Updates must be requested by triggering parent callback functions",
        "Only if the props contain numbers instead of objects",
        "Yes, but only inside a useEffect block"
      ],
      answerIndex: 1,
      explanation: "Props represent read-only properties. If components need to change details, standard state hook methods must be lifted to the parent and triggered via passed down function callbacks."
    }
  },
  {
    id: "state",
    title: "Component State",
    level: "Beginner",
    description: "Manage component state with useState, and handle events with clean interactive loops.",
    estimate: "15 mins",
    explanation: "State is dynamic, component-specific storage that triggers UI re-renders on update. Unlike read-only props, state is fully local and mutable using the set-state callback setter. React tracks these hooks and immediately performs re-computations upon update triggers.",
    syntax: "const [state, setState] = useState(initialValue);",
    code: `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="p-6 border-2 border-black bg-white max-w-sm">
      <h3 className="font-mono text-xs text-gray-500 mb-2 uppercase">VISITOR REGISTER</h3>
      <div className="flex items-baseline space-x-2">
        <span className="font-sans font-black text-5xl text-black">{count}</span>
        <span className="font-mono text-xs text-green-600">ACTIVE</span>
      </div>
      <div className="flex gap-2 mt-4">
        <button 
          onClick={() => setCount(prev => prev + 1)}
          className="bg-black hover:bg-neutral-800 text-white px-3 py-1 text-xs font-mono uppercase font-bold"
        >
          ADD VISITOR
        </button>
        <button 
          onClick={() => setCount(0)}
          className="border border-black text-black px-3 py-1 text-xs font-mono uppercase hover:bg-neutral-50"
        >
          RESET
        </button>
      </div>
    </div>
  );
}`,
    outputExplanation: "Provides an interactive live counter utilizing react's native virtual updates. State maintains counts inside client variables seamlessly.",
    practiceTask: "Add a condition that prevents the counter from dropping below a zero value when custom decrement triggers get executed.",
    commonMistakes: "Never update state variables directly (e.g. use count = count + 1 instead of setCount). Direct mutation of state objects misses the render loop entirely and keeps visual cards stale.",
    interviewQuestion: "Why is state update in React batch-processed asynchronously instead of in a synchronous execution thread?",
    miniQuiz: {
      question: "What is correct regarding state update operations in React?",
      options: [
        "React state changes are reflected in real-time instantly inside the next immediate JS execution statement",
        "State changes must be triggered by assigning variables directly: state = newValue",
        "State setters are asynchronous and batched to prevent unnecessary layout computations across sequential updates",
        "Creating multiple state hooks slows down rendering cycles severely"
      ],
      answerIndex: 2,
      explanation: "React bunches up updates in order to perform a single unified render and paint phase, ensuring maximum smooth performance."
    }
  },
  {
    id: "useeffect",
    title: "The useEffect Hook",
    level: "Beginner",
    description: "Understand side-effects, dependency lists, and component lifecycle events.",
    estimate: "15 mins",
    explanation: "Side effects are operations that affect things outside of the pure React render cycle - such as API requests, event listeners, or timer creation. The useEffect hook allows functional components to execute side effects cleanly, with explicit declarations of when those triggers should run.",
    syntax: "useEffect(() => { /* effect code */ return () => /* cleanup */; }, [dependencies]);",
    code: `import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    // 1. Establish the side effect timer
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // 2. Return a cleanup callback to avoid memory leaks!
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty array signifies mounting lifecycle trigger once only.

  return (
    <div className="p-4 border-2 border-black font-mono bg-stone-900 text-green-400 text-center text-sm">
      STABLE CLIENT CLOCK UTC: {time}
    </div>
  );
}`,
    outputExplanation: "Spawns a client-side polling clock. The local interval updates every second, automatically cleaning up garbage memory objects when the clock unmounts from the browser viewport.",
    practiceTask: "Extend the useEffect setup to log a message in the browser developer console exactly one time when the component loads.",
    commonMistakes: "Omitting the dependency list entirely. If you forget to provide an array, the effect triggers on *every single* state change, causing infinite loops and major memory crashes.",
    interviewQuestion: "What is the primary function of the cleanup method returned inside a useEffect declaration?",
    miniQuiz: {
      question: "What does an empty dependency array [] signify inside a useEffect formulation?",
      options: [
        "The effect runs recursively infinitely on a 1ms microtask",
        "The effect executes once only during the component's mounting stage on screen",
        "The effect is deactivated entirely and ignored during compilation",
        "The effect only executes when standard local storage variables trigger changes"
      ],
      answerIndex: 1,
      explanation: "An empty array signals to React that the effect function has zero dependencies on local props or state, meaning it only needs to run once when the element is first initialized."
    }
  },

  // INTERMEDIATE LESSONS
  {
    id: "custom-hooks",
    title: "Custom Hooks",
    level: "Intermediate",
    description: "Extract clean, modular state logic into generic reusable hook functions.",
    estimate: "15 mins",
    explanation: "Custom hooks allow developers to extract component state logic into reusable functions. A custom hook is a standard JavaScript function whose name starts with 'use', which is allowed to call other React hooks internally. This promotes DRY (Don't Repeat Yourself) design.",
    syntax: "function useGenericHook() { ... return [value, setter]; }",
    code: `import { useState, useEffect } from 'react';

// Reusable custom hook for window width tracking
function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200
  });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// In component usage
export default function ResponsiveBadge() {
  const { width } = useWindowSize();
  return (
    <div className="border border-black p-4 font-mono text-xs bg-[#e1ebd5]">
      VIEWPORT RESIZE MONITOR: <span className="underline font-bold font-sans">{width}px</span>
    </div>
  );
}`,
    outputExplanation: "Produces a responsive component display that dynamically tracks the current page width in real time without lagging components.",
    practiceTask: "Build a custom hook named useToggle that accepts a default boolean state and returns [state, toggleFunction] to manage toggle lists.",
    commonMistakes: "Remember that custom hook names must always start with 'use' (e.g. useLocalStorage, not trackingState). This signals React's compiler tools to validate standard hook execution safety guidelines.",
    interviewQuestion: "How do custom hooks maintain isolated state states when called across multiple independent screens?",
    miniQuiz: {
      question: "Do multiple components invoking the same custom hook share the exact same state values?",
      options: [
        "Yes, custom hooks serve as unified global store singletons automatically",
        "No, every execution of a custom hook instantiates fresh independent local state elements in that component instance",
        "Only if the hook is defined inside a global state provider layout",
        "Yes, but only if they are siblings in the virtual layout hierarchy"
      ],
      answerIndex: 1,
      explanation: "A custom hook is only a reuse of logic. Each call generates its own independent state slots on the host component."
    }
  },
  {
    id: "context-api",
    title: "The Context API",
    level: "Intermediate",
    description: "Avoid props drilling by providing global state contexts across deep component trees.",
    estimate: "18 mins",
    explanation: "Props drilling is the painful task of passing parameters through multiple levels of components that don't need them, just to reach a deep child. React Context provides a direct way to propagate values down the component branch without manual parameters routing.",
    syntax: "const AppContext = createContext();\n<AppContext.Provider value={store}>",
    code: `import { createContext, useContext, useState } from 'react';

// Create context object
const ThemeContext = createContext<{
  theme: string;
  toggleTheme: () => void;
} | undefined>(undefined);

// Provider parent component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>("LIGHT");
  const toggleTheme = () => setTheme(prev => prev === "LIGHT" ? "DARK" : "LIGHT");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to consume context
export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useAppTheme must be used within themed layout tags");
  return context;
}
`,
    outputExplanation: "Sets up a global theme transmitter. Any nested components can consume dynamic 'theme' fields with zero manual props passing required in the intermediary files.",
    practiceTask: "Add a custom user metadata field directly into the context payload so childrens can greet the verified user by their full name.",
    commonMistakes: "Overusing global context. Setting massive, highly volatile state trees inside Context API triggers a recompute cascade on all subscribing elements. Keep high-frequency state updates in local state or dedicated external stores.",
    interviewQuestion: "What is the primary difference in performance between Redux/Zustand and React Context?",
    miniQuiz: {
      question: "Which hook should a functional component consume to interact with a declared React Context Provider?",
      options: [
        "useContext",
        "useProviderContext",
        "useSelector",
        "useRef"
      ],
      answerIndex: 0,
      explanation: "The standard 'useContext' hook extracts context state outputs dynamically based on the target Context reference passed in."
    }
  },
  {
    id: "api-fetching",
    title: "Working with APIs",
    level: "Intermediate",
    description: "Learn how to query remote services, serialize JSON, handle network faults, and trigger loading indicators.",
    estimate: "20 mins",
    explanation: "Web applications need to synchronize local screens with external cloud databases. Typically, this is achieved by executing asynchronous fetch requests inside useEffect blocks, assigning status states (loading, errors, successful data payloads) to manage visual states.",
    syntax: "fetch(url).then(res => res.json()).then(data => setData(data))",
    code: `import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
}

export default function PostLoader() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true; // Guard track to prevent race conditions

    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => {
        if (!res.ok) throw new Error("Could not acquire endpoint payload");
        return res.json();
      })
      .then(data => {
        if (active) {
          setPost(data);
          setError(null);
        }
      })
      .catch(err => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  if (loading) return <span className="font-mono text-xs animate-pulse text-gray-500">POLLING CLOUD SERVERS...</span>;
  if (error) return <span className="font-mono text-xs text-red-600">ERROR: {error}</span>;

  return (
    <div className="border border-black p-4 bg-[#f8f9fa] mt-2">
      <h4 className="font-mono text-xs text-[#0066cc] uppercase font-bold">SERIALIZED SOURCE #1</h4>
      <p className="font-sans font-bold text-sm mt-1">{post?.title}</p>
    </div>
  );
}`,
    outputExplanation: "Fires an HTTP GET query to JSONPlaceholder, monitors load indicators, triggers cleanups to avoid memory trace leaks, and safely updates DOM structures.",
    practiceTask: "Implement an interactive 'Reload Post' click trigger inside the loader layout using custom increment triggers inside the dependency array.",
    commonMistakes: "Forgetting to implement async race-condition safeguards. If your api call takes too long and the user changes pages, assigning states to unmounted components triggers console warnings and memory leak anomalies.",
    interviewQuestion: "What is a network race condition inside React's layout triggers, and how does standard local boolean variables solve this issue?",
    miniQuiz: {
      question: "Why should you fetch remote API objects inside a useEffect block rather than inside standard functional components boundaries?",
      options: [
        "Variables defined inside standard boundaries cannot undergo text-manipulations",
        "Executing fetch calls in component bodies directly fires API requests repeatedly on *EVERY SINGLE* layout render frame, choking server bandwidth",
        "Standard functions are strictly prohibited from parsing JSON structures",
        "Browsers block outer networks if standard functions execute them"
      ],
      answerIndex: 1,
      explanation: "Executing side-effects inside raw component bodies causes them to trigger on every design update cycle, leading to infinite API calls."
    }
  },

  // ADVANCED LESSONS
  {
    id: "usereducer",
    title: "Complex State with useReducer",
    level: "Advanced",
    description: "Orchestrate elaborate state workflows using Redux-style Reducer and Action dispatch mechanisms.",
    estimate: "15 mins",
    explanation: "For state structures with tightly coupled fields or complex logic rules, useState can get confusing. useReducer offers a predictable alternative by adopting a consolidated state store model. All updates occur by dispatching structured actions, which pass through a pure 'reducer' function.",
    syntax: "const [state, dispatch] = useReducer(reducer, initialState);",
    code: `import { useReducer } from 'react';

type State = { count: number; items: string[] };
type Action = 
  | { type: "add"; payload: string } 
  | { type: "remove_last" }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
      return { count: state.count + 1, items: [...state.items, action.payload] };
    case "remove_last":
      return { count: Math.max(0, state.count - 1), items: state.items.slice(0, -1) };
    case "reset":
      return { count: 0, items: [] };
    default:
      return state;
  }
}

export default function ReducerDemo() {
  const [state, dispatch] = useReducer(reducer, { count: 0, items: [] });

  return (
    <div className="border border-black p-4 bg-white font-mono text-xs">
      <h4 className="font-bold border-b border-black pb-2 mb-2 uppercase">REDUCER TASK LOGS</h4>
      <p className="mb-2">COMPLETED ITEMS count: {state.count}</p>
      <ul className="list-disc pl-4 space-y-1 my-2">
        {state.items.map((it, idx) => <li key={idx}>{it}</li>)}
      </ul>
      <div className="flex gap-2 mt-4 flex-wrap">
        <button onClick={() => dispatch({ type: "add", payload: "Task #" + (state.count + 1) })} className="bg-black text-white px-2 py-1 font-bold">ADD TASK</button>
        <button onClick={() => dispatch({ type: "remove_last" })} className="border border-black px-2 py-1">REMOVE PREV</button>
        <button onClick={() => dispatch({ type: "reset" })} className="text-red-500 border border-red-500 px-2 py-1">RESET</button>
      </div>
    </div>
  );
}`,
    outputExplanation: "Demonstrates an clean dispatch loop. Modifying lists is fully driven by structured action types.",
    practiceTask: "Implement an action type named 'edit_first_item' which updates the value of indexes directly using custom parameters.",
    commonMistakes: "Mutating the state object directly inside the reducer. Always return a brand new state object (e.g. return new arrays using spread operator [...prev]) to allow React to check differences and update elements.",
    interviewQuestion: "What are the core parameters of a standard Reducer function and what makes them functional pure?",
    miniQuiz: {
      question: "What is the primary role of a dispatch function returned by useReducer?",
      options: [
        "It downloads external state packages over network protocols",
        "It sends structured actions to the reducer, designating how the state should transition",
        "It parses HTML structures into JSON payloads",
        "It speeds up state allocations using memory pointers"
      ],
      answerIndex: 1,
      explanation: "Calling dispatch sends an action payload into the reducer. The reducer recalculates the state and informs React to paint the adjustments."
    }
  },
  {
    id: "zustand",
    title: "Global State with Zustand",
    level: "Advanced",
    description: "Deploy ultra-lightweight global state stores without the verbose boilerplate of Redux.",
    estimate: "18 mins",
    explanation: "Zustand is a modern, fast, and simple global state management library. It uses hook-based stores to bundle state slices and methods without Provider nesting. It runs outside of the standard React render phase and selectively triggers updates ONLY on components directly listening to changed variables.",
    syntax: "import { create } from 'zustand';\nconst useStore = create((set) => ({ ... }));",
    code: `// Simulating Zustand store structure inside React
import { useState } from 'react';

// Real Zustand definition looks like:
// import { create } from 'zustand';
// export const useDocProgressStore = create((set) => ({
//   completed: [],
//   markCompleted: (id) => set((s) => ({ completed: [...s.completed, id] }))
// }));

// Simulating custom Zustand logic layout
export function useStorePreview() {
  const [completed, setCompleted] = useState<string[]>([]);
  const toggle = (id: string) => {
    setCompleted(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };
  return { completed, toggle };
}`,
    outputExplanation: "Creates a lightweight custom global tracker simulation layer matching Zustand's state patterns.",
    practiceTask: "Add a method to clear the entire completed list with a single click call.",
    commonMistakes: "Selecting entire store objects instead of fine-grained selectors (e.g., const {x} = useStore() instead of const x = useStore(state => state.x)). Failing to use selectors causes components to re-render in response to edits inside any unrelated properties of the global store.",
    interviewQuestion: "How does Zustand achieve better performance metrics compared to classic React Context API?",
    miniQuiz: {
      question: "Which pattern does Zustand rely upon to pass state down the component hierarchies?",
      options: [
        "It nests the entire DOM inside high-weight Provider trees",
        "It uses lightweight custom hook selectors that components can import anywhere, completely bypassing Providers",
        "It writes data to static text files inside public directories",
        "It compiles JSX layers manually during builds"
      ],
      answerIndex: 1,
      explanation: "Zustand operates completely outside of Providers. It exposes standard react hooks that interface directly with its internal store state."
    }
  },
  {
    id: "performance-optimization",
    title: "Performance (useMemo & useCallback)",
    level: "Advanced",
    description: "Acquire full command of render frames using memoization, function locks, and computation cache stores.",
    estimate: "20 mins",
    explanation: "Every time a React component state changes, it re-executes code line-by-line. If that component runs high-weight mathematical algorithms or re-creates callback functions linked to memoized sub-elements, it triggers major lag points. useMemo caches expensive values, while useCallback preserves exact reference pointers to callbacks.",
    syntax: "const cachedValue = useMemo(() => computeValue(a), [a]);\nconst memoCallback = useCallback(() => print(b), [b]);",
    code: `import { useState, useMemo, useCallback } from 'react';

export default function PerformanceDashboard() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<string[]>(["useEffect Guide", "Zustand Store", "React Reconciliation", "Custom Hooks API"]);

  // 1. Memoize filtered computation - updates only when search or item dependencies adapt
  const filteredList = useMemo(() => {
    console.log("Heavy list filtering operation executed...");
    return items.filter(item => item.toLowerCase().includes(search.toLowerCase()));
  }, [items, search]);

  // 2. Lock component callback reference pointer 
  const triggerExport = useCallback(() => {
    console.log("Triggered callbacks data payload export:", filteredList);
  }, [filteredList]);

  return (
    <div className="border border-black p-4 bg-[#fcfcfc] font-mono text-xs">
      <input 
        type="text" 
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Filter list records..."
        className="border border-black p-2 w-full text-xs font-sans placeholder-gray-400 focus:outline-none mb-3"
      />
      <div className="space-y-1 mb-3">
        {filteredList.map((item, id) => <div key={id} className="p-1 border border-neutral-200">{item}</div>)}
      </div>
      <button onClick={triggerExport} className="bg-black hover:bg-neutral-800 text-white px-2 py-1 font-bold">EXPORT DATA</button>
    </div>
  );
}`,
    outputExplanation: "Produces a search system with computation protection guards. Calculations remain cached unless parameters are adjusted.",
    practiceTask: "Implement an button to append elements to the original list and verify that the memo gets correctly recalculated.",
    commonMistakes: "Using useMemo or useCallback for simple lightweight operations (like standard string joins). Optimization hooks add internal execution tracking overhead, meaning utilizing them on fast, cheap actions actually slows down start execution speeds.",
    interviewQuestion: "What is reference security/equality in javascript, and how does it relate to React.memo wrapper components?",
    miniQuiz: {
      question: "When should you use the useCallback hook in your React development tasks?",
      options: [
        "On every function defined inside standard screens",
        "To fetch JSON databases over external secure paths",
        "When passing callbacks to optimized children components that rely on reference equality to prevent unwanted visual cycles",
        "When setting state arrays in local storage keys"
      ],
      answerIndex: 2,
      explanation: "useCallback maintains constant callback reference pointers. When passed down as props to children components wrapped in React.memo, it avoids unnecessary child rerenders."
    }
  }
];
