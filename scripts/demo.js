import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { spawn } from 'node:child_process';
import { Item } from '../server/item.js';
import { sampleItems } from '../server/sample-data.js';
let mongo;
const children = [];
let stopping = false;
async function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill('SIGTERM');
  await mongoose.disconnect();
  if (mongo) await mongo.stop();
  process.exit(code);
}
try {
  console.log('Starting a temporary MongoDB database. The first run downloads MongoDB; internet access is required.');
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri('reunite_demo');
  await mongoose.connect(uri);
  await Item.insertMany(sampleItems());
  await mongoose.disconnect();
  for (const [file, args] of [['server/index.js', []], ['node_modules/vite/bin/vite.js', ['--config', 'client/vite.config.js']]]) {
    const child = spawn(process.execPath, [file, ...args], { stdio: 'inherit', env: { ...process.env, MONGODB_URI: uri, PORT: '5000' } });
    children.push(child);
    child.once('exit', code => { if (!stopping) void stop(code || 0); });
    child.once('error', () => void stop(1));
  }
  console.log('Demo data is temporary and resets when this command stops.');
  process.on('SIGINT', () => void stop());
  process.on('SIGTERM', () => void stop());
} catch (error) { console.error(`Demo could not start: ${error.message}`); await stop(1); }
