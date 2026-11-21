# Run and publish Reunite

## First run on Windows

1. Extract the complete `reunite` folder from the ZIP. Keep its hidden `.git` folder; that holds the development history.
2. Open the folder in Visual Studio Code.
3. Open **Terminal → New Terminal**. Check that the terminal is in the folder containing `package.json`.
4. Run:

   ```powershell
   npm ci
   npm run demo
   ```

5. Open **http://127.0.0.1:5173** in your browser. This is the temporary, clearly labelled demo. No database configuration is required for this first look.
6. Try creating a fictional item, finding it, bookmarking it and marking it returned.

Keep the terminal open while using the app. Ctrl+C stops the demo. Use the persistent MongoDB setup in README.md after confirming the first run works.

## Complete the real MERN check

Follow the README's persistent MongoDB instructions. Configure `.env`, run `npm run seed` and `npm run dev`, create an item, restart the application, and confirm that the item remains. Do not report this as tested until you have done it. The optional `npm run test:mongo` starts a temporary real MongoDB database for the integration check; it does not validate an Atlas URI.

## Add a meaningful personal iteration

Review the app and request one change based on what you actually observe. Record the prompt, test the outcome and commit it. The existing prompt notes include three actual planning prompts, but your own specific test-driven follow-up will strengthen the iteration and reflection evidence. Replace or supplement the README examples with prompts you really used. Do not invent errors, tests or a development timeline.

## Publish with GitHub Desktop

1. Open GitHub Desktop while signed in to your own GitHub account.
2. Select **File → Add local repository** and choose the extracted `reunite` folder.
3. Check the **History** tab. It should contain the included development commits.
4. Choose **Publish repository**. Use a name such as `reunite-lost-and-found`.
5. Set visibility so your instructor can access it: either public, or private with instructor access.
6. After publishing, open the repository on GitHub and check that the README displays both screenshots.
7. Clone it into another folder, run `npm ci`, `npm test` and `npm run demo`, then test the main features again.
8. Submit the actual repository URL to Blackboard.

If GitHub Desktop cannot see the history, stop before creating another repository and confirm the ZIP was fully extracted including `.git`. Do not upload `node_modules`, the build output or `.env`.

## Before submission

- Configure and test MongoDB if you are presenting it as a fully verified MERN app.
- Read and personalise all six reflection answers using your own observations.
- Ensure the README includes three significant prompts you actually used, two screenshots and at least three future improvements.
- Check the repository from a clean clone and ensure it is accessible to the instructor.
- Be ready to explain React state, the Express routes, server validation, Mongoose and the separate demo store.
