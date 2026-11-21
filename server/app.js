import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Item } from './item.js';
import { validateItem } from './validation.js';
export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '16kb' }));
  app.get('/api/health', (_req, res) => res.json({ ok: true, database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));
  app.get('/api/items', async (_req, res) => {
    res.json(await Item.find().sort({ createdAt: -1 }).lean());
  });
  app.post('/api/items', async (req, res) => {
    const { item, errors } = validateItem(req.body ?? {});
    if (Object.keys(errors).length) return res.status(400).json({ message: 'Please check the highlighted fields.', errors });
    res.status(201).json(await Item.create(item));
  });
  app.patch('/api/items/:id/status', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid item ID.' });
    if (!['open', 'returned'].includes(req.body?.status)) return res.status(400).json({ message: 'Choose open or returned.' });
    const item = await Item.findByIdAndUpdate(req.params.id, { status: req.body.status }, { returnDocument: 'after', runValidators: true });
    if (!item) return res.status(404).json({ message: 'Item not found.' });
    res.json(item);
  });
  app.use('/api', (_req, res) => res.status(404).json({ message: 'API route not found.' }));
  const dist = fileURLToPath(new URL('../client/dist', import.meta.url));
  app.use(express.static(dist));
  app.get('/', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
  app.use((err, _req, res, _next) => {
    if (err.type === 'entity.parse.failed') return res.status(400).json({ message: 'Invalid JSON body.' });
    if (err.type === 'entity.too.large') return res.status(413).json({ message: 'Request is too large.' });
    if (err.name === 'ValidationError') return res.status(400).json({ message: 'The item data is invalid.' });
    console.error(err.name);
    res.status(500).json({ message: 'Unable to complete the request. Please try again.' });
  });
  return app;
}
