import { v4 as uuid } from "uuid";
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = "data";
const MEMORY_FILE = path.join(DATA_DIR, "memory.json");
const TASK_FILE = path.join(DATA_DIR, "tasks.json");
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export interface MemoryItem {
  id: string;
  type: "note" | "rule" | "important";
  content: string;
}

export interface Task {
  id: string;
  goal: string;
  steps: string[];
  status: "pending" | "complete";
}

function readJson(path: string): any {
  try {
    const data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeJson(path: string, data: any) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
}

export default class Agent {
  private apiKey: string;
  private memories: MemoryItem[];
  private tasks: Task[];

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    this.memories = readJson(MEMORY_FILE);
    this.tasks = readJson(TASK_FILE);
  }

  private save() {
    writeJson(MEMORY_FILE, this.memories);
    writeJson(TASK_FILE, this.tasks);
  }

  private async complete(messages: Array<{ role: string; content: string }>, max_tokens = 300): Promise<string> {
    const res = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ model: "gpt-4o-mini", messages, max_tokens })
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "";
  }

  remember(type: "note" | "rule" | "important", content: string) {
    this.memories.push({ id: uuid(), type, content });
    this.save();
  }

  listMemories(): MemoryItem[] {
    return this.memories;
  }

  async addTask(goal: string): Promise<Task> {
    const prompt = `Break the following goal into short actionable steps:\nGoal: ${goal}\nSteps:`;
    const text = await this.complete([{ role: "user", content: prompt }], 150);
    const steps = text
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean);
    const task: Task = { id: uuid(), goal, steps, status: "pending" };
    this.tasks.push(task);
    this.save();
    return task;
  }

  listTasks(): Task[] {
    return this.tasks;
  }

  completeTask(id: string) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = "complete";
      this.save();
    }
  }

  async chat(message: string): Promise<string> {
    const rules = this.memories
      .filter(m => m.type === "rule")
      .map(m => m.content)
      .join("\n");
    const memories = this.memories
      .map(m => `${m.type.toUpperCase()}: ${m.content}`)
      .join("\n");

    const text = await this.complete([
      {
        role: "system",
        content: `You are an autonomous helpful agent. Follow these rules:\n${rules}`
      },
      { role: "system", content: `Memories:\n${memories}` },
      { role: "user", content: message }
    ]);
    return text;
  }
}
