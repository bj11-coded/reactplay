import { Project } from "../types";

export const projectsData: Project[] = [
  // BEGINNER PROJECTS
  {
    id: "proj-counter",
    title: "Counter App",
    level: "Beginner",
    description: "Build an interactive digital counter with boundary bounds, customized resets, and history logging.",
    features: [
      "Dynamic increment and decrement triggers",
      "Action reset back down to constant zero levels",
      "Condition checks (e.g. limit counts to prevent negative values)",
      "Simple local history array showing recent actions"
    ],
    requiredConcepts: ["useState Hook", "JSX Expressions", "Event Handlers"],
    starterCode: `import React, { useState } from 'react';

export default function StarterCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border border-black bg-white">
      <h3 className="font-mono text-xs font-bold uppercase">Basic Counter</h3>
      <p className="text-4xl font-black my-2">{count}</p>
      {/* Build increment/decrement triggers here */}
    </div>
  );
}`,
    finalChallenge: "Implement a multiplier input field where users can change the step size (e.g., increment by 5, 10, or 100 instead of 1)."
  },
  {
    id: "proj-todo",
    title: "Todo App",
    level: "Beginner",
    description: "Construct a complete client task tracking board featuring interactive check toggles and instant deletions.",
    features: [
      "Input field with submission listeners",
      "Interactive list items with complete status check boxes",
      "Filter buttons to view All / Active / Completed tasks",
      "Dynamic state count of remaining task cards"
    ],
    requiredConcepts: ["State Arrays", "Key props in lists", "Conditional rendering"],
    starterCode: `import React, { useState } from 'react';

export default function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Install React learning module", checked: true }
  ]);

  return (
    <div className="p-4 border border-black bg-white">
      <h3 className="font-mono text-xs font-bold uppercase mb-2">My Tasks</h3>
      {/* Loop through tasks list under here */}
    </div>
  );
}`,
    finalChallenge: "Hook up standard LocalStorage triggers so that the task items are loaded from and saved to the user's browser automatically."
  },
  {
    id: "proj-product-list",
    title: "Product Search & Filter List",
    level: "Beginner",
    description: "Develop a searchable mock product grid with category selector badges.",
    features: [
      "Real-time input field text search",
      "Horizontal category badge selectors",
      "Layout grid presenting card prices, titles, and category tags",
      "Dynamic empty search layout warnings"
    ],
    requiredConcepts: ["Array.prototype.filter", "Input bindings", "Tailwind flex grids"],
    starterCode: `import React, { useState } from 'react';

export default function ProductIndex() {
  const catalog = [
    { name: "Dev Board V2", price: 59, category: "HARDWARE" },
    { name: "Monospace Font Keycaps", price: 25, category: "PERIPHERALS" }
  ];

  return (
    <div className="p-4 border border-black bg-white">
      <input type="text" placeholder="Search product..." className="border p-2 mb-2 w-full text-xs font-mono" />
    </div>
  );
}`,
    finalChallenge: "Add a sorting dropdown that toggles catalog items ordering between 'Low-to-High Price' and 'High-to-Low Price'."
  },

  // INTERMEDIATE PROJECTS
  {
    id: "proj-weather",
    title: "Weather App (API Fetcher)",
    level: "Intermediate",
    description: "Connect to public weather forecasting hubs to pull and present current atmospheric grids based on searched city tags.",
    features: [
      "Asynchronous fetch parameters routing",
      "Interactive search submitting query parameters to remote web nodes",
      "Clean status modules rendering winds, temperature grids, and pressure details",
      "Error boundaries representing non-existent city definitions"
    ],
    requiredConcepts: ["async/await fetch", "HTTP error handling", "Spin loaders", "useEffect triggs"],
    starterCode: `import React, { useState, useEffect } from 'react';

export default function WeatherPortal() {
  const [city, setCity] = useState("Kathmandu");
  const [report, setReport] = useState(null);

  // Implement async load calculations linked to city hookups
  return (
    <div className="p-4 border border-black bg-neutral-50">
      <h3 className="font-bold font-mono">WEATHER COMPASS</h3>
    </div>
  );
}`,
    finalChallenge: "Implement an automatic geo-coordinates look-up using browser navigator.geolocation pointers when the component mounts."
  },
  {
    id: "proj-expense",
    title: "Expense Tracker",
    level: "Intermediate",
    description: "Build an visual transaction ledger displaying dynamic credit summaries, spending categories, and historical lists.",
    features: [
      "Unified Form handling amounts, descriptors, and transaction category options",
      "Separated Income vs Spending credit summaries calculating margins",
      "Transaction deletions triggering state item adjustments",
      "Color-coded visual bars summarizing spending share"
    ],
    requiredConcepts: ["Controlled multi-input forms", "Reducing arrays to total values", "Unique ID creators"],
    starterCode: `import React, { useState } from 'react';

export default function Ledger() {
  const [ledgerItems, setLedgerItems] = useState([
    { id: 1, text: "Server Subscription", amount: -15, type: "EXPENSE" }
  ]);

  return (
    <div className="p-4 border border-black bg-[#fafafa]">
      <h4 className="font-mono text-xs uppercase font-extrabold text-stone-600">LEDGER TRACKS</h4>
    </div>
  );
}`,
    finalChallenge: "Incorporate a category filtering toggle (e.g., show only Food, Entertainment, or Hardware items) to help organize logs."
  },

  // ADVANCED PROJECTS
  {
    id: "proj-dashboard",
    title: "Admin Dashboard Console",
    level: "Advanced",
    description: "Erect a high-fidelity control suite featuring responsive lateral column rails, user grid summaries, and active log terminals.",
    features: [
      "Multi-tab inner layout navigation rails",
      "Recharts or pure DOM bar charts mapping visual database counts",
      "Comprehensive data feeds with user edit parameters",
      "Live security logs panel with automated time ticks resembling command shells"
    ],
    requiredConcepts: ["Component sub-routing", "Clean layout grids", "Pure SVG charts", "Custom memory store selectors"],
    starterCode: `import React, { useState } from 'react';

export default function AdminConsole() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex border border-black h-96 font-mono text-xs text-black">
      {/* Sidebar Navigation */}
      <div className="w-1/4 border-r border-black p-4 bg-stone-100 flex flex-col justify-between">
        <span className="font-bold">SYSTEM CONTROL</span>
      </div>
      {/* Main viewport */}
      <div className="w-3/4 p-4 bg-white">
        VIEWPORT
      </div>
    </div>
  );
}`,
    finalChallenge: "Build a bulk-selection toggle inside the tables enabling admins to execute single-click deletions or status updates to multiple records at once."
  }
];
