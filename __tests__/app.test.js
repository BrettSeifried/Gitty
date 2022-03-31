const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to github OAuth page upon logging in', async () => {
    const req = await request(app).get('/api/v1/auth/login');

    expect(req.header.location).toMatch(
      '/https://github.com/login/oauth/authorize?client_id=[wd]+&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback'
    );
  });
});
