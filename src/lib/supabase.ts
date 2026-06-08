import { createClient } from "@supabase/supabase-js";

// Safe, fallback configurations with dynamic meta casting for Vite
const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || "";
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || "";

// Lazy initialization of Supabase client to prevent boot crashes if keys are empty
let supabaseClientInstance: any = null;

export function getSupabase() {
  const url = (supabaseUrl || "").trim();
  const key = (supabaseAnonKey || "").trim();

  if (
    !url ||
    !key ||
    url === "undefined" ||
    key === "undefined" ||
    url === "null" ||
    key === "null" ||
    url.includes("PLACEHOLDER") ||
    key.includes("PLACEHOLDER") ||
    url.includes("your-") ||
    key.includes("your-") ||
    url.includes("project-ref") ||
    !url.startsWith("https://") ||
    key.length < 80 ||
    !key.startsWith("eyJ")
  ) {
    return null;
  }
  if (!supabaseClientInstance) {
    try {
      supabaseClientInstance = createClient(url, key);
    } catch (e) {
      console.warn("Supabase client creation failed, continuing in simulator mode:", e);
      return null;
    }
  }
  return supabaseClientInstance;
}

export const isSupabaseConfigured = (): boolean => {
  const sb = getSupabase();
  return sb !== null;
};
