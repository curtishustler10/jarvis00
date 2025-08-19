# AI Agent - Autonomous Task Execution

An intelligent AI agent that can execute tasks autonomously, maintain memory, and learn from conversations. Built with Next.js, TypeScript, and OpenAI GPT-4.

## Features

🤖 **Autonomous Agent**: Executes complex tasks by breaking them into steps
🧠 **Memory System**: Automatically stores important information, rules, and learnings
📋 **Task Management**: Creates and tracks tasks with step-by-step execution
📜 **Rule Following**: Remembers and follows user-defined rules and preferences
💬 **Chat Interface**: Natural conversation with real-time updates
🔄 **Persistent Storage**: All data stored locally in browser localStorage

## Quick Start

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=sk-your-openai-api-key-here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

### Give the Agent Goals
```
Goal: Research the best marketing strategies for small businesses
```

### Set Rules
```
Rule: Always ask for clarification before making assumptions
Rule: Never recommend solutions without considering budget constraints
```

### Store Important Information
```
Important: Our target audience is millennials aged 25-35
Note: We prefer organic marketing over paid advertising
```

### Chat Naturally
The agent will automatically:
- Store important information in memory
- Create tasks when you give it goals
- Follow rules you've established
- Learn from your preferences

## Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **AI Integration**: OpenAI GPT-4 API
- **Memory System**: Local storage with intelligent categorization
- **Task Engine**: Autonomous task breakdown and execution
- **Rule System**: User-defined behavioral rules

## API Endpoints

- `POST /api/chat` - Send messages to the agent
- `GET /api/memory` - Retrieve stored memories and rules
- `DELETE /api/memory` - Clear all stored data
- `GET /api/tasks` - Get task status and history
- `DELETE /api/tasks` - Clear all tasks

## Components

- **ChatInterface**: Main conversation UI
- **MemoryPanel**: View stored memories and rules
- **TaskPanel**: Monitor active and completed tasks
- **Memory Manager**: Intelligent information storage
- **Task Engine**: Autonomous task execution
- **AI Agent**: OpenAI integration with context awareness

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

```bash
OPENAI_API_KEY=sk-...           # Required: Your OpenAI API key
AGENT_NAME=MarketFinder         # Optional: Agent name
AGENT_MODEL=gpt-4              # Optional: OpenAI model to use
AGENT_MAX_TOKENS=2000          # Optional: Max tokens per response
```

## License

MIT License - feel free to use this project for your own AI agent implementations!
# jarvis00
