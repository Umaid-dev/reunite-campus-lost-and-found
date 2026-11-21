import mongoose from 'mongoose';
import { createApp } from './app.js';
const port = Number(process.env.PORT || 5000);
try {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/reunite', {
    serverSelectionTimeoutMS: 8000,
  });
  const server = createApp().listen(port, '0.0.0.0', () =>
    console.log(`Reunite API ready on port ${port}`),
  );
  async function close() {
    server.close();
    await mongoose.disconnect();
    process.exit(0);
  }
  process.on('SIGTERM', close);
  process.on('SIGINT', close);
} catch {
  console.error(
    'MongoDB connection failed. Start MongoDB, configure MONGODB_URI in .env, or use npm run demo.',
  );
  process.exit(1);
}
