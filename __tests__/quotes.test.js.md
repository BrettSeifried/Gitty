const setup = require('../data/setup');
const app = require('../lib/app');
const { request } = require('../lib/app');
const pool = require('../lib/utils/pool');

jest.mock('../lib/utils/githubUtils.js');

describe('Github Auth Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Gets quotes from an API', async () => {
    const expected = [
      { author: expect.any(String), content: expect.any(String) },
    ];
    const res = await request(app).get('/api/v1/quotes');
    expect(res.body).toEqual(expected);
  });
});
