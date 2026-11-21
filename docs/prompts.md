# Prompt record

## Actual prompts from the conversation

The project was selected through this sequence (original wording preserved):

1. `or MERN application ?` — the user requested a full-stack MERN direction.
2. `more ideas` — the AI suggested several projects including a lost and found board.
3. `Ok lets make it` — the user accepted the lost and found idea.

The user had also asked about React, HTML, JavaScript and Node.js. These broad prompts established the idea and technology. Later, the user shared the `npm ci` EUSAGE error from the outer project folder; switching into `reunite` resolved installation. The Windows tests, build and persistence check are recorded in the testing notes.

## Implementation refinements in this AI-assisted session

The coding agent used observed test and preview failures to change its generated code:

- MongoDB could not run under the workspace restrictions. A separate, explicit temporary demo repository was added; the MongoDB implementation and integration test remained separate.
- The preview launcher requested port 4173, but the wrapper launched Vite on 5173. The wrapper was changed to forward CLI arguments.
- Generated action labels and metadata were small. Their CSS sizes were increased after the first build.
- A return confirmation step, API field allowlist and explicit demo notice were included.

These are recorded development actions, not invented additional messages from the student.

## Actual date-filter refinement prompt — November 21, 2026

The user then submitted this request:

> Add a date range filter to Reunite. It should work together with search, category, and status filters. Validate that the end date is not before the start date, and test the filtering behavior.

The request produced optional From/To date fields with inclusive boundaries; dates combine with the existing search, category, status, bookmarks and sorting. A reversed range shows an inline error and no results. Clear dates keeps other filters; Clear filters resets dates too. Ten additional board tests bring the standard suite from 16 to 26 passing tests. The build passed, and actual browser checks covered valid boundaries, combined filters, reversed ranges and reset controls. New screenshots show the feature and validation state.

This request was suggested during the discussion and then explicitly submitted by the user. It is now an actual refinement prompt, rather than an unused suggestion.

## Suggested prompts for future iterations

The following prompts have NOT been used as student requests yet. Use or adapt one only if it addresses a real need, then record the actual result:

- "I want to edit one of my demo posts. Add an edit form that pre-fills the current values and reuses the same validation. Keep the README clear that real ownership checks require login."
- "Check the app at a 390 pixel viewport. Fix any horizontal overflow, and make every form field and action usable with the keyboard. Tell me exactly what you verified."

A significant prompt should state the current problem, desired behaviour and how success will be checked. Replace generic planning examples in the README with your real later prompts where appropriate.
