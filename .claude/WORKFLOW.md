# WORKFLOW.md

## File Update Triggers

| Trigger                        | Files to update                                                  |
| ------------------------------ | ---------------------------------------------------------------- |
| **Start a new task**           | `TASKS.md`, `PROGRESS.md`                                        |
| **Still working (mid-task)**   | `PROGRESS.md`                                                    |
| **Task ends (fully complete)** | `TASKS.md`, `TASKS_BACKLOG.md`, `ARCHIVE.md`, `ARCHIVE_INDEX.md` |
| **`/compact` or `/clear`**     | `PROGRESS.md`                                                    |

---

## Session Start

1. Read `PROGRESS.md` to see where we left off
2. Read `TASKS.md` to understand current tasks
3. Ask the user which part they want to work on today

## Task Planning

1. Before writing any code, explain what you will do and create a clear plan
2. Update `PROGRESS.md` with the task details and each step of the plan
3. Update the task status in `TASKS.md`
4. Always work on easy tasks before complicated ones

## During Work

1. Always explain what you will do before generating any code
2. Work function by function, file by file
3. After each change, update `PROGRESS.md` with the status of each step

## On /compact or /clear

Before compacting or clearing, YOU (the active Claude) must update inline:

1. Update `PROGRESS.md`:
   - Set "Last Updated" to today's date
   - Write a summary of what was done this session under "Completed This Session"
   - Update the "What's Done" table to reflect current state
   - Update "Next Task" section if needed

## Task Completion

When a task is fully done:

1. Mark all steps as ✅ in `TASKS.md`, then remove the task
2. Mark all checklist items as `[x]` in `TASKS_BACKLOG.md`
3. Add a new entry to `ARCHIVE.md` with an increment number (what was built, key decisions, patterns, notable problems solved)
4. Add a one-line entry to `ARCHIVE_INDEX.md` pointing to the new archive entry
