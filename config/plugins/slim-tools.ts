import type { Plugin } from "opencode/plugin";

const slimDescriptions: Record<string, string> = {
  bash: "Run a shell command. Use workdir param instead of cd. Timeout default 120s. Quote paths with spaces. Prefer dedicated tools for file ops (Read, Edit, Write, Grep, Glob).",
  todowrite:
    "Create/update a structured todo list for tracking multi-step tasks. States: pending, in_progress, completed, cancelled. One in_progress at a time. Skip for trivial single-step tasks.",
  task: "Launch a subagent for complex multi-step tasks. Specify subagent_type. Launch multiple concurrently via parallel tool calls. Agent result not visible to user — summarize it. Use task_id to resume a previous session.",
  multiedit:
    "Multiple find-and-replace edits on one file, applied sequentially. Same rules as Edit. Atomic: all succeed or none apply. Prefer over Edit for multiple changes to same file.",
  edit: "Exact string replacement in a file. Read the file first. oldString must match exactly incl whitespace. Fails if not found or ambiguous. Use replaceAll for renaming.",
  read: "Read a file or directory. Lines prefixed with line numbers. Use offset/limit for large files. Use grep for searching. Supports images and PDFs.",
  write:
    "Write/overwrite a file. Read existing files first. Prefer Edit for existing files.",
  grep: 'Search file contents via regex. Returns paths + line numbers sorted by mtime. Use include param to filter by glob.',
  glob: 'Find files by glob pattern (e.g. "**/*.ts"). Returns paths sorted by mtime.',
  ls: "List files and directories. Prefer Glob/Grep when you know what to search for.",
  webfetch:
    "Fetch a URL and return content as markdown, text, or html.",
  websearch:
    "Web search via Exa AI. Supports auto/fast/deep search types.",
  codesearch:
    "Search code examples and docs via Exa Code API. Adjustable token count (1000-50000).",
  lsp: "LSP code intelligence: goToDefinition, findReferences, hover, documentSymbol, workspaceSymbol, goToImplementation, callHierarchy. Requires filePath, line, character (1-based).",
  question:
    "Ask the user a question. Multiple choice with optional multi-select. Custom input added automatically.",
  apply_patch:
    'Apply a patch. Format: `*** Begin Patch` / `*** Add|Delete|Update File: <path>` / `*** End Patch`. New lines `+`, removed `-`.',
  plan_enter:
    "Suggest switching to plan agent for complex tasks or when user mentions planning.",
  plan_exit:
    "Exit plan agent after plan is finalized and questions resolved.",
};

const plugin: Plugin = {
  name: "slim-tools",
  hooks: {
    "tool.definition": ({ tool }) => {
      const slim = slimDescriptions[tool.name];
      if (slim) {
        return { ...tool, description: slim };
      }
      return tool;
    },
    "experimental.chat.system.transform": ({ messages }) =>
      messages.map((msg) => {
        if (typeof msg.content !== "string") return msg;
        let content = msg.content;
        content = content.replace(/<env>[\s\S]*?<\/env>\s*/g, "");
        content = content.replace(
          /<directories>[\s\S]*?<\/directories>\s*/g,
          "",
        );
        return { ...msg, content };
      }),
  },
};

export default plugin;
