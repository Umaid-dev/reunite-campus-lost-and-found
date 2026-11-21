import mongoose from 'mongoose';
import { Item } from '../server/item.js';
import { sampleItems } from '../server/sample-data.js';
try {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/reunite', { serverSelectionTimeoutMS: 8000 });
  if (await Item.countDocuments()) console.log('Database has items already; no sample records added.');
  else { await Item.insertMany(sampleItems()); console.log('Added six fictional sample records.'); }
} catch { console.error('Seed failed. Check your MongoDB connection.'); process.exitCode = 1; }
finally { await mongoose.disconnect(); }
