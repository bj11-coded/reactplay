import { QuizQuestion } from "../types";

export const quizzesData: QuizQuestion[] = [
  // JSX QUIZ
  {
    id: "jsx-1",
    question: "What is JSX under the hood in React?",
    options: [
      "Pure static HTML that is packaged up inside bundle assets",
      "A syntax extension representing React.createElement() calls that compilations turn into native JS objects",
      "A direct instruction to parse variables utilizing external standard query strings",
      "An alternative dialect of XML exclusively for Webpack engines"
    ],
    answerIndex: 1,
    explanation: "JSX compiles down to nested JS function statements (React.createElement). It creates standard JavaScript objects representing the desired DOM layout.",
    topic: "JSX Quiz"
  },
  {
    id: "jsx-2",
    question: "Why can't custom components be rendered with lowercase first letters in JSX?",
    options: [
      "Because lowercase elements crash browser engines on boot",
      "Because React reserves lowercase strings to identify standard web tags like main, section, or div",
      "Because lowercase parameters take double the compilation times",
      "Capital letters are simply used to make code look clean"
    ],
    answerIndex: 1,
    explanation: "To differentiate standard DOM elements (like <div>, <span>) from custom components (like <WelcomeMessage>), React relies on lowercase vs uppercase identifiers.",
    topic: "JSX Quiz"
  },

  // COMPONENTS QUIZ
  {
    id: "comp-1",
    question: "What is the key criteria of a pure React custom functional component?",
    options: [
      "It must be registered with the browser's CustomElementRegistry",
      "It must be a JavaScript function that starts with a capital letter and returns JSX elements",
      "It should always use absolute position properties for css layouts",
      "It has to be stored inside a serverless cloud instance"
    ],
    answerIndex: 1,
    explanation: "React components are standard JS functions that begin with a capital letter, accepts optional props, and return renderable JSX constructs.",
    topic: "Components Quiz"
  },

  // PROPS QUIZ
  {
    id: "props-1",
    question: "Can a React child component safely modify its own received props object directly?",
    options: [
      "Yes, props operate as standard local variables inside functional scopes",
      "No, props represent immutable, read-only values to uphold predictable single-direction data flows",
      "Only if the parent allows permission triggers inside useEffect parameters",
      "Yes, but only strings are allowed to be replaced"
    ],
    answerIndex: 1,
    explanation: "Props are strictly read-only. Modifying passed parameters directly destroys state predictability, leading to severe visual bugs.",
    topic: "Props Quiz"
  },
  {
    id: "props-2",
    question: "How can deep children components deliver updated information back upwards to parents?",
    options: [
      "By overwriting general browser history stacks",
      "By executing passed down parent callback functions containing argument payloads",
      "By throwing custom HTTP exceptions inside their return scopes",
      "By using global CSS document variables"
    ],
    answerIndex: 1,
    explanation: "Parents can pass down trigger functions as props. When a child executes those callbacks with arguments, the parent captures the call and mutates its own local state values.",
    topic: "Props Quiz"
  },

  // STATE QUIZ
  {
    id: "state-1",
    question: "What happens if you mutate a state variable directly (e.g. user.name = 'Mark') instead of using the designated setter callback?",
    options: [
      "React throws a critical compilation error blocks instantly",
      "Nothing changes inside the variable itself",
      "The value updates in memory, but React misses the action and fails to trigger any visual re-rendering cycles on screens",
      "Browser tabs lock immediately to prevent memory leaks"
    ],
    answerIndex: 2,
    explanation: "Direct assignment side-steps the state dispatcher completely, meaning React remains unaware that a value has changed, leading to a stale UI.",
    topic: "State Quiz"
  },

  // HOOKS QUIZ
  {
    id: "hooks-1",
    question: "What are the two major rules of hooks in React?",
    options: [
      "They must be imported using dynamic import() models and run inside loop branches",
      "Only call hooks at the top level of custom functional components or custom hooks, and never run them inside loops, condition blocks, or nested functions",
      "Hooks must be registered inside package.json files and execute only at dawn",
      "They must return numerical arrays and take null targets"
    ],
    answerIndex: 1,
    explanation: "React relies on the call order of hooks to link state nodes mapped to clean renders. Calling them inside loops or condition blocks disrupts this matching sequence, causing critical system glitches.",
    topic: "Hooks Quiz"
  },
  {
    id: "hooks-2",
    question: "What occurs if you call useEffect and omit the dependency array completely (e.g. useEffect(() => {}))?",
    options: [
      "The layout effect behaves as inactive and is never parsed",
      "The hook functions only when parent routes are updated",
      "The effect executes repeatedly on *EVERY SINGLE* paint render cycle",
      "It behaves exactly the same as providing an empty array []"
    ],
    answerIndex: 2,
    explanation: "An omitted dependency array means React has no triggers to compare against. Thus, it runs the effect callback after every render, which can easily trigger infinite loops.",
    topic: "Hooks Quiz"
  },

  // ROUTING QUIZ
  {
    id: "route-1",
    question: "How does a standard SPA client router work inside browser tabs?",
    options: [
      "By ordering complete page document reloads from servers on every navigation click",
      "By intercepting standard click events, updating the URL bar with window.history, and selectively rendering correct component grids dynamically without reload cycles",
      "By establishing SSH tunnels directly with hosting clouds",
      "By using special hardware-based chip redirection"
    ],
    answerIndex: 1,
    explanation: "Client routers intercept anchor clicks, use the HTML5 History API to alter URL endpoints, and instantly mount/unmount page visual sectors, preserving local component states beautifully.",
    topic: "Routing Quiz"
  },

  // ADVANCED REACT QUIZ
  {
    id: "adv-1",
    question: "When is wrapping a child component inside React.memo beneficial?",
    options: [
      "On every single component defined in the codebase to speed up file paths",
      "When the child component is highly complex, renders frequently with the exact same props arrays, and undergoes heavy paint tasks",
      "Only when compiling styles into inline styles",
      "When using Tailwind CSS class prefixes inside client browsers"
    ],
    answerIndex: 1,
    explanation: "React.memo caches visual outputs. It should be used selectively when components are heavy and regularly suffer unnecessary re-renders with identical props. It adds small tracking overhead, so it's counter-productive for lightweight components.",
    topic: "Advanced React Quiz"
  }
];
