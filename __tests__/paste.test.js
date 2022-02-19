const request = require('supertest');
const app = require('../app');
const { generatePasteId } = require('../lib/pasteIdGenerator');

jest.mock('../models');
const { Paste } = require('../models');
const { unregisterPastesCleanerJob } = require('../services/pastesCleaner');

const PASTE = 'This is some text';
const EXISTING_ID = generatePasteId();
const ABSENT_ID = generatePasteId();

beforeEach(() => {
  Paste.__reset();
  Paste.__add({
    id: EXISTING_ID,
    data: PASTE,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  });
});

afterEach(() => {
  jest.useRealTimers();
});

afterAll(() => {
  unregisterPastesCleanerJob();
});

describe('GET /Paste', () => {
  it('should get the data for the Paste', async () => {
    const response = await request(app)
      .get(`/${EXISTING_ID}`);
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body.id).toBe(EXISTING_ID);
    expect(response.body.data).toBe(PASTE);
    expect(new Date(response.body.expiresAt).getTime())
      .toBeLessThan(new Date(Date.now() + 15 * 60 * 1000).getTime());
  });

  it('should return 404 if the Paste does not exist', async () => {
    const response = await request(app)
      .get(`/${ABSENT_ID}`);
    expect(response.statusCode).toBe(404);
  });

  it('should return 404 if the Paste has expired', async () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');

    let response = await request(app)
      .get(`/${EXISTING_ID}`);
    expect(response.statusCode).toBe(200);

    jest.advanceTimersByTime(15 * 60 * 1000 + 1);

    response = await request(app)
      .get(`/${EXISTING_ID}`);
    expect(response.statusCode).toBe(404);
  });
});

describe('POST /paste', () => {
  it('should create a post and return an id to access it', async () => {
    const response = await request(app)
      .post('/paste')
      .send({ data: PASTE });
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body.id).toMatch(/^[A-Za-z0-9]*$/);

    const storedPaste = Paste.findByPk(response.body.id);
    expect(storedPaste.id).toBe(response.body.id);
    expect(storedPaste.data).toBe(PASTE);
    expect(storedPaste.expiresAt.getTime())
      .toBeLessThan(new Date(Date.now() + 15 * 60 * 1000).getTime());
  });
});
