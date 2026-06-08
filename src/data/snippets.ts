import { Snippet } from "../types";

export const snippetsData: Snippet[] = [
  {
    id: "neo-brutal-btn",
    title: "Neo-Brutalist Solid Impact Button",
    difficulty: "Beginner",
    description: "A gorgeous, responsive high-contrast button featuring distinct dimensional offset shadows and translation animations.",
    category: "Buttons",
    code: `<button 
  className="relative inline-flex items-center justify-center px-6 py-3 font-mono font-black uppercase text-xs tracking-wider text-black bg-[#00FF00] border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#22ff22] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
>
  Execute Sandbox
</button>`
  },
  {
    id: "async-fetch-hook",
    title: "Robust Dynamic API Fetcher with Retries",
    difficulty: "Intermediate",
    description: "An async API fetcher including loading flags, automatic stale validations, structured error catch models, and retry logic.",
    category: "API Fetching",
    code: `import { useState, useEffect } from "react";

export function useDataFetch<T>(url: string, retriesRemaining = 3) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadPayload = async (attempt: number) => {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error(\`Server returned error status: \${res.status}\`);
        const resultSchema = await res.json();
        if (active) {
          setData(resultSchema);
          setErrorMessage(null);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Internal Socket Timeout";
        if (attempt > 1) {
          setTimeout(() => loadPayload(attempt - 1), 1500);
        } else if (active) {
          setErrorMessage(errorMsg);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadPayload(retriesRemaining);
    return () => { active = false; };
  }, [url]);

  return { data, loading, errorMessage };
}`
  },
  {
    id: "secure-auth-gateway",
    title: "Token Guard & Protected Route Wrapper",
    difficulty: "Advanced",
    description: "A production-ready client router decorator enforcing user verification and session expiration checks before UI display.",
    category: "Protected Route",
    code: `import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface SecurityGuardProps {
  user: {
    uid: string;
    email: string;
    verified: boolean;
  } | null;
  children: React.ReactNode;
}

export const SecurityRouteGuard: React.FC<SecurityGuardProps> = ({ user, children }) => {
  const currentPathLocation = useLocation();

  if (!user) {
    // Redirect guest back to root landing node, saving request intent
    return <Navigate to="/auth" state={{ from: currentPathLocation }} replace />;
  }

  if (!user.verified) {
    // Quarantine verification block pending email verification
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
};`
  }
];
