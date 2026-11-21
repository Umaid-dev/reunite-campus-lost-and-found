# Development log

Development was performed with ChatGPT/Codex in one session. The commits are genuine staged changes from that session, not a fabricated multi-day timeline. The student subsequently ran the project on Windows, verified local MongoDB persistence, ran tests and a build, updated the reflection and published the repository.

## Stage 1 — API and data foundation

- Created the Mongoose schema, Express list/create/status routes and field validation.
- Added fictional seed records and a temporary MongoDB startup command.
- Connected an initial basic React list and passed a frontend build.
- Committed the API/runtime foundation separately from the interface.

## Stage 2 — Interactive board

- Added the React board, report form, details dialog and return confirmation.
- Added combined search/category/status filters, sorting, counts and browser bookmarks.
- Added category illustrations and responsive CSS.
- The production frontend build passed.

## Stage 3 — Observed failures and repairs

- The first real MongoDB integration check failed: the default 8.2.6 binary aborted during CPU detection.
- Pinning the optional binary to 7.0.24 avoided that crash but startup still failed with `open: Operation not permitted`. No live database success was claimed.
- Separated MongoDB persistence from an explicit temporary demo repository so the full UI/API workflow could run here.
- Kept the separate integration test for a compatible machine.
- Preview startup initially failed because Vite requested network interfaces in the restricted runtime. Binding to loopback resolved this startup issue.
- A second preview attempt timed out because the wrapper ignored the requested port. Forwarding arguments through both startup wrappers resolved it.
- Increased small interface labels and metadata for readability.
- Added test cases for whitespace, impossible/future dates, invalid IDs, extra fields, malformed JSON, body size and filter/count behaviour.

## Stage 4 — Browser and documentation verification

- Loaded the six fictional sample posts.
- Checked unmatched search and a category filter.
- Saved a post and confirmed its bookmark survived a page refresh.
- Submitted a whitespace-only title and observed server validation.
- Created a fictional USB-C charger post, opened its details and confirmed its return. Lost/returned counts updated.
- Captured actual board and returned-item screenshots.
- Added setup, modes, API, component overview, prompt record and reflection draft documentation.
- Clean-checkout installation and build results are in docs/testing.md.

## Stage 5 — Student Windows verification and publication

- The student started MongoDB, seeded the application and ran the persistent MERN mode.
- A newly created post remained after an application restart.
- All 16 original tests and the production build passed on Windows.
- The student published the repository and updated the README with local test observations.
- The coding assistant installed and tested a clean clone from the published GitHub URL: dependencies, all 16 original tests, build, demo startup and proxied sample data succeeded.

## Stage 6 — User-requested date range filter

- Used the user's actual date-filter prompt recorded in docs/prompts.md.
- Added optional inclusive From/To fields for the lost/found event date.
- Composed dates with search, category, report type/status, saved items and sorting.
- Rejected an end date before the start date with an inline alert and a separate invalid-range state.
- Added Clear dates while retaining other filters; the existing Clear filters action now resets dates too.
- Added 10 focused board tests; all 26 standard tests and the production build passed.
- Browser checks verified inclusive boundaries, combinations, reversed ranges, date-only reset and full reset. Captured new working and validation screenshots.

## Remaining review

The student should pull the feature update and review it on Windows. Automated live MongoDB integration, returned-status persistence across restarts, dedicated mobile viewport testing and a full accessibility audit remain separate from the completed checks.
