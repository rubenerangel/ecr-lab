import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../src/app.js';

test('GET /health returns 200', async (t) => {
  const server = createApp().listen(0);
  t.after(() => server.close());
  await once(server, 'listening');

  const { port } = server.address();
  const res = await fetch(`http://127.0.0.1:${port}/health`);

  assert.equal(res.status, 200);
});