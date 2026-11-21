import { createApp } from '../server/app.js';
import { createDemoRepository } from '../server/repositories.js';
import { sampleItems } from '../server/sample-data.js';
import { spawn } from 'node:child_process';
const server = createApp({ repository: createDemoRepository(sampleItems()), mode: 'demo' }).listen(
  5000,
  '0.0.0.0',
  () =>
    console.log(
      'Demo API ready on port 5000. Temporary sample data; MongoDB is not used in this mode.',
    ),
);
const child = spawn(
  process.execPath,
  ['node_modules/vite/bin/vite.js', '--config', 'client/vite.config.js', ...process.argv.slice(2)],
  { stdio: 'inherit' },
);
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  child.kill('SIGTERM');
  server.close(() => process.exit(code));
}
child.once('exit', (code) => stop(code || 0));
child.once('error', () => stop(1));
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
