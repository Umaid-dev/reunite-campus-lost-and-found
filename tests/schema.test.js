import test from 'node:test';
import assert from 'node:assert/strict';
import { Item } from '../server/item.js';
const valid = {
  title: 'Notebook',
  description: 'A blue notebook with lecture notes',
  type: 'found',
  category: 'Books & stationery',
  date: '2026-01-10',
  contact: 'desk@example.com',
  location: 'Library',
};
test('Mongoose schema accepts a valid item and defaults to open', async () => {
  const item = new Item(valid);
  await item.validate();
  assert.equal(item.status, 'open');
});
test('Mongoose schema rejects invalid categories and status values', async () => {
  await assert.rejects(new Item({ ...valid, category: 'Invalid', status: 'Invalid' }).validate());
});
