# Reunite — AI-assisted creation log

**Course:** Introduction to AI — Vibe Coding Challenge  
**Project:** Reunite, a campus lost and found MERN application  
**AI tool:** ChatGPT with Codex coding tools  
**Development date:** November 21, 2026

This chronological record covers project selection, generation, execution, failures, repairs, local verification, GitHub publication, documentation revisions and the later date-filter iteration. User prompt excerpts are quoted where available; assistant actions and longer exchanges are summarised. Repeated navigation and confirmation messages are grouped with the stage they supported. The separate [development log](docs/development-log.md), [test record](docs/testing.md), source code and commit history provide implementation evidence.

## 1. Understand the assignment and explore the stack

The student supplied the Vibe Coding Challenge instructions and asked about suitable application ideas and technology choices. Relevant early prompts included:

> We will create an Applications using MERN stack

> We will use React and Vite

>Ideas for MERN applications

> more ideas

**Assistant action:** Explained the frontend/backend/database roles and proposed MERN project ideas. The campus lost and found board was selected as an interactive, testable application with a clear student audience.

**Decision:** Use MongoDB, Express, React and Node.js. AI would assist development; the running application would not require an AI model, paid API or AI key.

## 2. Authorise implementation and define the workflow

The student accepted the selected idea:

> Ok, Lets create Lost and found application

**Assistant action:** Implemented Reunite around the workflow **report → search → contact → return**. The classroom scope included lost/found reporting, category and status filters, text search, sorting, saved items, details and a return confirmation. Six fictional posts supported demonstrations.

**Design decisions:** A green/cream campus interface; local SVG category illustrations; fictional `example.com` contacts; native modal dialogs; loading, empty, success and error states. Category art represents a category rather than an uploaded photograph of an item.

## 3. Generate the data and API foundation

**Assistant action:** Created a Mongoose item schema, Express API routes, seed data and input validation. Separated the API from its storage adapter so the normal MongoDB implementation and a temporary demonstration store could be checked independently.

The API supports:

- `GET /api/health`
- `GET /api/items`
- `POST /api/items`
- `PATCH /api/items/:id/status`

Validation covers required text lengths, supported categories/types, email syntax, real dates, future dates, valid IDs and allowed status changes. Creation uses a field allowlist so extra submitted fields cannot set arbitrary IDs or statuses. JSON size limits and useful error responses are included.

**Evidence:** Commit `37814e2` — Build MongoDB item API and temporary demo runtime.

## 4. Generate the interactive React board

**Assistant action:** Added the board, report form, detail modal, bookmarks and returned-item workflow. Combined filters and sorting were placed in a shared helper. Saved item IDs use browser local storage; the normal post records use MongoDB.

**Observed behavior:** Filtering changes visible cards; confirming a return updates the item and counts. Bookmark state survives a browser refresh.

**Evidence:** Commit `2a71017` — Build interactive React board with reports filters and saved items.

## 5. Diagnose failures in the coding environment

These were observed by the coding assistant while running its generated application:

1. The default MongoDB 8.2.6 binary failed during CPU detection.
2. MongoDB 7.0.24 avoided that failure but could not start because the environment returned `open: Operation not permitted`.
3. An initial Vite startup attempted network-interface detection that the runtime did not permit.
4. A preview launcher requested port 4173, while the wrapper initially started Vite on 5173.

**Repairs:** Kept the real MongoDB path, added a clearly labelled temporary demo store, retained a separate optional real MongoDB integration test, bound Vite to loopback and forwarded the preview arguments through the startup scripts.

**Verification decision:** A working demo, frontend build or schema test would not be described as a successful real database integration test.

**Evidence:** Commit `29ed298` — Fix runtime startup and add explicit demo mode with validation tests.

## 6. Test the original application and package it

**Assistant action:** Added 16 automated tests: nine API tests using the temporary demo repository, five board-logic tests and two Mongoose schema checks without a live database. Built the production frontend and checked actual browser workflows.

**Browser observations:** Six initial posts loaded; unmatched search showed an empty state; category filtering worked; bookmarks survived refresh; whitespace-only input was rejected; a fictional USB-C charger was posted, opened and marked returned; counts and the returned filter updated.

**Documentation:** Added installation/run instructions, two browser screenshots, component/API explanations, prompt notes, test notes, reflection questions and future improvements. A ZIP preserved the genuine staged Git history, excluding `.env`, dependencies and generated build output.

**Clean local checkout:** Installed dependencies with `npm ci`, passed all 16 tests and built successfully without copying an existing dependency directory, `.env` or build folder.

**Evidence:** Commit `61c19fb` — Record successful clean-clone checks and publishing instructions.

## 7. Troubleshoot installation on the student's Windows computer

The student shared the actual command and failure from the outer extraction folder:

```text
PS C:\Users\Admin\Downloads\Reunite_MERN_Project> npm ci
npm error code EUSAGE
npm error The `npm ci` command can only install with an existing package-lock.json
```

**Assistant response:** Identified that the runnable project and lockfile were inside the nested `reunite` directory. Directed the student to that directory, install dependencies and start the demo.

**Student result:** The student reported “YES RUNNING” and supplied a screenshot of Reunite. The visible demo banner explained that sample posts reset when the temporary server restarts.

**Lesson:** The exact command, error and working directory made the installation issue diagnosable.

## 8. Switch from the temporary demo to MongoDB

The student supplied the MongoDB service check:

```powershell
Get-Service *Mongo*
```

The service output showed MongoDB **Running**.

**Assistant response:** Explained stopping demo mode, copying `.env.example` to `.env`, seeding and starting the normal MERN application:

```powershell
Copy-Item .env.example .env
npm run seed
npm run dev
```

**Observed result:** The Windows terminal showed Vite on port 5173 and `Reunite API ready on port 5000`. The demo banner disappeared in the browser.

## 9. Verify persistence and the original checks on Windows

**Assistant-directed manual check:** Create an item, stop the application, restart it and refresh the board.

**Student evidence:** A new phone post remained visible after the restart. The student reported:

> its still there

This demonstrated manual creation/read persistence with the real local MongoDB application. It did not establish the result of the separate automated MongoDB integration command.

The student then supplied terminal output for:

```powershell
npm test
npm run build
```

**Observed results:** All 16 original tests passed with zero failures; the production build completed successfully. The student recorded these results in `docs/testing.md` and committed them.

**Evidence:** Commit `aa02bb5` — Document successful Windows tests build and MongoDB persistence.

## 10. Publish through GitHub Desktop

**Assistant response:** Guided adding the existing local `reunite` repository rather than creating a replacement repository, preserving its history. An initial GitHub Desktop screenshot showed another course repository; selecting the Reunite folder resolved the navigation issue.

**Student action:** Published `Umaid-dev/reunite-campus-lost-and-found` publicly and supplied screenshots of the repository and commits.

**Submission decision:** The supplied assignment requires an accessible GitHub repository and a runnable application. It does not require public website deployment. The README includes local demo and persistent MongoDB instructions.

## 11. Replace draft testing statements with actual observations

**Student questions:** Asked where to place the Windows testing paragraph and whether to include the verification note.

**Assistant response:** Guided replacing the answer to reflection question 3 with the student's actual Windows tests and restart check; added a Windows verification paragraph after the coding-environment limitations; removed the draft introduction.

**Student action:** Saved, committed and pushed the README edits, then improved the prompt examples to include the real `npm ci` troubleshooting exchange.

**Evidence:**

- `ccfe2a3` — Update reflection and document Windows verification.
- `69ccb3c` — Document actual AI planning and troubleshooting examples.

## 12. Verify the actual published repository from a fresh clone

**Assistant action:** Cloned the published GitHub repository into a clean directory and followed its setup instructions.

**Results before the date-filter iteration:** Dependency installation, the original 16 tests, production build and demo startup succeeded. An HTTP check reached the frontend, the proxied API health route and six sample records. Screenshot and local documentation links existed. The check did not use a copied `.env`, dependency folder or generated build directory.

This complements the student's Windows MongoDB checks; the demo check uses the explicitly temporary data mode.

## 13. Implement the student's date-range refinement prompt

Actual user request:

> Add a date range filter to Reunite. It should work together with search, category, and status filters. Validate that the end date is not before the start date, and test the filtering behavior.

**Implemented behavior:**

- Optional From/To fields filter the date an item was lost or found.
- Both boundaries are inclusive, and equal dates select one day.
- Either end can be left blank.
- Dates combine with text search, category, report type/status, saved items and sorting.
- A reversed range displays an inline error, marks fields invalid and shows a separate invalid-range state.
- Clear dates retains the other filters; Clear filters resets dates too.

**Code changes:** Added range validation and comparisons to `shared/board.js`, React state and controls in `client/src/App.jsx`, and matching styling. No API route or database migration was needed because filtering already takes place in the browser using existing ISO date fields.

## 14. Test the date filter, record results and publish

**Automated checks:** Ten new cases cover inclusive and same-day ranges, start-only/end-only ranges, combinations with other filters, lost/returned tabs, bookmarks/sorting, reversed-range rejection, clearing and no-match ranges. All **26 tests** passed, and the production build succeeded in the coding workspace.

**Actual browser checks:**

1. November 19–20 selected four items on the inclusive boundaries.
2. Library search + Electronics category + Found status + November 19–21 selected the Sony headphones post.
3. A November 19 start and November 18 end displayed the range-order error and hid result cards.
4. Clear dates removed the dates/error while preserving search/category/status.
5. November 1–8 produced the no-match state.
6. Clear filters restored all six sample records and cleared the filters.

**Evidence:** Added working and invalid-range screenshots; updated README features, usage instructions, test results, the exact refinement prompt and reflection question 4. Compared the complete GitHub tree with the tested local source before publishing. Verified the new commit was attributed to `Umaid-dev`.

**Commit:** `6454580` — Add inclusive date range filtering with validation and tests.

## 15. Run the feature on Windows and check validation

**Assistant instructions:** Pull the update, run the tests and restart the application.

**Student evidence:** A Windows screenshot showed the new From/To controls in the running MongoDB application and seven existing posts. A later screenshot showed **From `2026-11-21` / To `2026-11-19`**, red field borders, the text **“End date must be on or after the start date.”** and the separate **“Check your date range.”** state.

This confirms the student manually checked reversed-range validation on Windows. The conversation does not contain a Windows terminal result for the expanded 26-test suite, so that result is attributed to the coding workspace rather than claimed as another student test run.

## 16. Complete the rubric review and creation log

The student requested a check of the entire rubric. Reviewing all supplied checklist copies revealed an additional requirement for a root-level `PROMPT.md` containing the creation log. This file was added to complement the README's three prompt examples and the shorter prompt notes. The README/test notes were also updated to record the now-observed Windows range validation.

## Verification limits and remaining responsibility

- The optional automated live MongoDB integration test has not passed in the coding workspace. The student's successful Windows persistence check is manual.
- A complete mobile-device, keyboard and screen-reader audit has not been performed. Responsive styles and semantic controls are included.
- Authentication, ownership controls, moderation, private messaging and photo upload are future work. The documented scope is a local classroom prototype.
- The student should read the source and reflection and be able to explain React, Express, MongoDB/Mongoose and the shared filter logic. The instructor determines the official grade.

All development commits belong to the actual session; no multi-day timeline is implied. This log records successful checks and observed failures together so the AI-assisted process can be assessed.
