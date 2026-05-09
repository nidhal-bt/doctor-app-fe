# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server at http://localhost:3000
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

The project uses **pnpm** as the package manager (see `pnpm-workspace.yaml`).

---

## Architecture

See **`ARCHITECTURE.md`** for the full tech stack, folder structure, feature folder pattern, rendering strategy, styling rules, API layer pattern, file naming, and translation key conventions.

---

## Project Files

| File | Purpose |
|------|---------|
| `ARCHITECTURE.md` | Tech stack, rendering strategy, component/styling/naming rules (concise) |
| `.claude/PROJECT.md` | Detailed folder structure with feature folder examples |
| `.claude/API.md` | API layer usage guide — code examples for ApiEndpoint, execute, error handling |
| `.claude/WORKFLOW.md` | Full workflow rules — when and how to update every tracking file |
| `TASKS.md` | Active tasks with step-level status |
| `PROGRESS.md` | Session state: what was done, what's next |
| `TASKS_BACKLOG.md` | All planned tasks not yet started |
| `ARCHIVE.md` | Log of completed tasks with decisions and patterns |
| `ARCHIVE_INDEX.md` | One-line index of every archive entry |

---

## Workflow — Which File to Update When

> Full rules live in `.claude/WORKFLOW.md`. This is the quick-reference version.

### Session start
1. Read `PROGRESS.md` — understand where the last session ended
2. Read `TASKS.md` — see what's active
3. Ask the user which part to work on

### Starting a new task
- Add the task + steps to **`TASKS.md`**
- Update **`PROGRESS.md`** with the plan

### While working (mid-task)
- Update **`PROGRESS.md`** after each meaningful step

### Task fully complete
1. Mark all steps ✅ in **`TASKS.md`**, then remove the task
2. Check off items `[x]` in **`TASKS_BACKLOG.md`**
3. Add a numbered entry to **`ARCHIVE.md`** (what was built, decisions, patterns, problems solved)
4. Add a one-line pointer to **`ARCHIVE_INDEX.md`**

### Before `/compact` or `/clear`
- Update **`PROGRESS.md`**: set "Last Updated", summarize the session, update "What's Done" table, update "Next Task"
