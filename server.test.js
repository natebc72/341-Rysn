const request = require('supertest');
const app = require('./server');

describe('GET /', () => {
  it('responds with html', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/text\/html/);
  });
});

describe('GET /styles/index.css', () => {
  it('responds with css', async () => {
    const response = await request(app).get('/styles/index.css');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/text\/css/);
  });
});

describe('Server', () => {
  let server;

  beforeAll(() => {
    server = app.listen(10000);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('starts and stops the server', () => {
    // empty test just to start and stop the server
  });
});
