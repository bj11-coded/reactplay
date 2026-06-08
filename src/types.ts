export type Level = "Beginner" | "Intermediate" | "Advanced";

export interface MiniQuiz {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Subsection {
  title: string;
  content: string;
  exampleCode?: string;
  exampleExplanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  level: Level;
  description: string;
  estimate: string;
  explanation: string;
  syntax: string;
  code: string;
  outputExplanation: string;
  practiceTask: string;
  commonMistakes: string;
  interviewQuestion: string;
  miniQuiz: MiniQuiz;
  subsections?: Subsection[];
}

export interface Snippet {
  id: string;
  title: string;
  difficulty: Level;
  description: string;
  category: "Buttons" | "Cards" | "Navbar" | "Sidebar" | "Forms" | "Modal" | "Table" | "API Fetching" | "Authentication" | "Protected Route" | "Dashboard Layout";
  code: string;
}

export interface Project {
  id: string;
  title: string;
  level: Level;
  description: string;
  features: string[];
  requiredConcepts: string[];
  starterCode: string;
  finalChallenge: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  topic: string;
}

export interface ProgressState {
  completedLessons: string[]; // List of lesson IDs
  completedQuizzes: Record<string, number>; // quizTopic -> best score
  savedPlaygroundCode: string;
}
