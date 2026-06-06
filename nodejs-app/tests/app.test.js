const request = require('supertest');
const app = require('../src/app');

describe('API Tests', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
  test('GET /api/users returns list', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
  test('GET /api/users/1 returns user', async () => {
    const res = await request(app).get('/api/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(1);
  });
  test('GET /api/users/999 returns 404', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.statusCode).toBe(404);
  });
  test('POST /api/users creates user', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Test', role: 'Tester' });
    expect(res.statusCode).toBe(201);
  });
});
