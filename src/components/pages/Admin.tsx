import React, { useState } from "react";
import { 
  Plus, Edit2, Trash2, ShieldAlert, Sparkles, AlertCircle, Save, CheckCircle, 
  HelpCircle, GraduationCap, Zap, Award, Eye, RefreshCw, LayoutGrid,
  Lock, Unlock, ArrowRight, LogOut, Code, Database, Radio, Check, Layers, Cpu
} from "lucide-react";
import { Lesson, QuizQuestion, Snippet, Project } from "../../types";
import { lessonsData } from "../../data/lessons";
import { quizzesData } from "../../data/quizzes";
import { snippetsData } from "../../data/snippets";
import { projectsData } from "../../data/projects";

type AdminProps = {
  user: any;
  loadingAuth: boolean;
  loginWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
  dbLessons: Lesson[];
  dbQuizzes: QuizQuestion[];
  dbSnippets: Snippet[];
  dbProjects: Project[];
  saveLesson: (l: Lesson) => Promise<void>;
  deleteLesson: (id: string) => Promise<void>;
  saveQuiz: (q: QuizQuestion) => Promise<void>;
  deleteQuiz: (id: string) => Promise<void>;
  saveSnippet: (s: Snippet) => Promise<void>;
  deleteSnippet: (id: string) => Promise<void>;
  saveProject: (p: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  
  // Local standard mock states as fallbacks if not true logged in admin:
  localLessons: Lesson[];
  localQuizzes: QuizQuestion[];
  localSnippets: Snippet[];
  localProjects: Project[];
  setLocalLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
  setLocalQuizzes: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
  setLocalSnippets: React.Dispatch<React.SetStateAction<Snippet[]>>;
  setLocalProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};

export default function Admin({
  user,
  loadingAuth,
  loginWithGoogle,
  logout,
  dbLessons,
  dbQuizzes,
  dbSnippets,
  dbProjects,
  saveLesson,
  deleteLesson,
  saveQuiz,
  deleteQuiz,
  saveSnippet,
  deleteSnippet,
  saveProject,
  deleteProject,
  localLessons,
  localQuizzes,
  localSnippets,
  localProjects,
  setLocalLessons,
  setLocalQuizzes,
  setLocalSnippets,
  setLocalProjects
}: AdminProps) {

  // Current entity we are managing (Lessons, Quizzes, Snippets, Projects)
  const [activeSection, setActiveSection] = useState<"lessons" | "quizzes" | "snippets" | "projects" | "analytics">("lessons");

  const isOfficialAdmin = user?.email === "chy.bijay.890@gmail.com";

  // Auth/Demo simulation toggle state:
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    return localStorage.getItem("reactplay_demo_admin") === "true" || !isOfficialAdmin;
  });

  // Global message prompts:
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [sqlTabOpen, setSqlTabOpen] = useState<boolean>(false);
  const [copiedSchema, setCopiedSchema] = useState<boolean>(false);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ----------------- FORM STATES -----------------
  
  // Lesson Form
  const [lessonForm, setLessonForm] = useState<Partial<Lesson>>({
    id: "", title: "", level: "Beginner", description: "", explanation: "", estimate: "10 mins", syntax: "", code: "", outputExplanation: "", practiceTask: "", commonMistakes: "", interviewQuestion: "",
    miniQuiz: { question: "", options: ["", "", "", ""], answerIndex: 0, explanation: "" }
  });

  // Quiz Form
  const [quizForm, setQuizForm] = useState<Partial<QuizQuestion>>({
    id: "", question: "", options: ["", "", "", ""], answerIndex: 0, explanation: "", topic: "CSS Layouts Quiz"
  });

  // Snippet Form
  const [snippetForm, setSnippetForm] = useState<Partial<Snippet>>({
    id: "", title: "", difficulty: "Beginner", description: "", category: "Cards", code: ""
  });

  // Project Form
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    id: "", title: "", level: "Beginner", description: "", features: [], starterCode: "", finalChallenge: ""
  });

  const [featuresInput, setFeaturesInput] = useState<string>("");

  // Determine actual items arrays (Merged DB + Local context)
  const actualLessons = isDemoMode ? localLessons : dbLessons;
  const actualQuizzes = isDemoMode ? localQuizzes : dbQuizzes;
  const actualSnippets = isDemoMode ? localSnippets : dbSnippets;
  const actualProjects = isDemoMode ? localProjects : dbProjects;

  const actualItems = 
    activeSection === "lessons" ? actualLessons :
    activeSection === "quizzes" ? actualQuizzes :
    activeSection === "snippets" ? actualSnippets :
    activeSection === "projects" ? actualProjects :
    [];

  const handleToggleDemoMode = () => {
    const next = !isDemoMode;
    if (next === false && !isOfficialAdmin) {
      showToast("Cannot disable Demo Mode: Not logged into official admin account 'chy.bijay.890@gmail.com'. Write access disabled.", "error");
      return;
    }
    setIsDemoMode(next);
    localStorage.setItem("reactplay_demo_admin", next ? "true" : "false");
    showToast(`Switched storage workspace output to ${next ? "Local Override fallback" : "Remote Live Firestore"}!`);
  };

  // Save Lesson Handler
  const handleSaveLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonForm.id || !lessonForm.title || !lessonForm.explanation) {
      showToast("Please provide Lesson ID, Title, and main Explanation parameters.", "error");
      return;
    }

    const payload: Lesson = {
      id: lessonForm.id.trim(),
      title: lessonForm.title.trim(),
      level: lessonForm.level || "Beginner",
      description: lessonForm.description?.trim() || "",
      explanation: lessonForm.explanation.trim(),
      estimate: lessonForm.estimate || "10 mins",
      syntax: lessonForm.syntax?.trim() || "",
      code: lessonForm.code?.trim() || "",
      outputExplanation: lessonForm.outputExplanation?.trim() || "",
      practiceTask: lessonForm.practiceTask?.trim() || "",
      commonMistakes: lessonForm.commonMistakes?.trim() || "",
      interviewQuestion: lessonForm.interviewQuestion?.trim() || "",
      miniQuiz: {
        question: lessonForm.miniQuiz?.question?.trim() || "What is a main benefit of this framework?",
        options: lessonForm.miniQuiz?.options?.map(o => o.trim()) || ["Opt A", "Opt B", "Opt C", "Opt D"],
        answerIndex: Number(lessonForm.miniQuiz?.answerIndex ?? 0),
        explanation: lessonForm.miniQuiz?.explanation?.trim() || "Matches target component configurations."
      }
    };

    if (isDemoMode) {
      // Locally update
      setLocalLessons(prev => {
        const next = prev.filter(l => l.id !== payload.id);
        const updated = [...next, payload];
        localStorage.setItem("reactplay_custom_lessons", JSON.stringify(updated));
        return updated;
      });
      showToast(`Saved lesson "${payload.title}" in Local Lab storage!`);
    } else {
      try {
        await saveLesson(payload);
        showToast(`Successfully published "${payload.title}" to cloud Firestore!`);
      } catch (err) {
        showToast("Database denied. Missing or insufficient permissions on cloud nodes.", "error");
      }
    }
    // Clear Form
    setLessonForm({
      id: "", title: "", level: "Beginner", description: "", explanation: "", estimate: "10 mins", syntax: "", code: "", outputExplanation: "", practiceTask: "", commonMistakes: "", interviewQuestion: "",
      miniQuiz: { question: "", options: ["", "", "", ""], answerIndex: 0, explanation: "" }
    });
  };

  // Delete Lesson Handler
  const handleDeleteLesson = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete lesson "${name}"?`)) return;
    if (isDemoMode) {
      setLocalLessons(prev => {
        const next = prev.filter(l => l.id !== id);
        localStorage.setItem("reactplay_custom_lessons", JSON.stringify(next));
        return next;
      });
      showToast(`Removed lesson "${name}" locally.`);
    } else {
      try {
        await deleteLesson(id);
        showToast(`Deleted lesson "${name}" in Firestore.`);
      } catch (e) {
        showToast("Access Denied on cloud database delete.", "error");
      }
    }
  };

  // Save Quiz Handler
  const handleSaveQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizForm.id || !quizForm.question || !quizForm.topic) {
      showToast("Please supply the ID, Topic, and core Question text.", "error");
      return;
    }

    const payload: QuizQuestion = {
      id: quizForm.id.trim(),
      question: quizForm.question.trim(),
      options: quizForm.options?.map(o => o.trim()) || ["Yes", "No", "Maybe", "Refuses"],
      answerIndex: Number(quizForm.answerIndex ?? 0),
      explanation: quizForm.explanation?.trim() || "",
      topic: quizForm.topic.trim()
    };

    if (isDemoMode) {
      setLocalQuizzes(prev => {
        const next = prev.filter(q => q.id !== payload.id);
        const updated = [...next, payload];
        localStorage.setItem("reactplay_custom_quizzes", JSON.stringify(updated));
        return updated;
      });
      showToast(`Saved quiz item successfully inside local states.`);
    } else {
      try {
        await saveQuiz(payload);
        showToast(`Uploaded quiz question to Firebase.`);
      } catch (e) {
        showToast("Firestore access denied. Verify authentication conditions.", "error");
      }
    }

    setQuizForm({ id: "", question: "", options: ["", "", "", ""], answerIndex: 0, explanation: "", topic: "CSS Layouts Quiz" });
  };

  // Delete Quiz
  const handleDeleteQuiz = async (id: string, name: string) => {
    if (!window.confirm(`Confirm deleting quiz index with ID: "${id}"?`)) return;
    if (isDemoMode) {
      setLocalQuizzes(prev => {
        const next = prev.filter(q => q.id !== id);
        localStorage.setItem("reactplay_custom_quizzes", JSON.stringify(next));
        return next;
      });
      showToast("Deleted quiz item locally.");
    } else {
      try {
        await deleteQuiz(id);
        showToast("Remote quiz deleted.");
      } catch (e) {
        showToast("Database rejected requested delete.", "error");
      }
    }
  };

  // Save Snippet
  const handleSaveSnippet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!snippetForm.id || !snippetForm.title || !snippetForm.code) {
      showToast("Needs ID, Title, and complete code syntax body.", "error");
      return;
    }

    const payload: Snippet = {
      id: snippetForm.id.trim(),
      title: snippetForm.title.trim(),
      difficulty: snippetForm.difficulty || "Beginner",
      description: snippetForm.description?.trim() || "",
      category: snippetForm.category || "Cards",
      code: snippetForm.code.trim()
    };

    if (isDemoMode) {
      setLocalSnippets(prev => {
        const next = prev.filter(s => s.id !== payload.id);
        const updated = [...next, payload];
        localStorage.setItem("reactplay_custom_snippets", JSON.stringify(updated));
        return updated;
      });
      showToast("Snippet updated inside local playground scopes.");
    } else {
      try {
        await saveSnippet(payload);
        showToast("Successfully written snippet to cloud firestore.");
      } catch (e) {
        showToast("Refused write operation on live server database.", "error");
      }
    }

    setSnippetForm({ id: "", title: "", difficulty: "Beginner", description: "", category: "Cards", code: "" });
  };

  // Delete Snippet
  const handleDeleteSnippet = async (id: string, name: string) => {
    if (!window.confirm(`Delete snippet "${name}"?`)) return;
    if (isDemoMode) {
      setLocalSnippets(prev => {
        const next = prev.filter(s => s.id !== id);
        localStorage.setItem("reactplay_custom_snippets", JSON.stringify(next));
        return next;
      });
      showToast("Deleted snippet.");
    } else {
      try {
        await deleteSnippet(id);
        showToast("Deleted snippet.");
      } catch (e) {
        showToast("Unauthorized.", "error");
      }
    }
  };

  // Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.id || !projectForm.title || !projectForm.description) {
      showToast("Please fill ID, Title, and Description fields.", "error");
      return;
    }

    const featuresList = featuresInput
      .split("\n")
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const payload: Project = {
      id: projectForm.id.trim(),
      title: projectForm.title.trim(),
      level: projectForm.level || "Beginner",
      description: projectForm.description.trim(),
      features: featuresList,
      requiredConcepts: projectForm.requiredConcepts && projectForm.requiredConcepts.length > 0
        ? projectForm.requiredConcepts 
        : ["CSS Grid", "Tailwind Layouts", "Responsive Design"],
      starterCode: projectForm.starterCode?.trim() || "",
      finalChallenge: projectForm.finalChallenge?.trim() || ""
    };

    if (isDemoMode) {
      setLocalProjects(prev => {
        const next = prev.filter(p => p.id !== payload.id);
        const updated = [...next, payload];
        localStorage.setItem("reactplay_custom_projects", JSON.stringify(updated));
        return updated;
      });
      showToast(`Saved challenge: "${payload.title}" locally.`);
    } else {
      try {
        await saveProject(payload);
        showToast(`Saved challenge to live cluster node database!`);
      } catch (e) {
        showToast("Database rejected write operations.", "error");
      }
    }

    setProjectForm({ id: "", title: "", level: "Beginner", description: "", features: [], starterCode: "", finalChallenge: "" });
    setFeaturesInput("");
  };

  // Delete Project
  const handleDeleteProject = async (id: string, name: string) => {
    if (!window.confirm(`Delete project Challenge: "${name}"?`)) return;
    if (isDemoMode) {
      setLocalProjects(prev => {
        const next = prev.filter(p => p.id !== id);
        localStorage.setItem("reactplay_custom_projects", JSON.stringify(next));
        return next;
      });
      showToast("Deleted challenge locally.");
    } else {
      try {
        await deleteProject(id);
        showToast("Deleted remote challenge node.");
      } catch (e) {
        showToast("Access Denied.", "error");
      }
    }
  };

  // --- REVOLUTIONARY PIPELINE SEEDER FOR GEEKSFORGEEKS ROADMAP ---
  const [seedingLoading, setSeedingLoading] = useState<boolean>(false);
  const [seedingProgress, setSeedingProgress] = useState<string>("");

  const handleBulkSeedGFGReactSyllabus = async () => {
    if (!window.confirm("Initialize Bulk Seeder? This triggers parallel database transactions writing the GeeksforGeeks React Learning Syllabus.")) return;
    setSeedingLoading(true);
    setSeedingProgress("Initializing database seeds...");
    try {
      // 1. Lessons hydration with subsections
      setSeedingProgress("Synchronizing 12 detailed roadmap lessons with specialized sub-sections...");
      const fullLessonsList = lessonsData.map(lesson => {
        const clone = { ...lesson };
        // Assign subsections based on lesson topic:
        if (clone.id === "react-intro-jsx") {
          // Already defined statically inside lessonsData.
        } else if (clone.id === "functional-components" && !clone.subsections) {
          clone.subsections = [
            {
              title: "Functional Components Primitives v/s Class Layouts",
              content: "Functional components are plain JavaScript functions accepting props as arguments and returning JSX. Unlike legacy ES6 Class components, they don't require constructor scaffolding, super(props) handshakes, or manual 'this' scoping binds.",
              exampleCode: `// Classical legacy ES6 Class component configuration:
class WelcomeClass extends React.Component {
  render() {
    return <h1>Passed: {this.props.title}</h1>;
  }
}

// Modern Functional representation:
export function WelcomeFunctional({ title }) {
  return <h1>Passed: {title}</h1>;
}`,
              exampleExplanation: "Functional styles eliminate constructor overhead entirely, enabling better JavaScript build compilation and minification."
            },
            {
              title: "Component Lifecycles & Lifespans",
              content: "Class components rely on explicit system methods (componentDidMount, componentDidUpdate, componentWillUnmount) to coordinate tasks. Modern Functional components unify these events cleanly beneath the useEffect Hook.",
              exampleCode: `// Typical lifecycle mapping inside a functional component:
React.useEffect(() => {
  console.log("Component mounted (replaces componentDidMount)");
  return () => console.log("Component unmounting (replaces componentWillUnmount)");
}, []);`,
              exampleExplanation: "Consolidating asynchronous listeners into a cleanup function returned inside useEffect ensures we avoid memory leaks on element unmounts."
            },
            {
              title: "Pure Components and Rendering Optimizations",
              content: "PureComponent checks prop and state modifications using shallow comparisons to block unnecessary updates. For functional components, we achieve identical protection by wrapping nodes within React.memo().",
              exampleCode: `export const MemoCard = React.memo(function GridCard({ item }) {
  return <div className="border p-4 bg-zinc-900 text-white">{item.label}</div>;
});`,
              exampleExplanation: "React.memo stops elements from re-evaluating when parent components state updates as long as the passed prop reference address remains unchanged."
            }
          ];
        } else if (clone.id === "props-reusability" && !clone.subsections) {
          clone.subsections = [
            {
              title: "Dynamic Props & Objects Destructuring",
              content: "Props are read-only immutable parameters passed from parent nodes downstream. Destructuring props in function parameter signatures provides clean variable targets.",
              exampleCode: `function UserPanel({ name, rank, permissions }) {
  return (
    <div className="border border-black p-4 bg-neutral-100">
      <h3>User: {name}</h3>
      <span className="text-[10px] bg-yellow-350 font-black">Rank: {rank}</span>
    </div>
  );
}`,
              exampleExplanation: "Destructuring replaces repeating 'props.name' or 'props.rank' in UI layouts, making blocks easy to understand."
            },
            {
              title: "PropTypes and Static Types Verification",
              content: "PropTypes validates input parameters at runtime, printing console errors during developments if sibling variables drift from requirements.",
              exampleCode: `import PropTypes from 'prop-types';

function RatingBadge({ stars, label }) {
  return <span>{label || 'Score'}: {stars}/5</span>;
}

RatingBadge.propTypes = {
  stars: PropTypes.number.isRequired,
  label: PropTypes.string
};`,
              exampleExplanation: "Validates inputs at runtime (e.g., throwing a warning if stars is passed a string instead of a strict integer value)."
            },
            {
              title: "Navigating Prop Drilling through Nested Layouts",
              content: "Prop drilling is the process of manually threading parameters down through multiple placeholder children that do not concern themselves with the data, solely to reach deeply nested leafs.",
              exampleCode: `// Rigid configuration model:
function App() { return <Layout user="Bijay" />; }
function Layout({ user }) { return <Sidebar user={user} />; }
function Sidebar({ user }) { return <WelcomeWidget user={user} />; }`,
              exampleExplanation: "Creates highly brittle modules. Can be resolved cleanly by deploying Context Providers or state managers like Redux."
            }
          ];
        } else if (clone.id === "react-state-cycles" && !clone.subsections) {
          clone.subsections = [
            {
              title: "Central State Managers and useState hook",
              content: "State refers to the private, mutable, dynamic parameters scoped locally inside any component. Invoking updates schedules frame alterations cleanly.",
              exampleCode: `const [gridTheme, setGridTheme] = React.useState("charcoal");
// Setting state triggers a component re-render:
<button onClick={() => setGridTheme("brutal")}>Apply brutalist style</button>`,
              exampleExplanation: "State change schedules component visual updates, comparing output nodes seamlessly with previous elements."
            },
            {
              title: "One-Way Dynamic Data Binding (Data Decoupling)",
              content: "In React, data strictly descends downstream. Changes made to parent systems flow down as props. To alter ancestor parameters inside a daughter node, parents must explicitly pass event callbacks down.",
              exampleCode: `function ParentNode() {
  const [index, setIndex] = React.useState(0);
  return <ChildWidget value={index} onAdjust={setIndex} />;
}`,
              exampleExplanation: "Preserves predictable architecture, making it easy to identify where mutations are scheduled and track down state bugs."
            },
            {
              title: "Asynchronous Update Batching and State Reducers",
              content: "React queues multiple state set-actions in the same callback block into a single batch to avoid multiple visual flashes. To fetch updated state immediately, invoke functional states instead.",
              exampleCode: `// Functional setState reads the dynamic, buffered variable:
setCount(prev => prev + 1);
setCount(prev => prev + 1);`,
              exampleExplanation: "Ensures atomic mathematical increments run accurately even when dispatched multiple times in rapid succession."
            }
          ];
        } else if (clone.id === "conditional-rendering-lists" && !clone.subsections) {
          clone.subsections = [
            {
              title: "Branching: Logical Operators && and Ternaries",
              content: "Ternary expressions help choose between two alternative visual pipelines, while logical double ampersand filters represent simple toggle paths.",
              exampleCode: `return (
  <div>
    {isOnline ? <p>● Matrix Status Stable</p> : <p>○ System Disconnected</p>}
    {alertText && <div className="p-2 bg-red-100 border text-red-600">{alertText}</div>}
  </div>
);`,
              exampleExplanation: "Short-circuits rendering if conditions resolve falsy. Ternaries represent dynamic inline branching."
            },
            {
              title: "Mapping Arrays dynamically via Keys",
              content: "Iterating lists of elements dynamically requires assigning stable, unique keys. React reconcilers correlate keys to virtual cells to recycle DOM nodes safely.",
              exampleCode: `const links = [{ id: "l1", text: "Home" }, { id: "l2", text: "Profile" }];
return (
  <ul>
    {links.map((lnk) => <li key={lnk.id} className="underline">{lnk.text}</li>)}
  </ul>
);`,
              exampleExplanation: "Avoids using unstable array indices as keys. Keys should be unique, persistent, and non-random."
            }
          ];
        } else if (clone.id === "forms-controlled-inputs" && !clone.subsections) {
          clone.subsections = [
            {
              title: "Controlled elements v/s Uncontrolled Refs",
              content: "Controlled elements link input values directly to active state. In contrast, uncontrolled elements query input values on demand via useRef without triggering re-renders on keystrokes.",
              exampleCode: `// Controlled input:
<input value={text} onChange={e => setText(e.target.value)} />

// Uncontrolled input:
const textRef = React.useRef<HTMLInputElement>(null);
const printValue = () => console.log(textRef.current?.value);`,
              exampleExplanation: "Controlled states empower dynamic validation feedback on every single keypress, while refs excel in lightweight form inputs."
            },
            {
              title: "Multi-Input Form States with Computed Object Keys",
              content: "Instead of declaring duplicate useState hooks for every form field, you can consolidate form entries into a single object, updating modified keys dynamically.",
              exampleCode: `const [form, setForm] = React.useState({ username: '', email: '', choice: 'guest' });

const handleInput = (e) => {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
};`,
              exampleExplanation: "Dynamic bracket syntax matches form input names directly with states object properties."
            }
          ];
        } else if (clone.id === "hooks-useeffect" && !clone.subsections) {
          clone.subsections = [
            {
              title: "Rules of Hooks & call stack bounds",
              content: "Hooks must only be executed at the topmost level of React function components. You cannot call hooks inside standard JavaScript loops, conditional blocks, or nested closures.",
              exampleCode: `// ❌ FORBIDDEN:
// if (logged) useEffect(() => {}, []);

// ✅ CORRECT:
useEffect(() => { if (logged) { /* do action */ } }, [logged]);`,
              exampleExplanation: "Keeps hooks initialization order identical on every single frame, allowing React to retrieve matching local variables correctly."
            },
            {
              title: "Mastering useEffect Dependency Arrays",
              content: "The dependency array dictates when the effect execution runs again. Empty arrays [] mount once, omitting variables triggers execution on every render, while adding variables triggers only on value drift matches.",
              exampleCode: "useEffect(() => { fetchUser(id); }, [id]); // Triggers when user ID value updates",
              exampleExplanation: "Prevents infinite loops or stale data closures by specifying exact, primitive reactive variables."
            }
          ];
        } else if (clone.id === "context-api-uplifting" && !clone.subsections) {
          clone.subsections = [
            {
              title: "Lifting State Up logically to Shared Parents",
              content: "When separate components need to match similar local datasets, we lift their internal states up to their closest common ancestor, passing setters back as props.",
              exampleCode: `function Parent() {
  const [shared, setShared] = useState(0);
  return (<><SiblingA val={shared} /><SiblingB onSet={setShared} /></>);
}`,
              exampleExplanation: "Ensures there is one source of truth while propagating updates instantly to all related cells in synchronous order."
            },
            {
              title: "Context Providers & useContext Consumption Hook",
              content: "The Context API allows you to declare global states at the root provider node. Any deep child can trigger useContext consuming parameters instantly without prop drilling.",
              exampleCode: `const ThemeCtx = React.createContext('light');
const activeTheme = React.useContext(ThemeCtx);`,
              exampleExplanation: "Dramatically cuts file clutter. Bypasses intermediate layers completely, enabling scalable state delivery."
            }
          ];
        } else if (clone.id === "architecting-custom-hooks" && !clone.subsections) {
          clone.subsections = [
            {
              title: "Encapsulating Async API requests into Custom Hooks",
              content: "Custom Hooks extract component logic into reusable utility functions. By prefixing functions with the keyword 'use', we unlock standard nested hooks.",
              exampleCode: `function useFetch(url) {
  const [data, setData] = useState(null);
  useEffect(() => { fetch(url).then(r => r.json()).then(setData); }, [url]);
  return data;
}`,
              exampleExplanation: "Simplifies UI visualizers. Any number of separate screens can import useFetch to execute isolated requests."
            }
          ];
        } else if (clone.id === "usereducer-state-machine" && !clone.subsections) {
          clone.subsections = [
            {
              title: "Designing Solid Finite State Machines via useReducer",
              content: "For complex state changes with multi-conditional branches, useReducer manages transitions cleanly. Actions specify intent, while reducers compute pure immutable updates.",
              exampleCode: `function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    default: return state;
  }
}`,
              exampleExplanation: "Decouples behavioral operations from visual grids. Simplifies composing, tracing, and automated testing."
            }
          ];
        } else if (clone.id === "performance-memoization" && !clone.subsections) {
          clone.subsections = [
            {
              title: "Shielding recalculations with useMemo & useCallback",
              content: "useMemo caches computational outcomes, while useCallback caches function declarations, preserving structural reference equality across render loops.",
              exampleCode: `const heavyValue = useMemo(() => solveEquations(dataset), [dataset]);
const dispatchLog = useCallback(() => console.log(heavyValue), [heavyValue]);`,
              exampleExplanation: "Stops children from re-rendering due to fresh function instantiation on every parent refresh cycle."
            }
          ];
        } else if (clone.id === "protected-auth-routes" && !clone.subsections) {
          clone.subsections = [
            {
              title: "Configuring client-side route paths & parameterized keys",
              content: "Single-Page routers capture browser path adjustments, rendering components in-memory without contacting server endpoints for index transfers.",
              exampleCode: `import { BrowserRouter, Route, useParams } from 'react-router-dom';
function UserDetails() { const { uid } = useParams(); return <h3>User ID: {uid}</h3>; }`,
              exampleExplanation: "Configures clean, bookmarkable nested links. useParams dynamic segments."
            }
          ];
        }
        return clone;
      });

      for (const lesson of fullLessonsList) {
        if (isDemoMode) {
          setLocalLessons(prev => {
            const list = prev.filter(l => l.id !== lesson.id);
            const updated = [...list, lesson];
            localStorage.setItem("reactplay_custom_lessons", JSON.stringify(updated));
            return updated;
          });
        } else {
          await saveLesson(lesson);
        }
      }

      // 2. Quizzes
      setSeedingProgress("Synchronizing 12 interactive quiz trivia sets...");
      for (const quiz of quizzesData) {
        if (isDemoMode) {
          setLocalQuizzes(prev => {
            const list = prev.filter(q => q.id !== quiz.id);
            const updated = [...list, quiz];
            localStorage.setItem("reactplay_custom_quizzes", JSON.stringify(updated));
            return updated;
          });
        } else {
          await saveQuiz(quiz);
        }
      }

      // 3. Snippets
      setSeedingProgress("Synchronizing reusable React boilerplate snippets...");
      for (const snippet of snippetsData) {
        if (isDemoMode) {
          setLocalSnippets(prev => {
            const list = prev.filter(s => s.id !== snippet.id);
            const updated = [...list, snippet];
            localStorage.setItem("reactplay_custom_snippets", JSON.stringify(updated));
            return updated;
          });
        } else {
          await saveSnippet(snippet);
        }
      }

      // 4. Projects
      setSeedingProgress("Synchronizing 16 enterprise-grade React portfolio challenges...");
      for (const project of projectsData) {
        if (isDemoMode) {
          setLocalProjects(prev => {
            const list = prev.filter(p => p.id !== project.id);
            const updated = [...list, project];
            localStorage.setItem("reactplay_custom_projects", JSON.stringify(updated));
            return updated;
          });
        } else {
          await saveProject(project);
        }
      }

      setSeedingProgress("Pristine React mastery roadmap synchronization completed!");
      showToast("SEEDED GEEKSFORGEEKS ROADMAP SUCCESSFULLY!");
    } catch (err) {
      console.error(err);
      showToast("Seeding failed because database limits were exceeded.", "error");
    } finally {
      setSeedingLoading(false);
      setTimeout(() => setSeedingProgress(""), 6000);
    }
  };

  // Load Preset Template Helper
  const loadPreset = (type: "lessons" | "quizzes" | "snippets" | "projects", presetType: 'css-flex' | 'css-bento' | 'snippet-card' | 'quiz-layouts') => {
    if (type === 'lessons') {
      setLessonForm({
        id: "css-flexbox-advanced",
        title: "Advanced CSS Flexbox Space Math",
        level: "Intermediate",
        description: "Study how browser space math determines exact alignments using custom Tailwind offsets.",
        estimate: "15 mins",
        explanation: "Flexbox structures align complex modular panels across vertical and horizontal planes automatically. Master space distribution parameters.",
        syntax: "justify-content: space-between; align-items: stretch; gap: 0.5rem;",
        code: `export default function FlexGrowLab() {
  return (
    <div className="flex bg-neutral-900 border-4 border-black p-4 gap-2">
      <div className="flex-1 bg-yellow-300 p-2 text-black font-mono font-bold text-center">FLEX: 1</div>
      <div className="flex-2 bg-[#00FF00] p-2 text-black font-mono font-bold text-center">FLEX: 2</div>
    </div>
  );
}`,
        outputExplanation: "Produces an asymmetric horizontal flow card displaying two nested units dividing accessible screen space proportionally.",
        practiceTask: "Add a third sibling with flex-3 and notice how the container adjusts its cells dynamically.",
        commonMistakes: "Declaring hard min-widths on elements which prevents natural boundaries recalculation on screen size changes.",
        interviewQuestion: "How do margins automatic offsets (margin-left: auto) affect standard flex align calculations?",
        miniQuiz: {
          question: "What happens to elements when setting the container property 'align-items' to 'stretch'?",
          options: [
            "Children are smashed to 0 width",
            "Children stretch to fit direct container height when not overriding height attributes",
            "Forces absolute text wraps on each word",
            "Launches external background calculations"
          ],
          answerIndex: 1,
          explanation: "The 'stretch' alignment stretches item cross dimensions fully to occupy the vertical cross axis."
        }
      });
      showToast("Loaded advanced flex lesson preset!");
    } else if (type === 'quizzes') {
      setQuizForm({
        id: "css-layouts-advanced",
        question: "Which layout directive splits parent dimensions simultaneously into rows AND columns in standard styling?",
        options: [
          "display: grid;",
          "display: flex-rows;",
          "position: relative-mesh;",
          "column-layout: auto 2;"
        ],
        answerIndex: 0,
        explanation: "Unlike one-dimensional CSS Flexbox, Grid is 2-dimensional because it enables template parameters horizontally and vertically at once.",
        topic: "CSS Layouts Quiz"
      });
      showToast("Loaded CSS Grid quiz preset!");
    } else if (type === 'snippets') {
      setSnippetForm({
        id: "css-custom-accordion",
        title: "Neo-Brutalist Accordion List",
        difficulty: "Intermediate",
        description: "Elegant accordion rows using state management that expand with snappy transitions.",
        category: "Forms",
        code: `import React, { useState } from 'react';

export default function AccordionRow() {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-4 border-black bg-white max-w-sm font-mono text-black">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center bg-yellow-300 p-4 font-black border-b-4 border-black active:translate-y-0.5"
      >
        <span>ACCORDION HEADER</span>
        <span className="text-lg font-black">{open ? "[-]" : "[+]"}</span>
      </button>
      {open && (
        <div className="p-4 text-xs font-semibold leading-relaxed border-b border-black">
          Accordion contents reveal snap transitions with zero bloating stylesheets.
        </div>
      )}
    </div>
  );
}`
      });
      showToast("Loaded Accordion Row snippet preset!");
    } else if (type === 'projects') {
      setProjectForm({
        id: "bento-dashboard-lab",
        title: "Neo-Classic Bento Operations Terminal",
        level: "Advanced",
        description: "Compose an advanced dashboard combining flexible header charts, asymmetric system monitor cards, and detailed historical tables in CSS.",
        features: [
          "Bento grids wrapping charts cleanly",
          "Snappy active status indicator lights",
          "Custom scrolling tabular reports styled with contrasting dark frames"
        ],
        starterCode: `import React from 'react';

export default function BentoTerminal() {
  return (
    <div className="p-6 bg-stone-50 min-h-[400px] border-4 border-black text-black font-mono">
      <h2 className="text-xl font-black mb-4">SYSTEM TERMINAL [ACTIVE]</h2>
      {/* Build asymmetric bento cells below... */}
    </div>
  );
}`,
        finalChallenge: "Support custom dark-mode toggle states directly in local component scopes using custom bento card backgrounds."
      });
      setFeaturesInput("Bento grids wrapping charts cleanly\nSnappy active status indicator lights\nCustom scrolling tabular reports styled with contrasting dark frames");
      showToast("Loaded Bento Terminal project preset!");
    }
  };

  // ---------------- PART 1: SECURE ADMIN GATEWAY SCREEN ----------------
  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-neutral-50 text-black font-mono flex flex-col items-center justify-center p-6 border-4 border-black">
        <div className="border-4 border-black bg-yellow-300 p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center max-w-md w-full">
          <RefreshCw className="mx-auto mb-4 animate-spin stroke-[2.5]" size={40} />
          <h2 className="font-black text-lg uppercase tracking-wider">SYNCING CRYPT_KEY...</h2>
          <p className="text-xs text-neutral-800 font-bold mt-2">Checking Google Firebase Auth Claims.</p>
        </div>
      </div>
    );
  }

  if (!isOfficialAdmin) {
    return (
      <div className="min-h-screen bg-stone-100 text-black font-mono py-16 px-4 flex flex-col items-center justify-center">
        <div className="border-4 border-black bg-white p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xl w-full space-y-8">
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-red-400 p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Lock size={44} className="stroke-[2.5] text-white" />
            </div>
            <h1 className="font-black text-3xl tracking-tighter uppercase text-black">
              RESTRICTED CONSOLE
            </h1>
            <div className="h-1 w-full bg-black"></div>
            <p className="text-xs text-neutral-800 font-black tracking-wide uppercase bg-neutral-100 border-2 border-black inline-block px-3 py-1">
              Level 4 Area Authentication Required
            </p>
          </div>

          <p className="text-xs leading-relaxed text-neutral-600 font-semibold text-center">
            This dashboard grants direct <span className="font-extrabold text-black">Cloud Firestore CRUD write-access</span> to the site syllabus, quiz lab catalog, project templates, and interactive widgets. Modifications propagate instantly to all users’ frontends.
          </p>

          <div className="bg-yellow-300 border-3 border-black p-4 space-y-2 text-center text-xs font-bold leading-relaxed shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <ShieldAlert size={18} className="inline mr-1" />
            <span>Seeded Administrator Account:</span>
            <code className="bg-white block border border-black px-2 py-1 mt-1 font-black text-purple-800">
              chy.bijay.890@gmail.com
            </code>
          </div>

          {user ? (
            <div className="border-3 border-red-400 bg-red-50 p-4 rounded-0 space-y-4">
              <p className="text-xs text-red-700 font-bold text-center">
                ACCESS REFUSED: Account <strong>{user.email}</strong> is not authenticated as the seed administrator.
              </p>
              <button 
                onClick={logout}
                className="w-full bg-black text-[#00FF00] hover:bg-neutral-800 border-3 border-black font-black uppercase text-xs py-3 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
              >
                DISCONNECT & RELOGIN
              </button>
            </div>
          ) : (
            <button 
              onClick={loginWithGoogle}
              className="w-full bg-[#00FF00] hover:bg-black hover:text-[#00FF00] text-black border-3 border-black font-black uppercase text-xs py-3.5 transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Unlock size={14} className="stroke-[3]" />
              <span>AUTHENTICATE VIA CLOUD OAUTH</span>
            </button>
          )}

        </div>
      </div>
    );
  }

  // ---------------- PART 2: DUSTY NEON ADMIN CONTROL CABIN ----------------
  return (
    <div className="min-h-screen text-black font-mono bg-stone-100 flex flex-col md:flex-row border-t-3 border-black">
      
      {/* Toast alert system */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono text-xs font-black ${
          toastMessage.type === "success" ? "bg-[#00FF00] text-black" : "bg-red-400 text-white"
        }`}>
          <CheckCircle size={15} />
          <span>{toastMessage.text.toUpperCase()}</span>
        </div>
      )}

      {/* --- SIDEBAR PANEL (Dynamic routes endpoint controller) --- */}
      <aside className="w-full md:w-80 shrink-0 bg-zinc-950 text-stone-200 border-r-4 border-black p-6 flex flex-col justify-between space-y-8">
        
        <div className="space-y-6">
          {/* Sidebar Brand header */}
          <div className="border-b-4 border-stone-800 pb-5">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="text-[#00FF00] animate-pulse" size={24} />
              <div className="inline-flex items-center space-x-1.5 bg-[#00FF00] text-black font-black text-[9px] px-2 py-0.5 border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                <Radio size={10} className="animate-ping" />
                <span>ONLINE</span>
              </div>
            </div>
            <h1 className="font-display font-black text-xl tracking-tighter text-white uppercase">
              REACTPLAY BACKEND
            </h1>
            <p className="text-[10px] text-stone-400 font-bold uppercase mt-1">
              Continuous Pipeline Console
            </p>
          </div>

          {/* Connected Dynamic Schema Mapping badge */}
          <div className="p-3 bg-zinc-900 border border-stone-800 text-[10px] space-y-1.5 font-sans">
            <span className="text-[#00FF00] font-black tracking-widest text-[8px] uppercase block">
              📡 ACTIVE DATA PIPELINE
            </span>
            <p className="text-stone-300 text-[11px] leading-relaxed font-bold">
              Overwriting records instantly hydrates respective frontend client navigation tabs!
            </p>
          </div>

          {/* Navigation / Endpoints Directory Section */}
          <div className="space-y-3">
            <span className="text-[9px] font-black tracking-wider text-stone-500 uppercase block">
              MANAGE DATABASE COLLECTIONS
            </span>
            
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveSection("lessons")}
                className={`w-full text-left px-3.5 py-2.5 font-bold text-xs uppercase flex items-center justify-between transition-all group border-2 ${
                  activeSection === "lessons" 
                  ? "bg-[#00FF00] text-black font-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]" 
                  : "bg-zinc-900 text-stone-400 hover:text-white border-stone-800 hover:border-stone-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} className={`stroke-[2.5] ${activeSection === 'lessons' ? 'text-black' : 'text-stone-500'}`} />
                  <span>Roadmap / Docs</span>
                </div>
                <span className={`text-[9px] font-black px-1.5 py-0.5 border ${
                  activeSection === 'lessons' ? 'bg-black text-[#00FF00] border-black' : 'bg-zinc-800 text-stone-400 border-stone-700'
                }`}>
                  {dbLessons.length + lessonsData.length}
                </span>
              </button>

              <button 
                onClick={() => setActiveSection("quizzes")}
                className={`w-full text-left px-3.5 py-2.5 font-bold text-xs uppercase flex items-center justify-between transition-all group border-2 ${
                  activeSection === "quizzes" 
                  ? "bg-[#00FF00] text-black font-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]" 
                  : "bg-zinc-900 text-stone-400 hover:text-white border-stone-800 hover:border-stone-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award size={16} className={`stroke-[2.5] ${activeSection === 'quizzes' ? 'text-black' : 'text-stone-500'}`} />
                  <span>Quiz Lab</span>
                </div>
                <span className={`text-[9px] font-black px-1.5 py-0.5 border ${
                  activeSection === 'quizzes' ? 'bg-black text-[#00FF00] border-black' : 'bg-zinc-800 text-stone-400 border-stone-700'
                }`}>
                  {dbQuizzes.length + quizzesData.length}
                </span>
              </button>

              <button 
                onClick={() => setActiveSection("snippets")}
                className={`w-full text-left px-3.5 py-2.5 font-bold text-xs uppercase flex items-center justify-between transition-all group border-2 ${
                  activeSection === "snippets" 
                  ? "bg-[#00FF00] text-black font-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]" 
                  : "bg-zinc-900 text-stone-400 hover:text-white border-stone-800 hover:border-stone-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Zap size={16} className={`stroke-[2.5] ${activeSection === 'snippets' ? 'text-black' : 'text-stone-500'}`} />
                  <span>Snippets</span>
                </div>
                <span className={`text-[9px] font-black px-1.5 py-0.5 border ${
                  activeSection === 'snippets' ? 'bg-black text-[#00FF00] border-black' : 'bg-zinc-800 text-stone-400 border-stone-700'
                }`}>
                  {dbSnippets.length + snippetsData.length}
                </span>
              </button>

              <button 
                onClick={() => setActiveSection("projects")}
                className={`w-full text-left px-3.5 py-2.5 font-bold text-xs uppercase flex items-center justify-between transition-all group border-2 ${
                  activeSection === "projects" 
                  ? "bg-[#00FF00] text-black font-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]" 
                  : "bg-zinc-900 text-stone-400 hover:text-white border-stone-800 hover:border-stone-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers size={16} className={`stroke-[2.5] ${activeSection === 'projects' ? 'text-black' : 'text-stone-500'}`} />
                  <span>Projects</span>
                </div>
                <span className={`text-[9px] font-black px-1.5 py-0.5 border ${
                  activeSection === 'projects' ? 'bg-black text-[#00FF00] border-black' : 'bg-zinc-800 text-stone-400 border-stone-700'
                }`}>
                  {dbProjects.length + projectsData.length}
                </span>
              </button>

              <button 
                onClick={() => setActiveSection("analytics")}
                className={`w-full text-left px-3.5 py-2.5 font-bold text-xs uppercase flex items-center justify-between transition-all group border-2 ${
                  activeSection === "analytics" 
                  ? "bg-[#00FF00] text-black font-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]" 
                  : "bg-zinc-900 text-stone-400 hover:text-white border-stone-800 hover:border-stone-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Database size={16} className={`stroke-[2.5] ${activeSection === 'analytics' ? 'text-black' : 'text-stone-500'}`} />
                  <span>Pipeline Flow</span>
                </div>
                <span className="text-[8px] font-black px-1.5 py-0.5 bg-[#00FF00] text-black">
                  LIVE
                </span>
              </button>
            </nav>
          </div>

        </div>

        {/* User profile details at footer of sidebar */}
        <div className="border-t-2 border-stone-800 pt-5 space-y-4">
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                className="h-10 w-10 border-2 border-white bg-zinc-800" 
                alt="Admin avatar" 
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-10 w-10 bg-yellow-300 border-2 border-black flex items-center justify-center text-black font-black">
                A
              </div>
            )}
            <div className="truncate">
              <p className="text-xs font-black text-white shrink truncate max-w-[170px] uppercase">
                {user.displayName || "Seeded Owner"}
              </p>
              <p className="text-[10px] text-stone-500 font-bold shrink truncate max-w-[170px]">
                {user.email}
              </p>
            </div>
          </div>

          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-1.5 bg-red-500 hover:bg-black hover:text-red-500 border-2 border-black text-black font-black text-xs uppercase py-2 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-none"
          >
            <LogOut size={13} className="stroke-[3]" />
            <span>EXIT ADMIN WORKSPACE</span>
          </button>
        </div>

      </aside>

      {/* --- CONTENT WORKSPACE --- */}
      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto max-h-screen">
        
        {/* --- HEADER --- */}
        <header className="border-4 border-black bg-[#9333ea]/15 p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-yellow-300 border-2 border-black text-black px-2 py-0.5 font-bold text-[9px] uppercase tracking-wide">
                AUTHENTICATED ADMIN SESSION
              </span>
            </div>
            <h2 className="font-display font-black text-3xl tracking-tight uppercase">
              {activeSection === "lessons" ? "docs roadmap syllabus editor" :
               activeSection === "quizzes" ? "quiz lab question database" :
               activeSection === "snippets" ? "reusable code snippets ledger" :
               activeSection === "projects" ? "project blueprint challenges" :
               "dynamic middleware pipeline visualization"}
            </h2>
            <p className="text-[11px] text-neutral-700 font-bold">
              Real-time synchronization with client interface. Writes propagate within 1sec.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Storage Workspace simulation toggle state helper */}
            <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
              <div>
                <span className="text-[8px] font-black text-neutral-400 block tracking-widest uppercase">WRITE MODE</span>
                <span className="font-black text-[11px] text-black uppercase">
                  {isDemoMode ? "📝 FALLBACK (LOCAL STORAGE)" : "🔥 CLOUD LIVE (FIRESTORE)"}
                </span>
              </div>
              <button 
                onClick={handleToggleDemoMode}
                className="bg-yellow-300 hover:bg-black hover:text-yellow-300 border-2 border-black px-2 py-1 text-[9px] font-black uppercase transition-all cursor-pointer"
              >
                SWITCH
              </button>
            </div>
          </div>
        </header>

        {/* --- ANALYTICS / VISUAL FLOW PATHS DIAGRAM TAB --- */}
        {activeSection === "analytics" && (
          <div className="space-y-8 animate-fade-in text-xs">
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-sm font-black uppercase border-b-2 border-black pb-2 mb-4 flex items-center gap-1.5 text-black">
                <Database size={16} />
                <span>Backend Dynamic hydration flow chart</span>
              </h3>
              
              <p className="font-semibold text-neutral-600 mb-6 leading-relaxed">
                The visual roadmap below demonstrates how database values seeded in this terminal successfully hydrate the front-facing user navigation menus. Under guest sandbox modes, localStorage overrides are applied dynamically for safety.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                
                {/* Visual block 1: Backend */}
                <div className="border-4 border-black bg-purple-50 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-10">
                  <div className="bg-purple-600 border-2 border-black p-1.5 text-white text-center font-black text-[9px] uppercase tracking-wider mb-3">
                    step 1: admin entry
                  </div>
                  <h4 className="font-black text-xs text-black border-b border-black pb-1 uppercase">Cloud Console</h4>
                  <p className="text-[10px] text-neutral-600 font-bold leading-normal mt-2">
                    Admin authenticates and edits database collections inside the secure match rule container.
                  </p>
                </div>

                {/* Visual block 2: Firestore Node */}
                <div className="border-4 border-black bg-[#00FF00]/10 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-10">
                  <div className="bg-[#00FF00] border-2 border-black p-1.5 text-black text-center font-black text-[9px] uppercase tracking-wider mb-3">
                    step 2: Cloud Firestore
                  </div>
                  <h4 className="font-black text-xs text-black border-b border-black pb-1 uppercase">Persistent Store</h4>
                  <p className="text-[10px] text-neutral-600 font-bold leading-normal mt-2">
                    Firebase distributes secure packets. Live listeners push the updated lists to active tabs.
                  </p>
                </div>

                {/* Visual block 3: Merge Engine */}
                <div className="border-4 border-black bg-yellow-100 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-10">
                  <div className="bg-yellow-300 border-2 border-black p-1.5 text-black text-center font-black text-[9px] uppercase tracking-wider mb-3">
                    step 3: Merge engine
                  </div>
                  <h4 className="font-black text-xs text-black border-b border-black pb-1 uppercase">Deduplication</h4>
                  <p className="text-[10px] text-neutral-600 font-bold leading-normal mt-2">
                    Core client resolves static JSON files, custom localStorage sandboxes, and clouds into a unified list.
                  </p>
                </div>

                {/* Visual block 4: Dynamic Frontend Render */}
                <div className="border-4 border-black bg-blue-50 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-10">
                  <div className="bg-blue-500 border-2 border-black p-1.5 text-white text-center font-black text-[9px] uppercase tracking-wider mb-3">
                    step 4: client render
                  </div>
                  <h4 className="font-black text-xs text-black border-b border-black pb-1 uppercase">Client Route tabs</h4>
                  <p className="text-[10px] text-neutral-600 font-bold leading-normal mt-2">
                    Interactive components list updated cards, projects, or quizzes with high-contrast UI feedback.
                  </p>
                </div>

              </div>

              {/* Matrix Ledger Stats Section */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4 border-t-2 border-black pt-6">
                <div className="border-2 border-black p-3 text-center bg-stone-50">
                  <span className="text-[9px] text-neutral-500 block uppercase font-black">active roadmap</span>
                  <p className="text-[14px] font-black">{dbLessons.length + lessonsData.length} Lessons Available</p>
                </div>
                <div className="border-2 border-black p-3 text-center bg-stone-50">
                  <span className="text-[9px] text-neutral-500 block uppercase font-black">quiz bank</span>
                  <p className="text-[14px] font-black">{dbQuizzes.length + quizzesData.length} In-house Questions</p>
                </div>
                <div className="border-2 border-black p-3 text-center bg-stone-50">
                  <span className="text-[9px] text-neutral-500 block uppercase font-black">reusable snippets</span>
                  <p className="text-[14px] font-black">{dbSnippets.length + snippetsData.length} React Sandboxes</p>
                </div>
                <div className="border-2 border-black p-3 text-center bg-stone-50">
                  <span className="text-[9px] text-neutral-500 block uppercase font-black">projects database</span>
                  <p className="text-[14px] font-black">{dbProjects.length + projectsData.length} Layout Challenges</p>
                </div>
              </div>

            </div>

            {/* Verification of Frontend Synchronization */}
            <div className="border-4 border-black bg-stone-900 text-stone-300 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-white text-sm font-black uppercase tracking-tight mb-2 flex items-center gap-2">
                <Radio className="text-[#00FF00] stroke-[2.5]" size={16} />
                <span>DYNAMIC SYNCHRONIZED ROUTE PIPELINES</span>
              </h3>
              <p className="text-[11px] leading-relaxed mb-4 text-stone-400">
                Any additions made inside the roadmap, quiz, projects, or snippets editor instantly synchronize with the respective tab modules. To review live results, switch between editing options on the sidebar, add an item, and navigate back to the student panel.
              </p>
              
              <div className="space-y-2 font-mono text-[10px]">
                <div className="flex justify-between items-center bg-zinc-950 p-2 border border-stone-800">
                  <span className="text-white font-extrabold text-[11px]">📂 SYLLABUS DOCUMENTATION ROUTE (Collection API: "lessons")</span>
                  <span className="text-[#00FF00]">CONNECTED ➔ (LEARN & DOCS INTERFACE)</span>
                </div>
                <div className="flex justify-between items-center bg-zinc-950 p-2 border border-stone-800">
                  <span className="text-white font-extrabold text-[11px]">📁 INTERACTIVE EVALUATION LABS (Collection API: "quizzes")</span>
                  <span className="text-[#00FF00]">CONNECTED ➔ (QUIZ LABS SCREEN)</span>
                </div>
                <div className="flex justify-between items-center bg-zinc-950 p-2 border border-stone-800">
                  <span className="text-white font-extrabold text-[11px]">📂 MINIATURE COMPOSITIONS CODEBOOK (Collection API: "snippets")</span>
                  <span className="text-[#00FF00]">CONNECTED ➔ (SNIPPETS PLAYGROUND)</span>
                </div>
                <div className="flex justify-between items-center bg-zinc-950 p-2 border border-stone-800">
                  <span className="text-white font-extrabold text-[11px]">📁 SECURE LANDMARKS REGISTRY (Collection API: "projects")</span>
                  <span className="text-[#00FF00]">CONNECTED ➔ (PROJECTS & CHALLENGES PAGE)</span>
                </div>
              </div>
            </div>

            {/* Curricula Seeder Command Panel */}
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase text-black flex items-center gap-1.5">
                  <Zap className="text-purple-600 animate-pulse stroke-[3]" size={17} />
                  <span>GeeksforGeeks Curricula Seeder Studio</span>
                </h3>
                <p className="text-xs text-neutral-600 font-bold leading-relaxed">
                  Hydrate 12 comprehensive React development lessons (equipped with syntax panels, PITFALLS warnings, senior interviews, and custom Markdown subsections), 12 timed trivia evaluators, and 16 portfolio projects starter briefs directly to your selected {isDemoMode ? "Local Workspace" : "Live Firestore Cloud"}.
                </p>

                {seedingProgress && (
                  <div className="border-2 border-black bg-purple-50 p-3 flex items-center gap-2 font-mono text-[9px] font-black text-purple-800 uppercase animate-pulse">
                    <RefreshCw size={11} className="animate-spin" />
                    <span>{seedingProgress}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t-2 border-dashed border-neutral-300">
                <button
                  type="button"
                  disabled={seedingLoading}
                  onClick={handleBulkSeedGFGReactSyllabus}
                  className="w-full bg-[#9333ea] border-3 border-black text-white hover:bg-black hover:text-[#00FF00] px-4 py-3 text-xs font-black uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none block tracking-wider text-center cursor-pointer disabled:opacity-40"
                >
                  {seedingLoading ? "TRANSACTING GfG PIPELINES..." : "⚡ BULK SEED GEEKSFORGEEKS ROADMAP"}
                </button>
              </div>
            </div>
            
          </div>
        )}

        {/* --- MAIN CRUD WORKSPACES FOR MANAGEMENT --- */}
        {activeSection !== "analytics" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* LEFT COLUMN: THE INTUITIVE ADD/EDIT EDITOR COMPOSITION BOX */}
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
              
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <div className="flex items-center gap-2">
                  <Plus className="stroke-[3] text-[#9333ea]" size={20} />
                  <h3 className="font-extrabold text-sm uppercase tracking-tight text-black">
                    database entity creator
                  </h3>
                </div>
                
                <button 
                  type="button"
                  onClick={() => loadPreset(activeSection, "css-flex")}
                  className="bg-zinc-900 border-2 border-black text-white px-2.5 py-1 text-[9px] font-black uppercase transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(147,51,234,1)] active:translate-y-0.5 hover:bg-neutral-800 flex items-center gap-1"
                >
                  <Sparkles size={11} className="text-yellow-300" />
                  <span>LOAD TEMPLATE PRESET</span>
                </button>
              </div>

              {/* 1. LESSON EDITOR FORM COMPONENTS */}
              {activeSection === "lessons" && (
                <form onSubmit={handleSaveLesson} className="space-y-4 text-xs font-bold">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">LESSON ID (UNIQUE & ALPHANUMERIC)</label>
                      <input 
                        type="text" 
                        value={lessonForm.id} 
                        onChange={e => setLessonForm({...lessonForm, id: e.target.value})}
                        className="w-full border-2 border-black p-2 bg-neutral-50 focus:bg-white text-xs font-bold" 
                        placeholder="e.g. css-grids-advanced"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">CURRICULUM LEVEL</label>
                      <select 
                        value={lessonForm.level} 
                        onChange={e => setLessonForm({...lessonForm, level: e.target.value as any})}
                        className="w-full border-2 border-black p-2 bg-neutral-50 focus:bg-white text-xs font-bold"
                      >
                        <option value="Beginner">Beginner Docs</option>
                        <option value="Intermediate">Intermediate Lab</option>
                        <option value="Advanced">Advanced Blueprint</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-500 mb-1">LESSON TITLE</label>
                    <input 
                      type="text" 
                      value={lessonForm.title} 
                      onChange={e => setLessonForm({...lessonForm, title: e.target.value})}
                      className="w-full border-2 border-black p-2 bg-neutral-50 focus:bg-white text-xs font-bold animate-fade-in" 
                      placeholder="e.g. Mastering Grid Mesh Layouts"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">METRIC ESTIMATE TIME</label>
                      <input 
                        type="text" 
                        value={lessonForm.estimate} 
                        onChange={e => setLessonForm({...lessonForm, estimate: e.target.value})}
                        className="w-full border-2 border-black p-2 bg-neutral-50 text-xs font-bold" 
                        placeholder="e.g. 15 mins"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">CORE COMMAND / KEYWORD SYNTAX</label>
                      <input 
                        type="text" 
                        value={lessonForm.syntax} 
                        onChange={e => setLessonForm({...lessonForm, syntax: e.target.value})}
                        className="w-full border-2 border-black p-2 bg-neutral-50 text-xs font-bold" 
                        placeholder="e.g. display: grid;"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-500 mb-1">SHORT BRIEF (SHOWN ON ROADMAP CARD)</label>
                    <textarea 
                      value={lessonForm.description} 
                      onChange={e => setLessonForm({...lessonForm, description: e.target.value})}
                      rows={2} 
                      className="w-full border-2 border-black p-2 bg-neutral-50 text-xs font-bold"
                      placeholder="Short summarizing catchphrase..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-500 mb-1">Syllabus Main Content Explanation Details (supports markdown)</label>
                    <textarea 
                      value={lessonForm.explanation} 
                      onChange={e => setLessonForm({...lessonForm, explanation: e.target.value})}
                      rows={6} 
                      className="w-full border-2 border-black p-2 bg-neutral-50 text-xs font-mono font-semibold"
                      placeholder="Type complete documentation markdown syllabus lessons content..."
                      required
                    />
                  </div>

                  <div className="p-3 border-2 border-dashed border-neutral-300 space-y-3 bg-neutral-50">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-black">
                      Nested Sandbox Lab Sandbox Playground Target
                    </span>
                    <div>
                      <label className="block text-[9px] uppercase text-neutral-500 mb-0.5">PLAYGROUND PRE-FILL PLAYABLE JAVASCRIPT CODE</label>
                      <textarea 
                        value={lessonForm.code} 
                        onChange={e => setLessonForm({...lessonForm, code: e.target.value})}
                        rows={4} 
                        className="w-full border border-black p-2 bg-black text-[#00FF00] text-[10px] font-mono leading-relaxed"
                        placeholder="export default function App() { ... }"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[9px] uppercase text-neutral-500 mb-0.5">EXPLANATION OF EXPECTED RENDER OUTPUT</label>
                        <textarea 
                          value={lessonForm.outputExplanation} 
                          onChange={e => setLessonForm({...lessonForm, outputExplanation: e.target.value})}
                          rows={2} 
                          className="w-full border border-black p-2 bg-white text-[9px] text-zinc-700"
                          placeholder="What the code output visual container does..."
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase text-neutral-500 mb-0.5">ASSIGNED PRACTICE CHALLENGE OBJECTIVE</label>
                        <textarea 
                          value={lessonForm.practiceTask} 
                          onChange={e => setLessonForm({...lessonForm, practiceTask: e.target.value})}
                          rows={2} 
                          className="w-full border border-black p-2 bg-white text-[9px] text-zinc-700"
                          placeholder="Challenge the student to attempt..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border-2 border-neutral-800 space-y-3 bg-neutral-50">
                    <span className="text-[9px] uppercase tracking-wide text-neutral-500 block font-black">
                      Nested Lesson Quick Mini-Quiz Diagnostic Evaluator
                    </span>
                    <div>
                      <label className="block text-[9px] uppercase text-neutral-500 mb-0.5">Mini Question Brief</label>
                      <input 
                        type="text" 
                        value={lessonForm.miniQuiz?.question} 
                        onChange={e => setLessonForm({
                          ...lessonForm, 
                          miniQuiz: { ...lessonForm.miniQuiz!, question: e.target.value }
                        })}
                        className="w-full border border-black p-2 bg-white text-[10px]" 
                        placeholder="What property triggers asymmetrical layouts?"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {lessonForm.miniQuiz?.options?.map((option, idx) => (
                        <div key={idx}>
                          <label className="block text-[8px] uppercase text-neutral-400 mb-0.5">Option #{idx + 1}</label>
                          <input 
                            type="text" 
                            value={option} 
                            onChange={e => {
                              const newOpts = [...(lessonForm.miniQuiz?.options || [])];
                              newOpts[idx] = e.target.value;
                              setLessonForm({
                                ...lessonForm,
                                miniQuiz: { ...lessonForm.miniQuiz!, options: newOpts }
                              });
                            }}
                            className="w-full border border-black p-1.5 bg-white text-[9px]" 
                            placeholder={`Text option #${idx + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[8px] uppercase text-neutral-400 mb-0.5">ZERO-INDEX ANSWER POINTER</label>
                        <select 
                          value={lessonForm.miniQuiz?.answerIndex} 
                          onChange={e => setLessonForm({
                            ...lessonForm,
                            miniQuiz: { ...lessonForm.miniQuiz!, answerIndex: Number(e.target.value) }
                          })}
                          className="w-full border border-black p-1.5 bg-white text-[9px]"
                        >
                          <option value={0}>Option 1 is correct</option>
                          <option value={1}>Option 2 is correct</option>
                          <option value={2}>Option 3 is correct</option>
                          <option value={3}>Option 4 is correct</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[8px] uppercase text-neutral-400 mb-0.5">MINI EXPLANATION</label>
                        <input 
                          type="text" 
                          value={lessonForm.miniQuiz?.explanation} 
                          onChange={e => setLessonForm({
                            ...lessonForm,
                            miniQuiz: { ...lessonForm.miniQuiz!, explanation: e.target.value }
                          })}
                          className="w-full border border-black p-1.5 bg-white text-[9px]" 
                          placeholder="Brief explain matching options answer..."
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#00FF00] hover:bg-black hover:text-[#00FF00] border-3 border-black p-3 text-black font-black uppercase text-xs transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 block tracking-wider"
                  >
                    PUBLISH SYLLABUS LESSON UNIT
                  </button>
                </form>
              )}

              {/* 2. QUIZ QUESTIONS EDITOR */}
              {activeSection === "quizzes" && (
                <form onSubmit={handleSaveQuiz} className="space-y-4 text-xs font-bold animate-fade-in">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">QUESTION ID (ALPHANUMERIC)</label>
                      <input 
                        type="text" 
                        value={quizForm.id} 
                        onChange={e => setQuizForm({...quizForm, id: e.target.value})}
                        className="w-full border-2 border-black p-2 bg-neutral-50 text-xs font-bold focus:bg-white" 
                        placeholder="e.g. layout-grid-01" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">TARGET DIRECTORY (TOPIC)</label>
                      <input 
                        type="text" 
                        value={quizForm.topic} 
                        onChange={e => setQuizForm({...quizForm, topic: e.target.value})}
                        className="w-full border-2 border-black p-2 bg-neutral-50 text-xs font-bold focus:bg-white" 
                        placeholder="e.g. CSS Layouts Quiz" 
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-500 mb-1">DIAGNOSTIC TEST QUESTION TEXT</label>
                    <textarea 
                      value={quizForm.question} 
                      onChange={e => setQuizForm({...quizForm, question: e.target.value})}
                      rows={3} 
                      className="w-full border-2 border-black p-2 bg-neutral-50 text-xs font-mono" 
                      placeholder="e.g. What element-level declaration overrides alignment locally?"
                      required
                    />
                  </div>

                  <div className="p-4 border-2 border-dashed border-neutral-300 space-y-3 bg-stone-50">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-black">
                      Provide Four Test Scenario Answers Below
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {quizForm.options?.map((option, idx) => (
                        <div key={idx}>
                          <label className="block text-[8px] uppercase text-neutral-500 mb-0.5">Choice #{idx + 1}</label>
                          <input 
                            type="text" 
                            value={option} 
                            onChange={e => {
                              const newOpts = [...(quizForm.options || [])];
                              newOpts[idx] = e.target.value;
                              setQuizForm({...quizForm, options: newOpts});
                            }}
                            className="w-full border border-black p-2 bg-white text-[11px]" 
                            placeholder={`Option choice #${idx + 1}`}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">CORRECT ANSWER DETECTOR</label>
                      <select 
                        value={quizForm.answerIndex} 
                        onChange={e => setQuizForm({...quizForm, answerIndex: Number(e.target.value)})}
                        className="w-full border-2 border-black p-2 bg-neutral-50 text-xs font-bold"
                      >
                        <option value={0}>Option 1 is correct</option>
                        <option value={1}>Option 2 is correct</option>
                        <option value={2}>Option 3 is correct</option>
                        <option value={3}>Option 4 is correct</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">DIAGNOSTIC CRITIQUE DESCRIPTION</label>
                      <input 
                        type="text" 
                        value={quizForm.explanation} 
                        onChange={e => setQuizForm({...quizForm, explanation: e.target.value})}
                        className="w-full border-2 border-black p-2 bg-neutral-50 text-xs font-bold" 
                        placeholder="Brief feedback statement..."
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#00FF00] hover:bg-black hover:text-[#00FF00] border-3 border-black p-3 text-black font-black uppercase text-xs transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 block tracking-wider"
                  >
                    DEPLOY QUIZ QUESTION ITEM
                  </button>
                </form>
              )}

              {/* 3. REUSABLE SNIPPET CREATOR FORM */}
              {activeSection === "snippets" && (
                <form onSubmit={handleSaveSnippet} className="space-y-4 text-xs font-bold animate-fade-in">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">ID KEY</label>
                      <input 
                        type="text" 
                        value={snippetForm.id} 
                        onChange={e => setSnippetForm({...snippetForm, id: e.target.value})}
                        className="w-full border-2 border-black p-2 bg-neutral-50 text-xs focus:bg-white" 
                        placeholder="e.g. brutalist-accordion" 
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">CATEGORY INDEX</label>
                      <select 
                        value={snippetForm.category} 
                        onChange={e => setSnippetForm({...snippetForm, category: e.target.value as any})}
                        className="w-full border-2 border-black p-2 bg-neutral-50 text-xs focus:bg-white"
                      >
                        <option value="Buttons">Buttons</option>
                        <option value="Cards">Cards</option>
                        <option value="Navbar">Navbar</option>
                        <option value="Sidebar">Sidebar</option>
                        <option value="Forms">Forms</option>
                        <option value="Modal">Modal</option>
                        <option value="Table">Table</option>
                        <option value="API Fetching">API Fetching</option>
                        <option value="Authentication">Authentication</option>
                        <option value="Protected Route">Protected Route</option>
                        <option value="Dashboard Layout">Dashboard Layout</option>
                      </select>
                    </div>
                    <div className="col-span-1">
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">DIFFICULTY</label>
                      <select 
                        value={snippetForm.difficulty} 
                        onChange={e => setSnippetForm({...snippetForm, difficulty: e.target.value as any})}
                        className="w-full border-2 border-black p-2 bg-neutral-50 text-xs focus:bg-white"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-500 mb-1">SNIPPET SUMMARY LABEL</label>
                    <input 
                      type="text" 
                      value={snippetForm.title} 
                      onChange={e => setSnippetForm({...snippetForm, title: e.target.value})}
                      className="w-full border-2 border-black p-2 bg-neutral-50 text-xs focus:bg-white" 
                      placeholder="e.g. High-Contrast Neo Accordion Panel" 
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-500 mb-1">SYNOPSIS SPEC</label>
                    <textarea 
                      value={snippetForm.description} 
                      onChange={e => setSnippetForm({...snippetForm, description: e.target.value})}
                      rows={2} 
                      className="w-full border-2 border-black p-2 bg-neutral-50 text-xs" 
                      placeholder="Brief component usability brief..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-500 mb-1">REPLICABLE COMPONENT SYNTAX BLOCK</label>
                    <textarea 
                      value={snippetForm.code} 
                      onChange={e => setSnippetForm({...snippetForm, code: e.target.value})}
                      rows={8} 
                      className="w-full border-2 border-black p-2 bg-slate-950 text-[#00FF00] text-[10px] font-mono leading-relaxed" 
                      placeholder="import React from 'react';..." 
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#00FF00] hover:bg-black hover:text-[#00FF00] border-3 border-black p-3 text-black font-black uppercase text-xs transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 block tracking-wider"
                  >
                    APPEND EXCLUSIVE SNIPPET
                  </button>
                </form>
              )}

              {/* 4. PROJECT BLUEPRINT CHALLENGES FORM */}
              {activeSection === "projects" && (
                <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-bold animate-fade-in">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">PROJECT ID KEYS</label>
                      <input 
                        type="text" 
                        value={projectForm.id} 
                        onChange={e => setProjectForm({...projectForm, id: e.target.value})}
                        className="w-full border-2 border-black p-2 bg-neutral-50 text-xs focus:bg-white" 
                        placeholder="e.g. reactive-timer-lab" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-500 mb-1">EXPERIENCE BAND</label>
                      <select 
                        value={projectForm.level} 
                        onChange={e => setProjectForm({...projectForm, level: e.target.value as any})}
                        className="w-full border-2 border-black p-2 bg-neutral-50 text-xs focus:bg-white"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-500 mb-1">PROJECT BLUEPRINT TITLE</label>
                    <input 
                      type="text" 
                      value={projectForm.title} 
                      onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                      className="w-full border-2 border-black p-2 bg-neutral-50 text-xs focus:bg-white" 
                      placeholder="e.g. Reactive Interval Workspace Monitor" 
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-500 mb-1">COMPREHENSIVE OBJECTIVE MISSION BRIEF</label>
                    <textarea 
                      value={projectForm.description} 
                      onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                      rows={2} 
                      className="w-full border-2 border-black p-2 bg-neutral-50 text-xs" 
                      placeholder="Identify user problem statement, design elements, and objectives..." 
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-500 mb-1">SITUATED REQUIREMENTS (LINE SEPARATED; PRESS ENTER FOR EACH VALUE)</label>
                    <textarea 
                      value={featuresInput} 
                      onChange={e => setFeaturesInput(e.target.value)}
                      rows={3} 
                      className="w-full border-2 border-black p-2 bg-neutral-50 text-xs" 
                      placeholder="Add interactive interval trigger button&#10;Track elapsed cycles beautifully"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-500 mb-1">STARTER PACK SCRATCH JAVASCRIPT CODE</label>
                    <textarea 
                      value={projectForm.starterCode} 
                      onChange={e => setProjectForm({...projectForm, starterCode: e.target.value})}
                      rows={5} 
                      className="w-full border-2 border-black p-2 bg-slate-950 text-[#00FF00] text-[10px] font-mono leading-relaxed" 
                      placeholder="import React from 'react';&#15;export default function App() {}"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-500 mb-1">GOLD-STANDARD OUTCOME TEST SPEC (FINAL CHALLENGE)</label>
                    <input 
                      type="text" 
                      value={projectForm.finalChallenge} 
                      onChange={e => setProjectForm({...projectForm, finalChallenge: e.target.value})}
                      className="w-full border-2 border-black p-2 bg-neutral-50 text-xs" 
                      placeholder="Compose dark-mode dynamic style toggle hooks inside limits..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#00FF00] hover:bg-black hover:text-[#00FF00] border-3 border-black p-3 text-black font-black uppercase text-xs transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 block tracking-wider"
                  >
                    REGISTER CHALLENGE BLUEPRINT
                  </button>
                </form>
              )}

            </div>

            {/* RIGHT COLUMN: THE LIVE CATALOG LEDGER SUMMARY BOARD */}
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="border-b-2 border-black pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database size={20} className="text-[#a855f7] stroke-[3]" />
                    <h3 className="font-extrabold text-sm uppercase tracking-tight text-black">
                      dynamic ledger database index
                    </h3>
                  </div>
                  <div className="bg-[#a855f7]/15 font-black text-slate-800 text-[10px] border border-black px-2.5 py-1 uppercase">
                    total mapped: {actualItems.length} records
                  </div>
                </div>

                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {actualItems.length === 0 ? (
                    <div className="border-2 border-dashed border-neutral-300 p-8 text-center text-xs font-black uppercase text-neutral-400 space-y-2 leading-relaxed">
                      <p>Blank ledger portfolio mapped inside dynamic collections.</p>
                      <button 
                        onClick={() => loadPreset(activeSection as any, "css-flex")}
                        className="px-3.5 py-1 text-[9px] bg-yellow-300 border border-black hover:bg-black hover:text-yellow-300 transition-colors uppercase font-black tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                      >
                        Inject advanced setup preset
                      </button>
                    </div>
                  ) : (
                    actualItems.map((item: any, idx: number) => {
                      return (
                        <div 
                          key={item.id || idx}
                          className="border-3 border-black bg-neutral-50 p-3 flex.col items-center justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform"
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <span className="text-[8px] bg-[#9333ea]/10 text-purple-800 border border-black px-1.5 py-0.5 font-black uppercase mr-2 tracking-wide">
                                {item.level || item.difficulty || item.topic || "Default"}
                              </span>
                              <span className="text-[9px] font-black text-black">ID: {item.id}</span>
                              <h4 className="font-extrabold text-xs text-black leading-tight max-w-[280px]">
                                {item.title || item.question || item.id}
                              </h4>
                            </div>
                            
                            <button 
                              type="button"
                              onClick={() => {
                                if (activeSection === "lessons") {
                                  setLessonForm(item);
                                  showToast("Item details copied to editor forms! Write changes when ready.");
                                } else if (activeSection === "quizzes") {
                                  setQuizForm(item);
                                  showToast("Question parameters copied to builder inputs.");
                                } else if (activeSection === "snippets") {
                                  setSnippetForm(item);
                                  showToast("Snippet source loaded inside copy buffers.");
                                } else if (activeSection === "projects") {
                                  setProjectForm(item);
                                  setFeaturesInput(item.features?.join("\n") || "");
                                  showToast("Challenge checklist loaded into builders.");
                                }
                              }}
                              className="bg-white border-2 border-black hover:bg-black hover:text-white p-1 text-[9px] font-bold uppercase transition-colors shrink-0 flex items-center gap-1 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                              title="Edit item parameters"
                            >
                              <Edit2 size={11} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between border-t border-neutral-300 pt-2 mt-2">
                            <span className="text-[9px] text-zinc-500 font-bold max-w-[200px] truncate block">
                              {item.description || item.explanation || item.category || "General sandbox item"}
                            </span>
                            
                            <button 
                              type="button"
                              onClick={() => {
                                if (activeSection === "lessons") {
                                  handleDeleteLesson(item.id, item.title);
                                } else if (activeSection === "quizzes") {
                                  handleDeleteQuiz(item.id, item.question);
                                } else if (activeSection === "snippets") {
                                  handleDeleteSnippet(item.id, item.title);
                                } else if (activeSection === "projects") {
                                  handleDeleteProject(item.id, item.title);
                                }
                              }}
                              className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white px-2 py-0.5 text-[9px] font-black uppercase transition-colors flex items-center gap-1 shadow-[1px_1px_0px_0px_rgba(239,68,68,1)] cursor-pointer"
                            >
                              <Trash2 size={10} />
                              <span>DELETE</span>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="text-[9px] text-neutral-500 font-extrabold uppercase border-t-2 border-black pt-3 mt-4 text-center">
                ReactPlay Cloud Database Sync Cabin
              </div>

            </div>

          </div>
        )}

        {/* Firebase Developer Integration Resource Panel */}
        <div className="mt-12 bg-black text-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-mono">
          <div className="flex items-center justify-between border-b-2 border-neutral-700 pb-4 mb-4 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#00FF00]" size={20} />
              <h3 className="font-extrabold text-sm uppercase text-[#00FF00]">
                FIREBASE CLOUD FIRESTORE INTEGRATION GUIDE
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setSqlTabOpen(!sqlTabOpen)}
              className="text-[10px] bg-neutral-800 hover:bg-[#00FF00] hover:text-black hover:border-white border-2 border-neutral-700 px-3 py-1 font-black uppercase text-center cursor-pointer transition-all active:translate-y-0.2"
            >
              {sqlTabOpen ? "Collapse Details [-]" : "Expand Details [🍀]"}
            </button>
          </div>

          <p className="text-[11px] text-neutral-400 font-semibold mb-4 leading-relaxed">
            The codebase runs natively on top of the secure, authorized <span className="text-white underline">Google Firebase Firestore database engine</span>. 
            Progress tracking synchronization and dynamic content documents are persistent across devices and sessions.
          </p>

          {sqlTabOpen && (
            <div className="space-y-4 animate-fade-in text-xs text-neutral-300">
              <div className="bg-neutral-900 border border-neutral-800 p-4">
                <span className="text-[9px] text-[#00FF00] font-black tracking-widest uppercase block mb-1">
                  SECURITY MATRIX CLAUSE & FIREWALLED MATCHES
                </span>
                <p className="text-[10px] leading-relaxed">
                  Only the verified email authentication matches (`chy.bijay.890@gmail.com`) can bypass document safety nets. Unverified nodes remain strictly denied under standard Zero-Trust conditions inside your `firestore.rules` declaration set.
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-4">
                <span className="text-[9px] text-[#00FF00] font-black tracking-widest uppercase block mb-1">
                  COLLECTION BLUEPRINT MAPPING
                </span>
                <ul className="list-disc pl-4 space-y-1 text-[10px] text-neutral-400 font-bold">
                  <li><span className="text-white">lessons</span>: Document IDs are bound. Stores title, Level, explanation (Markdown), estimates, and mini-quizzes payload.</li>
                  <li><span className="text-white">quizzes</span>: Question directories. Stores title, options lists, answer Indexes, and critiquing blocks.</li>
                  <li><span className="text-white">snippets</span>: Code notebooks. Stores Category alignments, difficulty levels, and full React hooks block.</li>
                  <li><span className="text-white">projects</span>: Situated landmarks. Stores description, core checklist, experience level, and sandbox starters.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </main>

    </div>
  );
}
