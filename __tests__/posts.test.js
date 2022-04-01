const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const GithubUser = require('../lib/models/GithubUser');
const pool = require('../lib/utils/pool');

jest.mock('../lib/utils/gitHubUtils.js');

describe('Github Auth Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('allows logged in users to post a tweet', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/auth/login/callback?code=42').redirects(1);

    return agent
      .post('/api/v1/tweets')
      .send({ tweet: 'How do you center a Div?' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          tweet: 'How do you center a Div?',
        });
      });
  });

  //   it.only('login user and show all posts', async () => {
  //     const agent = request.agent(app);

  //     let res = await agent.get('/api/v1/tweets');
  //     expect(res.status).toEqual(401);

  //     await GithubUser.insert({
  //       username: 'test_user',
  //       email: 'test@email.com',
  //       avatar: 'testimage.com/image.png',
  //     });

  //     res = await agent.get('/api/v1/tweets');
  //     expect(res.stauts).toEqual(200);
  //     expect(res.body).toEqual({ id: '1', tweet: 'How do you center a Div?' });
  //   });
});
