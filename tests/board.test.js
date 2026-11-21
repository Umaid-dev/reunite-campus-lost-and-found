import test from 'node:test';
import assert from 'node:assert/strict';
import { selectItems, stats } from '../shared/board.js';
const items = [
  {
    _id: 'a',
    title: 'Headphones',
    description: 'Black headphones',
    location: 'Library',
    category: 'Electronics',
    type: 'found',
    status: 'open',
    date: '2026-01-10',
  },
  {
    _id: 'b',
    title: 'Blue bag',
    description: 'A canvas bag',
    location: 'Student centre',
    category: 'Bags & accessories',
    type: 'lost',
    status: 'open',
    date: '2026-01-11',
  },
  {
    _id: 'c',
    title: 'Notebook',
    description: 'Blue cover',
    location: 'Library',
    category: 'Books & stationery',
    type: 'found',
    status: 'returned',
    date: '2026-01-09',
  },
];
test('search is trimmed, case-insensitive and covers location and description', () => {
  assert.equal(selectItems(items, { query: ' LIBRARY ' }).length, 2);
  assert.equal(selectItems(items, { query: 'canvas' })[0]._id, 'b');
});
test('combined category, type and bookmark filters are respected', () => {
  assert.deepEqual(
    selectItems(items, {
      category: 'Electronics',
      type: 'found',
      savedOnly: true,
      saved: ['a'],
    }).map((x) => x._id),
    ['a'],
  );
});
test('returned items no longer appear in open found counts or filters', () => {
  assert.deepEqual(stats(items), { lost: 1, found: 1, returned: 1 });
  assert.equal(selectItems(items, { type: 'found' }).length, 1);
  assert.equal(selectItems(items, { type: 'returned' })[0]._id, 'c');
});
test('sorting does not mutate the original collection', () => {
  assert.equal(selectItems(items)[0]._id, 'b');
  assert.equal(selectItems(items, { sort: 'oldest' })[0]._id, 'c');
  assert.deepEqual(
    items.map((x) => x._id),
    ['a', 'b', 'c'],
  );
});
test('unmatched filters produce an empty list', () =>
  assert.deepEqual(selectItems(items, { query: 'missing item' }), []));
