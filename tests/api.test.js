import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../server/app.js';
import { createDemoRepository } from '../server/repositories.js';
const good = {
  title: 'Blue backpack',
  description: 'A blue backpack near the main entrance.',
  type: 'found',
  category: 'Bags & accessories',
  location: 'Main entrance',
  date: '2026-01-10',
  contact: 'finder@example.com',
};
const make = () => createApp({ repository: createDemoRepository(), mode: 'demo' });
test('demo health clearly identifies the temporary store', async () => {
  const r = await request(make()).get('/api/health').expect(200);
  assert.equal(r.body.database, 'temporary-demo-store');
});
test('create, list, return and re-read an item through HTTP', async () => {
  const app = make();
  const created = await request(app).post('/api/items').send(good).expect(201);
  assert.equal(created.body.status, 'open');
  const list = await request(app).get('/api/items').expect(200);
  assert.equal(list.body[0].title, good.title);
  await request(app)
    .patch(`/api/items/${created.body._id}/status`)
    .send({ status: 'returned' })
    .expect(200);
  const result = await request(app).get('/api/items').expect(200);
  assert.equal(result.body[0].status, 'returned');
});
test('whitespace-only required fields are rejected by the server', async () => {
  const response = await request(make())
    .post('/api/items')
    .send({ ...good, title: '   ', location: '  ', description: '          ' })
    .expect(400);
  assert.ok(response.body.errors.title);
  assert.ok(response.body.errors.location);
  assert.ok(response.body.errors.description);
});
test('invalid categories, email, future and impossible dates are rejected', async () => {
  for (const changes of [
    { category: 'Not real' },
    { type: 'stolen' },
    { contact: 'not-email' },
    { date: '9999-12-31' },
    { date: '2026-02-30' },
    { date: 'invalid' },
  ]) {
    await request(make())
      .post('/api/items')
      .send({ ...good, ...changes })
      .expect(400);
  }
});
test('extra fields cannot set status or IDs on creation', async () => {
  const r = await request(make())
    .post('/api/items')
    .send({ ...good, _id: '000000000000000000000001', status: 'returned', admin: true })
    .expect(201);
  assert.equal(r.body.status, 'open');
  assert.notEqual(r.body._id, '000000000000000000000001');
  assert.equal(r.body.admin, undefined);
});
test('invalid, missing IDs and invalid status have distinct responses', async () => {
  await request(make())
    .patch('/api/items/not-an-id/status')
    .send({ status: 'returned' })
    .expect(400);
  await request(make())
    .patch('/api/items/000000000000000000000001/status')
    .send({ status: 'returned' })
    .expect(404);
  await request(make())
    .patch('/api/items/000000000000000000000001/status')
    .send({ status: 'anything' })
    .expect(400);
});
test('malformed JSON and oversized bodies return useful errors', async () => {
  await request(make())
    .post('/api/items')
    .set('Content-Type', 'application/json')
    .send('{broken')
    .expect(400);
  await request(make())
    .post('/api/items')
    .send({ ...good, description: 'x'.repeat(20000) })
    .expect(413);
});
test('unknown API routes return JSON 404 responses', async () => {
  const r = await request(make()).get('/api/nope').expect(404);
  assert.match(r.body.message, /not found/);
});
test('HTML-like content stays data instead of being interpreted on the server', async () => {
  const r = await request(make())
    .post('/api/items')
    .send({ ...good, title: '<script>alert(1)</script>' })
    .expect(201);
  assert.equal(r.body.title, '<script>alert(1)</script>');
});
