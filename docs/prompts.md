# Prompt record

## Actual prompts from the conversation

The project was selected through this sequence (original wording preserved):

1. `or MERN application ?` — the user requested a full-stack MERN direction.
2. `more ideas` — the AI suggested several projects including a lost and found board.
3. `Ok lets make it` — the user accepted the lost and found idea.

The user had also asked about React, HTML, JavaScript and Node.js. These broad prompts established the idea and technology, but they do not by themselves document a student-led debugging cycle.

## Implementation refinements in this AI-assisted session

The coding agent used observed test and preview failures to change its generated code:

- MongoDB could not run under the workspace restrictions. A separate, explicit temporary demo repository was added; the MongoDB implementation and integration test remained separate.
- The preview launcher requested port 4173, but the wrapper launched Vite on 5173. The wrapper was changed to forward CLI arguments.
- Generated action labels and metadata were small. Their CSS sizes were increased after the first build.
- A return confirmation step, API field allowlist and explicit demo notice were included.

These are recorded development actions, not invented additional messages from the student.

## Suggested prompts for the next student iteration

The following prompts have NOT been used as student requests yet. Run the app, identify a real need, then use or adapt one and record the actual result:

- "In Reunite, add a date range filter. It must combine with search, category and status, reject an end date before the start date, and have a clear reset button. Add tests for these combinations."
- "I want to edit one of my demo posts. Add an edit form that pre-fills the current values and reuses the same validation. Keep the README clear that real ownership checks require login."
- "Check the app at a 390 pixel viewport. Fix any horizontal overflow, and make every form field and action usable with the keyboard. Tell me exactly what you verified."

A significant prompt should state the current problem, desired behaviour and how success will be checked. Replace generic planning examples in the README with your real later prompts where appropriate.
