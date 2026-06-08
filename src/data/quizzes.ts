import { QuizQuestion } from "../types";

export const quizzesData: QuizQuestion[] = [
  {
    id: "q1-react-vdom",
    topic: "1. Introduction & JSX",
    question: "What is the primary architectural function of the React Virtual DOM?",
    options: [
      "To compile static CSS templates directly into browser rendering layers",
      "To maintain a lightweight in-memory representation of the UI and surgically diff updates, minimizing expensive real DOM writes",
      "To bypass JavaScript execution and force browsers to direct rendering on the GPU",
      "To store user settings across browser restarts inside cloud Firestore nodes"
    ],
    answerIndex: 1,
    explanation: "React maintains a replica of the real DOM in memory called the Virtual DOM. When state changes, React diffs the old virtual tree with a new one and calculates the minimal set of operations to perform on the real browser DOM, which heavily optimizes screen performance."
  },
  {
    id: "q2-component-types",
    topic: "2. Functional vs Class Components",
    question: "Which of the following describes a key advantage of Functional Components over ES6 Class Components?",
    options: [
      "Functional components compile down to slower, sandbox-heavy code loops",
      "Functional components completely eliminate the constructor overhead and the complex scoping binds of the 'this' keyword",
      "Class components are the only models allowed to declare internal states",
      "Functional components force developers to define XML properties in separate files"
    ],
    answerIndex: 1,
    explanation: "ES6 Class components require boilerplate constructor patterns and explicit binding of methods because of the dynamic scopes of the JavaScript 'this' context. Functional components with hooks are simpler, cleaner, and optimize better during compilation build steps."
  },
  {
    id: "q3-data-flow",
    topic: "3. Props, PropTypes, & Prop Drilling",
    question: "What does the term 'Prop Drilling' mean in a React component architecture?",
    options: [
      "Automatically compiling HTML tags down to server-side databases",
      "Passing read-only prop values down through multiple intermediate nesting levels that don't need the data, solely to reach a deep child",
      "Injecting dynamic style parameters into layout cards via CSS Grid classes",
      "Editing package dependencies dynamically inside the developer console"
    ],
    answerIndex: 1,
    explanation: "Prop Drilling is the process of thread-passing props through several layers of descendant components simply to deliver them to a nested child. It can be resolved by using the React Context API or external state managers like Redux."
  },
  {
    id: "q4-state-binding",
    topic: "4. State & One-Way Data Binding",
    question: "How does one-way (unidirectional) data binding function inside a React app?",
    options: [
      "Inputs update state directly, and state updates inputs in a circular thread, causing infinite render cascades",
      "Data strictly flows downward from parent to child via props, and client changes must be explicitly propagated back via events/callbacks",
      "Page components can only communicate with other components via external servers",
      "CSS is forbidden from overriding custom HTML layout models"
    ],
    answerIndex: 1,
    explanation: "React features unidirectional data flow: parent state flows down to children as read-only props. To modify parent state from a child, the parent must pass down a callback function that the child triggers on events, preserving predictable data tracking."
  },
  {
    id: "q5-lists-keys",
    topic: "5. Conditional Rendering & Lists",
    question: "Why does React require a unique 'key' prop when rendering lists of elements dynamically?",
    options: [
      "To provide the parent container with background styles matching standard layout grids",
      "To compile elements into server-side databases automatically",
      "To help React identify which items have changed, been added, or been removed, optimizing Virtual DOM reconciliation",
      "To lock input elements from being updated by standard user actions"
    ],
    answerIndex: 2,
    explanation: "During the Virtual DOM diffing process (reconciliation), unique keys allow React to identify which components are persistent or replaced. This prevents React from tearing down and recreating entire list elements when only one item's position changes."
  },
  {
    id: "q6-forms-controlled",
    topic: "6. React Forms & Controlled Inputs",
    question: "What is a 'Controlled Component' when implementing forms in React?",
    options: [
      "A component controlled exclusively by external Redux store modules",
      "A form element whose value is driven by React state, with updates handled via synchronous onChange callbacks",
      "A layout element protected behind security auth gateways inside routers",
      "A button that disables itself after a single click event"
    ],
    answerIndex: 1,
    explanation: "A controlled component is a form element (like an input) whose visible value is bound to React state. When the user types, an event handler updates State, which in turn feeds the updated value back to the input, making React the single source of truth."
  },
  {
    id: "q7-hooks-effect",
    topic: "7. React Hooks & Lifecycles",
    question: "Which of the following dependencies array configurations simulates a classical 'componentDidMount' using modern useEffect hooks?",
    options: [
      "Omitting the dependency array entirely: useEffect(() => {})",
      "Providing an empty dependency array: useEffect(() => {}, [])",
      "Configuring local boolean indicators inside arrays: useEffect(() => {}, [true])",
      "Providing the component name itself inside the array context"
    ],
    answerIndex: 1,
    explanation: "An empty dependency array `[]` tells React that the effect does not rely on any reactive state or prop variables. Consequently, the effect executes exactly once when the component initially mounts, resembling the behavior of 'componentDidMount'."
  },
  {
    id: "q8-context-api",
    topic: "8. Context API & Uplifting State",
    question: "What does the React Context API resolve in large component trees?",
    options: [
      "It compiles raw JavaScript expressions directly to visual SVG charts",
      "It bypasses the react-router-dom library during route changes",
      "It provides a mechanism to share global states across deeply nested components without passing props down manually via prop drilling",
      "It blocks unauthorized guest users from viewing active sidebar tabs"
    ],
    answerIndex: 2,
    explanation: "Context API provides a way to pass data down the component tree without needing to manually drill props through every intermediate child. A Provider wraps ancestor nodes, and any descendant can consume the context using the useContext hook."
  },
  {
    id: "q9-custom-hooks",
    topic: "9. Custom Hook Architecture",
    question: "Which rule is mandatory when designing and naming Custom React Hooks?",
    options: [
      "They must be named starting with the lowercase prefix 'use'",
      "They can only be called inside standard classical constructors",
      "They are required to return a JSX layout element or fragment",
      "They must be declared inside separate external stylesheets"
    ],
    answerIndex: 0,
    explanation: "Custom Hooks must start with the keyword 'use' (e.g., useLocalStorage, useFetch). This prefix signals to compiler linters that the function follows the Rules of Hooks, authorizing it to consume other Hooks internally."
  },
  {
    id: "q10-state-redux",
    topic: "10. State Management & Redux",
    question: "How do Reducers, Actions, and Store operate inside a standard Redux transaction cycle?",
    options: [
      "Actions update the Store directly, which then calls Reducers to design layout files",
      "Components dispatch standard declarative Actions, which Reducers process to generate a new immutable State inside the global Store",
      "Reducers dispatch Stores to trigger actions in client layouts",
      "The global store is bypassable by executing direct write commands inside HTML attributes"
    ],
    answerIndex: 1,
    explanation: "Redux has a strict unidirectional data flow: components notify of intent by dispatching an Action (an object describing what happened). The Store sends this to a pure Reducer function, which computes the brand new state immutably and notifies subscribers."
  },
  {
    id: "q11-performance",
    topic: "11. Performance & Memoization",
    question: "When should a developer wrap a calculation inside the 'useMemo' hook?",
    options: [
      "For lightweight, simple mathematical additions on every single render cycle",
      "When cache-saving the results of computationally expensive of heavy loops depending on stable inputs to prevent redundant recalculation",
      "To load background image files asynchronously into image cards",
      "To force components to bypass standard security routing checks"
    ],
    answerIndex: 1,
    explanation: "useMemo should be reserved for expensive calculations (e.g., parsing large datasets, sorting arrays) where recalculating on every single render would bottleneck performance. It stores the calculated value, only recomputing if dependencies change."
  },
  {
    id: "q12-routing",
    topic: "12. Client-Side Routing",
    question: "Why should developers prefer the '<Link>' component from React Router over standard HTML anchor '<a>' tags for navigation?",
    options: [
      "Link components compile styles faster than standard anchor declarations",
      "Link intercepts the click event, prevents standard browser page reload behaviors, and carries out in-memory routes, preserving state",
      "Anchor tags are strictly prohibited inside responsive Tailwind structures",
      "Link components automatically connect client profiles to Firestore databases"
    ],
    answerIndex: 1,
    explanation: "Standard anchor <a> tags trigger a complete browser reload, wiping the clean memory state of the SPA. The React Router '<Link>' component overrides this default, pushing a history rewrite locally and shifting views instantly without dropping state."
  }
];
