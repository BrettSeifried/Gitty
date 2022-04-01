const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/gitHubUtils.js');

describe('Github Auth Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to github OAuth page upon logging in', async () => {
    const req = await request(app).get('/api/v1/auth/login');

    expect(req.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/auth\/login\/callback/i
    );
  });

  it('redirect logged into users /api/v1/auth/dashboard', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/auth/login/callback?code=42')
      .redirects(1);

    expect(req.redirects[0]).toEqual(expect.stringContaining('api/v1/tweets'));
  });

  it('logs out user with delete', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/auth/login/callback?code=42').redirects(1);

    const res = await agent.delete('/api/v1/auth/dashboard');
    expect(res.body).toEqual({ success: true, message: 'Sign out Successful' });
  });
});
