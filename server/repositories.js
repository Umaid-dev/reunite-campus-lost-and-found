import mongoose from 'mongoose';
import { Item } from './item.js';
// The normal MERN application persists records in MongoDB.
export const mongoRepository = {
  async list() {
    return Item.find().sort({ createdAt: -1 }).lean();
  },
  async create(data) {
    return Item.create(data);
  },
  async setStatus(id, status) {
    return Item.findByIdAndUpdate(id, { status }, { returnDocument: 'after', runValidators: true });
  },
};
// Explicit demo/test alternative only. It never claims to be MongoDB and resets on restart.
export function createDemoRepository(seed = []) {
  const items = seed.map((x, index) => ({
    ...x,
    _id: new mongoose.Types.ObjectId().toString(),
    status: x.status || 'open',
    createdAt: new Date(Date.now() - index * 1000).toISOString(),
  }));
  return {
    async list() {
      return structuredClone(items);
    },
    async create(data) {
      const item = {
        ...data,
        _id: new mongoose.Types.ObjectId().toString(),
        status: 'open',
        createdAt: new Date().toISOString(),
      };
      items.unshift(item);
      return structuredClone(item);
    },
    async setStatus(id, status) {
      const item = items.find((x) => x._id === id);
      if (!item) return null;
      item.status = status;
      return structuredClone(item);
    },
  };
}
