# Verification record

## Automated checks

`npm test` now passes 26 tests in the coding workspace:

- 9 HTTP tests against the explicit temporary demo repository.
- 15 board search/filter/sort/count and date-range tests (10 added in the date-filter iteration).
- 2 Mongoose schema tests without a live database.

`npm run build` passed for the React production bundle.

These results do not claim that a real database integration test passed.

## Browser checks completed

| Action                               | Observed result                                                                     |
| ------------------------------------ | ----------------------------------------------------------------------------------- |
| Load board                           | Six fictional sample posts and initial counts displayed                             |
| Search for a nonexistent item        | Empty state displayed with a clear-filters button                                   |
| Save headphones                      | Saved board showed one item                                                         |
| Refresh browser                      | Saved bookmark remained                                                             |
| Select Keys & cards                  | Only the matching keyring post displayed                                            |
| Submit a whitespace-only title       | Server rejected it and showed a field error                                         |
| Post a valid fictional USB-C charger | Board showed seven records and lost count increased                                 |
| Open item details                    | Description, date, location and fictional contact were visible                      |
| Confirm a return                     | Detail displayed returned status; returned count increased and lost count decreased |
| Returned filter                      | Only returned records displayed                                                     |

Screenshots show actual demo-mode browser states. No real person was contacted and all contact addresses use example.com.

## Database integration limitation

`npm run test:mongo` is present but did not pass in this environment. MongoDB 8.2.6 failed during CPU detection; 7.0.24 failed at startup with `open: Operation not permitted`. The source includes a standard MongoDB/Mongoose path and a separate optional integration test. Repeat it on a compatible machine. Configure local MongoDB or Atlas and separately confirm persistence after restarting the app.

## Remaining checks

- Automated live MongoDB integration, Atlas-specific setup and returned-status persistence across restarts. Creation persistence was manually verified on Windows, as recorded below.
- Dedicated mobile viewport inspection and a complete keyboard/screen-reader audit. Responsive CSS and native dialogs are included, but these do not constitute an accessibility certification.
- Student review of source and reflection.

## Clean checkout check

A fresh local Git clone was created from the project repository. In that clone, `npm ci`, all 16 standard tests and `npm run build` completed successfully. No copied `node_modules`, `.env` or build directory was used. After publication, a separate fresh clone of `https://github.com/Umaid-dev/reunite-campus-lost-and-found` was tested: `npm ci`, all 16 tests present at that point, `npm run build`, demo startup, frontend HTTP, proxied API health and six sample records passed. No existing `.env`, dependency directory or build output was copied into that clone. The date-filter changes were then implemented in that checkout.

## Windows verification — November 21, 2026

- MongoDB service was running, and the application started successfully.
- A newly created item remained on the board after restarting the application.
- `npm test`: all 16 tests passed, with zero failures.
- `npm run build`: production build completed successfully.

## Date range iteration — November 21, 2026

The coding assistant ran `npm test` (26 passed, zero failures) and `npm run build` successfully after adding the feature. This is separate from the student's earlier 16-test Windows run.

Ten new automated cases cover:

- Inclusive lower and upper boundaries, including an exact single day.
- Start-only and end-only ranges.
- Intersection with search, category and open report type filters.
- Lost and returned tabs.
- Saved-only filtering and oldest-first sorting.
- Rejection of reversed ranges instead of silently showing all results.
- Empty and one-sided ranges without order errors.
- Cleared dates retaining the other filters, and valid ranges with no matching items.

Actual browser checks in temporary demo mode:

| Action                                                    | Observed result                                                           |
| --------------------------------------------------------- | ------------------------------------------------------------------------- |
| November 19–20 range, no other filters                    | Four items on both inclusive boundaries                                   |
| Library search + Electronics + Found + November 19–21     | One matching Sony headphones post                                         |
| Change end date to November 18 while start is November 19 | Inline error and invalid-range state; no matching cards shown             |
| Clear dates                                               | Both fields empty, error removed; Library, Electronics and Found retained |
| November 1–8 range                                        | No-match state with Clear filters                                         |
| Clear filters                                             | Dates and other filters cleared; all six sample posts restored            |

Screenshots: [combined date filters](screenshots/date-range.jpg) and [reversed range](screenshots/date-range-error.jpg).

These browser checks do not claim dedicated mobile or screen-reader verification. The new feature still needs the student's own Windows review after updating the local checkout.
