import { spawn } from 'node:child_process';
const children = [];
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill('SIGTERM');
  process.exit(code);
}
const jobs =
  process.env.DATA_MODE === 'demo'
    ? [['scripts/demo.js', ...process.argv.slice(2)]]
    : [
        ['--watch', '--env-file-if-exists=.env', 'server/index.js'],
        [
          'node_modules/vite/bin/vite.js',
          '--config',
          'client/vite.config.js',
          ...process.argv.slice(2),
        ],
      ];
for (const args of jobs) {
  const child = spawn(process.execPath, args, { stdio: 'inherit' });
  children.push(child);
  child.once('exit', (code) => stop(code || 0));
  child.once('error', () => stop(1));
}
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
