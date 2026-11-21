import test from 'node:test';
import assert from 'node:assert/strict';
import { getDateRangeError, selectItems, stats } from '../shared/board.js';
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

test('date ranges include items on both boundaries', () => {
  assert.deepEqual(
    selectItems(items, { startDate: '2026-01-09', endDate: '2026-01-10' }).map((x) => x._id),
    ['a', 'c'],
  );
});

test('the same start and end date selects that day only', () => {
  assert.deepEqual(
    selectItems(items, { startDate: '2026-01-10', endDate: '2026-01-10' }).map((x) => x._id),
    ['a'],
  );
});

test('a start date alone excludes earlier items', () => {
  assert.deepEqual(
    selectItems(items, { startDate: '2026-01-10' }).map((x) => x._id),
    ['b', 'a'],
  );
});

test('an end date alone excludes later items', () => {
  assert.deepEqual(
    selectItems(items, { endDate: '2026-01-10' }).map((x) => x._id),
    ['a', 'c'],
  );
});

test('date ranges intersect with search, category and open report type filters', () => {
  const candidates = [
    ...items,
    { ...items[0], _id: 'returned-headphones', status: 'returned' },
    { ...items[0], _id: 'later-headphones', date: '2026-01-12' },
    { ...items[0], _id: 'other-category', category: 'Other' },
    { ...items[0], _id: 'other-location', location: 'Gym' },
  ];
  const filters = { query: ' LIBRARY ', category: 'Electronics', type: 'found' };
  assert.deepEqual(
    selectItems(candidates, filters).map((x) => x._id),
    ['later-headphones', 'a'],
  );
  assert.deepEqual(
    selectItems(candidates, {
      ...filters,
      startDate: '2026-01-09',
      endDate: '2026-01-10',
    }).map((x) => x._id),
    ['a'],
  );
});

test('date ranges work with the lost and returned tabs', () => {
  assert.deepEqual(
    selectItems(items, { type: 'lost', startDate: '2026-01-11' }).map((x) => x._id),
    ['b'],
  );
  assert.deepEqual(selectItems(items, { type: 'lost', endDate: '2026-01-10' }), []);
  assert.deepEqual(
    selectItems(items, { type: 'returned', endDate: '2026-01-09' }).map((x) => x._id),
    ['c'],
  );
  assert.deepEqual(selectItems(items, { type: 'returned', startDate: '2026-01-10' }), []);
});

test('date ranges preserve saved-only filtering and oldest-first sorting', () => {
  assert.deepEqual(
    selectItems(items, {
      startDate: '2026-01-09',
      endDate: '2026-01-11',
      savedOnly: true,
      saved: ['a', 'c'],
      sort: 'oldest',
    }).map((x) => x._id),
    ['c', 'a'],
  );
});

test('reversed ranges are rejected instead of falling back to unfiltered results', () => {
  assert.equal(
    getDateRangeError('2026-01-11', '2026-01-09'),
    'End date must be on or after the start date.',
  );
  assert.deepEqual(selectItems(items, { startDate: '2026-01-11', endDate: '2026-01-09' }), []);
});

test('empty, one-sided and equal-date ranges have no range-order error', () => {
  for (const [start, end] of [
    ['', ''],
    ['2026-01-10', ''],
    ['', '2026-01-10'],
    ['2026-01-10', '2026-01-10'],
  ]) {
    assert.equal(getDateRangeError(start, end), '');
  }
});

test('cleared dates restore other filters and an unmatched date range stays empty', () => {
  const filters = { query: 'library', sort: 'oldest' };
  assert.deepEqual(
    selectItems(items, { ...filters, startDate: '2026-01-10' }).map((x) => x._id),
    ['a'],
  );
  assert.deepEqual(
    selectItems(items, { ...filters, startDate: '', endDate: '' }).map((x) => x._id),
    ['c', 'a'],
  );
  assert.deepEqual(selectItems(items, { startDate: '2026-01-01', endDate: '2026-01-08' }), []);
});
