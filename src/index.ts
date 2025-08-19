import Agent from "./agent.js";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("OPENAI_API_KEY not set");
    process.exit(1);
  }

  const agent = new Agent(apiKey);
  const rl = readline.createInterface({ input, output });
  console.log("Welcome to Jarvis00! Type /help for commands.");

  while (true) {
    const line = await rl.question("> ");
    if (line === "/exit") {
      rl.close();
      break;
    }
    if (line === "/help") {
      console.log(
        "Commands:\n/remember <text>\n/rule <text>\n/task <goal>\n/complete <id>\n/memories\n/tasks\n/exit"
      );
      continue;
    }
    if (line.startsWith("/remember ")) {
      const content = line.replace("/remember ", "");
      agent.remember("note", content);
      console.log("Memory saved.");
      continue;
    }
    if (line.startsWith("/rule ")) {
      const content = line.replace("/rule ", "");
      agent.remember("rule", content);
      console.log("Rule saved.");
      continue;
    }
    if (line.startsWith("/task ")) {
      const goal = line.replace("/task ", "");
      const task = await agent.addTask(goal);
      console.log("Task created:", task);
      continue;
    }
    if (line.startsWith("/complete ")) {
      const id = line.replace("/complete ", "");
      agent.completeTask(id);
      console.log("Task marked complete.");
      continue;
    }
    if (line === "/memories") {
      console.log(agent.listMemories());
      continue;
    }
    if (line === "/tasks") {
      console.log(agent.listTasks());
      continue;
    }
    const response = await agent.chat(line);
    console.log(response);
  }
}

main();
