# Verification record

## Automated checks

`npm test` passed 16 tests in the coding workspace:

- 9 HTTP tests against the explicit temporary demo repository.
- 5 board search/filter/sort/count tests.
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

- Real MongoDB/Atlas connection, creation and status persistence after application restart.
- A clean clone from the actual published GitHub URL (not yet available in this workspace).
- Dedicated mobile viewport inspection and a complete keyboard/screen-reader audit. Responsive CSS and native dialogs are included, but these do not constitute an accessibility certification.
- Student review of source and reflection.

## Clean checkout check

A fresh local Git clone was created from the project repository. In that clone, `npm ci`, all 16 standard tests and `npm run build` completed successfully. No copied `node_modules`, `.env` or build directory was used. This verifies a clean local clone; an actual GitHub clone remains pending until publication.


## Windows verification — November 21, 2026

- MongoDB service was running, and the application started successfully.
- A newly created item remained on the board after restarting the application.
- `npm test`: all 16 tests passed, with zero failures.
- `npm run build`: production build completed successfully.