import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Pre-load data from files
import { lessonsData } from "./src/data/lessons";
import { quizzesData } from "./src/data/quizzes";
import { snippetsData } from "./src/data/snippets";
import { projectsData } from "./src/data/projects";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client if key is configured
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey !== "") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini AI client successfully initialized server-side.");
  } catch (err) {
    console.error("Failed to initialize Gemini AI client:", err);
  }
}

// 1. API: Get lessons
app.get("/api/lessons", (req, res) => {
  res.json(lessonsData);
});

// 2. API: Get quizzes
app.get("/api/quizzes", (req, res) => {
  res.json(quizzesData);
});

// 3. API: Get snippets
app.get("/api/snippets", (req, res) => {
  res.json(snippetsData);
});

// 4. API: Get projects
app.get("/api/projects", (req, res) => {
  res.json(projectsData);
});

// 5. API: Simulate interactive users for Playground fetches
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Sarad Bashyal", tech: "React 19 & Next.js Core", status: "Active" },
    { id: 2, name: "Mark Dev", tech: "Zustand State Guru", status: "Active" },
    { id: 3, name: "Chy Bijay", tech: "Cloud Database Engineer", status: "Sleeping" },
    { id: 4, name: "Antigravity Agent", tech: "Auto Coding Assistant", status: "Typing" }
  ]);
});

// 6. API: AI Explanations and Reviews (Using Gemini)
app.post("/api/ai/explain", async (req, res) => {
  const { code, topic, category } = req.body;
  
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "") {
    return res.status(200).json({
      success: false,
      message: "Please configure your GEMINI_API_KEY in the Settings > Secrets panel."
    });
  }

  try {
    if (!ai) {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }

    let prompt = "";
    if (code) {
      prompt = `You are an elite senior React engineering consultant. Please analyze this code block and provide a thorough, hyper-focused code analysis, potential bug check, and performance feedback. Highlight styling and modern React 19/TS optimization recommendations.\n\nCode to review:\n\`\`\`tsx\n${code}\n\`\`\``;
    } else if (topic) {
      prompt = `You are a helpful elite React tutor. Explain the React topic: "${topic}" ${category ? `in the category "${category}"` : ""}. Provide concrete TSX code examples, common traps, and performance optimizations. Keep your tone direct, informative, neoclassic/modern design-centric.`;
    } else {
      prompt = "Hello! Please suggest 3 React tips for developers building neobrutalist robust web systems.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({
      success: true,
      data: response.text
    });
  } catch (error: any) {
    console.error("Gemini server error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error executing Gemini API."
    });
  }
});

// Vite middleware for development vs static serve for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
